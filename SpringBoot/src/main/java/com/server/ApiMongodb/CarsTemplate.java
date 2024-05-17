package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.Car;
import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Projections.SearchCars;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarsTemplate {
    @Autowired
    private MongoTemplate mt;

    public List<Car> findCars(SearchCars searchCars){
        Query query=new Query();
        System.out.println(searchCars.getYear());
        if(searchCars.getYear()==0
                && searchCars.getModel().equals("")
                && searchCars.getBrand().equals("")){
            return mt.findAll(Car.class);
        }else{
            if(searchCars.getYear()!=0)
                query.addCriteria(Criteria.where("year").is(searchCars.getYear()));
            if(!searchCars.getModel().equals(""))
                query.addCriteria(Criteria.where("model").regex("^"+searchCars.getModel()+"$","i"));
            if(!searchCars.getBrand().equals(""))
                query.addCriteria(Criteria.where("brand").regex("^"+searchCars.getBrand()+"$","i"));
            return mt.find(query,Car.class);
        }
    }

    public long updateCar(ObjectId id, Car car){
        Query q= new Query();
        q.addCriteria(Criteria.where("id").is(id));
        Update u=new Update();
        u.set("color",car.getColor());
        u.set("brand",car.getBrand());
        u.set("model",car.getModel());
        u.set("year",car.getYear());
        u.set("fuel",car.getFuel());
        u.set("transmission",car.getTransmission());
        u.set("description",car.getDescription());
        u.set("horsePower",car.getHorsePower());
        u.set("image",car.getImage());

        return mt.upsert(q, u,Car.class).getModifiedCount();
    }
}

