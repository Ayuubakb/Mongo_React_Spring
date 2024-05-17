package com.server.ApiMongodb.Controller;

import com.server.ApiMongodb.BookingTemplate;
import com.server.ApiMongodb.Model.booking;
import com.server.ApiMongodb.Model.user;
import com.server.ApiMongodb.Projections.Login;
import com.server.ApiMongodb.Projections.MonthsCount;
import com.server.ApiMongodb.UserRepository;
import com.server.ApiMongodb.UserTemplate;
import com.server.ApiMongodb.bookingRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Content-Type"})
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserTemplate userTemplate;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private bookingRepository BookingRepository;
    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest req, @RequestBody Login login){
        user user=userRepo.findByLogin(login.getLogin());
        if(user!=null){
            String password=login.getPassword();
            if(password.equals(user.getPassword())){
                HttpSession session=req.getSession();
                session.setAttribute("id",user.getId());
                String role= user.getRole();
                removePassed();
                if(role.equals("admin")){
                    session.setAttribute("role","admin");
                    return new ResponseEntity<>("admin",HttpStatus.OK);
                }else {
                    session.setAttribute("role","manager");
                    return new ResponseEntity<>("manager",HttpStatus.OK);
                }
            }else{
                return new ResponseEntity<>("Incorrect Password",HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<String>("User Not Found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Object> checkLogin(HttpServletRequest req){
        HttpSession session= req.getSession(false);
        HashMap<String,Object> data=new HashMap<>();
        if (session!=null){
            data.put("isLogged",true);
            data.put("role",session.getAttribute("role"));
            return new ResponseEntity<>(data,HttpStatus.OK);
        }else{
            data.put("isLogged",false);
            data.put("role",null);
            return new ResponseEntity<>(data,HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest req){
        HttpSession session= req.getSession(false);
        if(session!=null){
            session.invalidate();
        }
        return new ResponseEntity<>("loggedOut",HttpStatus.OK);
    }

    @GetMapping("/manDash")
    public HashMap<String, List<MonthsCount>> getManDash(HttpServletRequest req){
        HttpSession session=req.getSession(false);
        if(session!=null) {
            return userTemplate.getManDash((ObjectId)session.getAttribute("id"));
        }
        return new HashMap<>();
    }
    @GetMapping("/manDash2")
    public HashMap<String, Long> getManDash2(HttpServletRequest req){
        HttpSession session=req.getSession(false);
        if(session!=null) {
            return userTemplate.getNums((ObjectId)session.getAttribute("id"));
        }
        return new HashMap<>();
    }
    public void removePassed(){
        LocalDate localDate = LocalDate.now();
        Date dateNow = java.sql.Date.valueOf(localDate);
        System.out.println(dateNow);
        List<booking> bookings=BookingRepository.findByStatus(2);
        for (booking bo:bookings){
            if (bo.getStart_date().before(dateNow)){
                bo.setStatus(0);
                bo.setStatusModifiedBy(new ObjectId("2222222222aaaaa222222222"));
                BookingRepository.save(bo);
            }
        }
    }
}
