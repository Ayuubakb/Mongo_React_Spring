package com.server.ApiMongodb.Controller;

import com.server.ApiMongodb.CarRepository;
import com.server.ApiMongodb.Model.Car;
import com.server.ApiMongodb.bookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.ApiMongodb.Model.*;
import java.time.LocalDate;



import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CarController {
    @Autowired
    CarRepository carRepository;

    com.server.ApiMongodb.bookingRepository bookingRepository;

    @GetMapping("/cars")
    public List<Car> getCars(){
        return carRepository.findAll();
    }
    @PostMapping("/addCar")
    public void addCar(@RequestBody  Car car){
        carRepository.save(car);
    }
    @DeleteMapping("/deleteCar/{id}")
    public void deleteCar(@PathVariable String id){
        carRepository.deleteById(id);
    }
    @PutMapping("/updateCar/{id}")
    public void updateCar(@PathVariable String id, @RequestBody Car car){
        carRepository.deleteById(id);
        carRepository.save(car);
    }
//  get  available car
    @GetMapping("/availableCars")
    public List<Car> getAvailableCars(){
        return carRepository.findByAvailable(true);
    }
    @GetMapping("/availableCars/{start_date}/{end_date}")
    public List<Car> getAvailableCars(@PathVariable String start_date, @PathVariable String end_date){
        LocalDate startDate = LocalDate.parse(start_date);
        LocalDate endDate = LocalDate.parse(end_date);

        List<booking> allBookings = bookingRepository.findAll();
        List<Integer> bookedCarIds = allBookings.stream()
            .filter(b -> b.getStart_date().isBefore(endDate) && b.getEnd_date().isAfter(startDate))
            .map(booking::getId_car)
            .distinct()
            .collect(Collectors.toList());

        List<Car> allCars = carRepository.findAll();
        List<Car> availableCars = allCars.stream()
            .filter(c -> !bookedCarIds.contains(c.getId()))
            .collect(Collectors.toList());

        return availableCars;
    }






}
