package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.booking;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface bookingRepository extends MongoRepository<booking, ObjectId> {
    List<booking> findByStatus(int status);
}
