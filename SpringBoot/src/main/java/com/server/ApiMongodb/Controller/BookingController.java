package com.server.ApiMongodb.Controller;

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

    @GetMapping("/bookings")
    public List<booking> getBookings(){
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
    public ResponseEntity<String> acceptBooking(@PathVariable String id,HttpServletRequest req){
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
            return new ResponseEntity<>("done",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Connected",HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/reservations")
    public List<Reservation> findReservations(@RequestBody SearchRes searchRes){
        return bookingTemplate.getReservation(searchRes.getCar(),
                searchRes.getClient(),
                searchRes.getSort(),
                searchRes.getStatus()
        );
    }

}