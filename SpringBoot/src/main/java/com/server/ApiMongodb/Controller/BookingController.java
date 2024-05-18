package com.server.ApiMongodb.Controller;

import com.lowagie.text.DocumentException;
import com.server.ApiMongodb.*;
import com.server.ApiMongodb.Model.*;
import com.server.ApiMongodb.Projections.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Content-Type"})
@RequestMapping("/booking")
@RestController
public class BookingController {
    @Autowired
    bookingRepository bookingRepository;
    @Autowired
    BookingTemplate bookingTemplate;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    CarRepository carRepository;

    @GetMapping("/bookings")
    public List<booking> getBookings() throws IOException {

        return bookingRepository.findAll();
    }

    @PostMapping("/addBooking")
    public ResponseEntity<String> addBooking(@RequestBody bookingProjection booking, HttpServletRequest req){
        ObjectId id_car=new ObjectId(booking.getId_car());
        ObjectId id_client=new ObjectId(booking.getId_client());
        Boolean isBooked=bookingTemplate.checkBooked(id_car,booking.getStart_date(),booking.getEnd_date());
        HttpSession session=req.getSession(false);
        if(session!=null) {
            if (!isBooked) {
                booking b = new booking();
                b.setClient(id_client);
                b.setId_car(id_car);
                b.setEnd_date(booking.getEnd_date());
                b.setStart_date(booking.getStart_date());
                b.setPrice(booking.getPrice());
                b.setStatus(booking.getStatus());
                b.setAddedBy(new ObjectId(String.valueOf(session.getAttribute("id"))));
                bookingRepository.save(b);
                Manager us=userRepository.findManagerById(new ObjectId(String.valueOf(session.getAttribute("id"))));
                us.setNumAdded(us.getNumAdded()+1);
                userRepository.save(us);
                return new ResponseEntity<>("Added", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Already Booked This Period", HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>("No Manager Logged In", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/demands")
    public List<Demande> findDemands(@RequestBody SearchDemand objct){
        return bookingTemplate.getDemands(objct.getName(),objct.getCar(),objct.getDate());
    }

    @PutMapping ("/refuseBooking/{id}")
    public ResponseEntity<String> refuseBooking(@PathVariable String id, HttpServletRequest req){
        ObjectId _id=new ObjectId(id);
        HttpSession session= req.getSession(false);
        if (session!=null) {
            booking booking = bookingRepository.findById(_id).get();
            booking.setStatus(0);
            booking.setStatusModifiedBy(new ObjectId(String.valueOf(session.getAttribute("id"))));
            bookingRepository.save(booking);
            Manager us=userRepository.findManagerById(new ObjectId(String.valueOf(session.getAttribute("id"))));
            us.setNumRefused(us.getNumRefused()+1);
            userRepository.save(us);
            return new ResponseEntity<>("done", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Connected",HttpStatus.FORBIDDEN);
        }
    }
    @PutMapping ("/acceptBooking/{id}")
    public ResponseEntity<String> acceptBooking(@PathVariable String id,HttpServletRequest req) throws IOException {
        ObjectId _id=new ObjectId(id);
        HttpSession session= req.getSession(false);
        if(session!=null) {
            booking booking = bookingRepository.findById(_id).get();
            booking.setStatus(1);
            booking.setStatusModifiedBy(new ObjectId(String.valueOf(session.getAttribute("id"))));
            bookingRepository.save(booking);
            Manager us=userRepository.findManagerById(new ObjectId(String.valueOf(session.getAttribute("id"))));
            us.setNumAccepted(us.getNumAccepted()+1);
            userRepository.save(us);
            generatePdfFromHtml(_id);
            return new ResponseEntity<>("done",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Connected",HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/reservations")
    public List<Reservation> findReservations(@RequestBody SearchRes searchRes)  {
        return bookingTemplate.getReservation(searchRes.getCar(),
                searchRes.getClient(),
                searchRes.getSort(),
                searchRes.getStatus()
        );
    }
    private String parseThymeleafTemplate(Reservation reservation, HashMap<String,String> infos) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();
        context.setVariable("clf", reservation.getCl_firstName());
        context.setVariable("cll", reservation.getCl_lastName());
        DateFormat dateFormat = new SimpleDateFormat("EEEE dd MMM yyyy");
        String start= dateFormat.format(reservation.getStart_date());
        context.setVariable("start", start);
        String end= dateFormat.format(reservation.getEnd_date());
        context.setVariable("end",end);
        context.setVariable("mf", reservation.getMan_firstName());
        context.setVariable("ml", reservation.getMan_lastName());
        context.setVariable("cb", reservation.getMaker());
        context.setVariable("cm", reservation.getModel());
        context.setVariable("cy", reservation.getYear());
        context.setVariable("bp", reservation.getPrice());
        long days=(reservation.getEnd_date().getTime()-reservation.getStart_date().getTime()) / (1000*60*60*24);
        long total=days * reservation.getPrice();
        Date date = Calendar.getInstance().getTime();
        String strDate = dateFormat.format(date);
        context.setVariable("total", total);
        context.setVariable("days", days);
        context.setVariable("phone", infos.get("phone") );
        context.setVariable("email", infos.get("email"));
        context.setVariable("date", strDate);
        return templateEngine.process("thymeleaf_template", context);
    }

    public void generatePdfFromHtml(ObjectId id) throws IOException {
        String outputPath = "C:\\Users\\ayoub\\Downloads\\Facture"+id.toString()+".pdf";
        booking Booking=bookingRepository.findById(id).get();
        client cl=clientRepository.findClientById(Booking.getClient());
        Manager man=userRepository.findManagerById(Booking.getStatusModifiedBy());
        Car car=carRepository.findCarById(Booking.getId_car());
        HashMap<String,String> infos=new HashMap<>();
        Reservation res=new Reservation(cl.getFirst_name(),
                cl.getLast_name(),
                Booking.getStart_date(),
                Booking.getEnd_date(),
                man.getFirstName(),
                man.getLastName(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                Booking.getStatus(),
                Booking.getPrice()
                );
        infos.put("email",cl.getEmail());
        infos.put("phone",cl.getPhone());
        try (OutputStream outputStream = new FileOutputStream(outputPath)) {
            String htmlContent = parseThymeleafTemplate(res,infos);

            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();
            renderer.createPDF(outputStream);
        } catch (IOException | DocumentException e) {
            // Handle exceptions
            e.printStackTrace();
        }
    }

}
