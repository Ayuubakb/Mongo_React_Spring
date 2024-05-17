package com.server.ApiMongodb.Controller;

import com.server.ApiMongodb.CarRepository;
import com.server.ApiMongodb.CarsTemplate;
import com.server.ApiMongodb.Model.Car;
import com.server.ApiMongodb.Projections.SearchCars;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/car")
@RestController
public class CarController {
    @Autowired
    CarRepository carRepository;
    @Autowired
    CarsTemplate carsTemplate;

    @PostMapping(path = "/addCar", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addCar(HttpServletRequest req, @RequestPart  Car car, @RequestPart MultipartFile photo) throws IOException {
        HashMap<String,Object> photoData=new HashMap<>();
        HttpSession session=req.getSession(false);
        if(session!=null){
            photoData.put("photoBase", new Binary(BsonBinarySubType.BINARY,photo.getBytes()));
            photoData.put("extension", photo.getOriginalFilename().split("\\.")[1]);
            car.setImage(photoData);
            carRepository.save(car);
            return new ResponseEntity<>("Car Saved",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/updateCar/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateCar(HttpServletRequest req,@PathVariable String id, @RequestPart  Car car, @RequestPart(required = false) MultipartFile photo, @RequestPart(required = false) HashMap<String,Object> photoTr) throws IOException {
        HashMap<String,Object> photoData=new HashMap<>();
        ObjectId _id=new ObjectId(id);
        HttpSession session=req.getSession(false);
        if(session!=null){
            if(photo!=null) {
                photoData.put("photoBase", new Binary(BsonBinarySubType.BINARY, photo.getBytes()));
                photoData.put("extension", photo.getOriginalFilename().split("\\.")[1]);
                car.setImage(photoData);
            }else if(photoTr!=null){
                car.setImage(photoTr);
            }
            long num=carsTemplate.updateCar(_id,car);
            if(num!=0) {
                return new ResponseEntity<>("Updated", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Not Updated", HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/findCars")
    public ResponseEntity<Object> listMan(@RequestBody SearchCars searchCars){
        List<Car> listCars=carsTemplate.findCars(searchCars);
        for (Car car : listCars){
            car.setIdString(car.getId().toString());
        }
        return new ResponseEntity<>(listCars,HttpStatus.OK);
    }

    @GetMapping("/findCar/{id}")
    public Optional<Car> findCar(@PathVariable String id){
        ObjectId _id=new ObjectId(id);
        return carRepository.findById(_id);
    }

    @DeleteMapping("/deleteCar/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable ObjectId id){
        carRepository.deleteById(id);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }
   /* com.server.ApiMongodb.bookingRepository bookingRepository;

    @GetMapping("/cars")
    public List<Car> getCars(){
        return carRepository.findAll();
    }

    @PutMapping("/updateCar/{id}")
    public void updateCar(@PathVariable ObjectId id, @RequestBody Car car){
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
        List<ObjectId> bookedCarIds = allBookings.stream()
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
*/





}
