package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.Car;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CarRepository extends MongoRepository<Car,ObjectId> {
   @Query("{id:?0}")
    Car findCarById(ObjectId id);
}
