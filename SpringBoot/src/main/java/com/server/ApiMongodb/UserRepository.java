package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Model.user;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<user,ObjectId> {
    user findByLogin(String login);
    Manager findManagerById(ObjectId id);
}
