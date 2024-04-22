package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarRepository extends MongoRepository<Car,String> {


    List<Car> findByAvailable(boolean b);

}
