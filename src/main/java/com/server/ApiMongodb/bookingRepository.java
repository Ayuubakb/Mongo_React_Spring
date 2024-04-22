package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface bookingRepository extends MongoRepository<booking,String> {
}
