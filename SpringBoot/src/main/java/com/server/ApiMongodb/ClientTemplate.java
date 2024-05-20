package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Model.client;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class ClientTemplate {
    @Autowired
    MongoTemplate mt;

    public long updateClient(ObjectId id, client cl){
        Query q= new Query();
        q.addCriteria(Criteria.where("id").is(id));
        Update u=new Update();
        u.set("first_name",cl.getFirst_name());
        u.set("last_name",cl.getLast_name());
        u.set("email",cl.getEmail());
        u.set("phone",cl.getPhone());

        return mt.upsert(q, u,client.class).getModifiedCount();
    }
}
