package com.server.ApiMongodb.Controller;

import com.server.ApiMongodb.Model.booking;
import com.server.ApiMongodb.bookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {
    @Autowired
    bookingRepository bookingRepository;

    @GetMapping("/bookings")
    public List<booking> getBookings(){
        return bookingRepository.findAll();
    }

    @PostMapping("/addBooking")
    public void addBooking(@RequestBody booking booking){
        bookingRepository.save(booking);
    }

    @DeleteMapping("/deleteBooking/{id}")
    public void deleteBooking(@PathVariable String id){
        bookingRepository.deleteById(id);
    }

    @PutMapping("/updateBooking/{id}")
    public void updateBooking(@PathVariable String id, @RequestBody booking booking){
        bookingRepository.deleteById(id);
        bookingRepository.save(booking);
    }
    @PutMapping ("/refuseBooking/{id}")
    public void refuseBooking(@PathVariable String id){
        booking booking = bookingRepository.findById(id).get();
        booking.setStatus("refused");
        bookingRepository.save(booking);
    }
    @PutMapping ("/acceptBooking/{id}")
    public void acceptBooking(@PathVariable String id){
        booking booking = bookingRepository.findById(id).get();
        booking.setStatus("accepted");
        bookingRepository.save(booking);
    }

}