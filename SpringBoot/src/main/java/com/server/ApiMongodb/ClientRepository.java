package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.client;
import com.server.ApiMongodb.Model.user;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends MongoRepository<client, ObjectId> {
    List<client> findByEmail(String email);
    @Query("{id:?0}")
    client findClientById(ObjectId id);
    @Query("{status:?0}")
    List<client> findByStatus(int status);
}
