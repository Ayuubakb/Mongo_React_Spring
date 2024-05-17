package com.server.ApiMongodb;

import com.fasterxml.jackson.core.ObjectCodec;
import com.mongodb.client.MongoClient;
import com.server.ApiMongodb.Model.Car;
import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Model.booking;
import com.server.ApiMongodb.Model.user;
import com.server.ApiMongodb.Projections.MonthsCount;
import com.server.ApiMongodb.Projections.SearchMan;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Queue;
import java.util.regex.Pattern;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Repository
public class UserTemplate {
    @Autowired
    private MongoTemplate mt;
    public List<Manager> searchManagerAll(SearchMan searchMan){
        Query query=new Query();
        query.addCriteria(Criteria.where("role").is("manager"));
        if(!searchMan.getName().equals("")) {
            query.addCriteria(
                    new Criteria().orOperator(
                            Criteria.where("firstName").regex(searchMan.getName(),"i"),
                            Criteria.where("lastName").regex(searchMan.getName(),"i")
                    )
            );
        }
        if(!searchMan.getBranch().equals(""))
            query.addCriteria(Criteria.where("branch").regex("^"+ Pattern.quote(searchMan.getBranch())+"$","i"));
        if(searchMan.getSalaire().equals("ASC"))
            query.with(Sort.by(Sort.Direction.ASC, "salary"));
        else if(searchMan.getSalaire().equals("DESC"))
            query.with(Sort.by(Sort.Direction.DESC, "salary"));
        if(searchMan.getJoined().equals("ASC"))
            query.with(Sort.by(Sort.Direction.ASC, "joiningDate"));
        else
            query.with(Sort.by(Sort.Direction.DESC, "joiningDate"));
        return mt.find(query, Manager.class);
    }
    public long deleteMan(String login){
        Query query=new Query();
        query.addCriteria(Criteria.where("login").is(login));
        return mt.remove(query,user.class).getDeletedCount();
    }
    public Manager findMan(String login){
        Query q= new Query();
        q.addCriteria(Criteria.where("login").is(login));
        return mt.findOne(q, Manager.class);
    }
    public long updateMan(String login,Manager man){
        Query q= new Query();
        q.addCriteria(Criteria.where("login").is(login));
        Update u=new Update();
        u.set("firstName",man.getFirstName());
        u.set("lastName",man.getLastName());
        u.set("login",man.getLogin());
        u.set("password",man.getPassword());
        u.set("branch",man.getBranch());
        u.set("salary",man.getSalary());

        return mt.upsert(q, u,Manager.class).getModifiedCount();
    }

    public HashMap<String,List<MonthsCount>> getManDash(ObjectId id){
        HashMap<String,List<MonthsCount>> result=new HashMap<>();
        Aggregation aggregation = Aggregation.newAggregation(
                project("start_date", "status")
                        .andExpression("{$year: '$start_date'}").as("year")
                        .andExpression("{$month: '$start_date'}").as("month"),
                match(Criteria.where("year").is(2024).and("status").is(0)),
                group("month").count().as("count"),
                project("_id").and("count").as("count")
        );
        Aggregation aggregation1 = Aggregation.newAggregation(
                project("start_date", "status")
                        .andExpression("{$year: '$start_date'}").as("year")
                        .andExpression("{$month: '$start_date'}").as("month"),
                match(Criteria.where("year").is(2024).and("status").is(1)),
                group("month").count().as("count"),
                project("_id").and("count").as("count")
        );
        Aggregation aggregation2 = newAggregation(
                project("start_date","status","statusModifiedBy")
                        .andExpression("{$year: '$start_date'}").as("year")
                        .andExpression("{$month: '$start_date'}").as("month"),
                match(Criteria.where("status").is(0).and("year").is(2024).and("statusModifiedBy").is(id)),
                group("month").count().as("count"),
                project("_id").and("count").as("count")
        );
        Aggregation aggregation3 = newAggregation(
                project("start_date","status","statusModifiedBy")
                        .andExpression("{$year:'$start_date'}").as("year")
                        .andExpression("{$month: '$start_date'}").as("month"),
                match(Criteria.where("status").is(1).and("year").is(2024).and("statusModifiedBy").is(id)),
                group("month").count().as("count"),
                project("_id").and("count").as("count")
        );
        AggregationResults<MonthsCount> result1 = mt.aggregate(aggregation, "reservation", MonthsCount.class);
        AggregationResults<MonthsCount> result2 = mt.aggregate(aggregation1, "reservation", MonthsCount.class);
        AggregationResults<MonthsCount> result3 = mt.aggregate(aggregation2, "reservation", MonthsCount.class);
        AggregationResults<MonthsCount> result4 = mt.aggregate(aggregation3, "reservation", MonthsCount.class);
        result.put("data1",result1.getMappedResults());
        result.put("data2",result2.getMappedResults());
        result.put("data3",result3.getMappedResults());
        result.put("data4",result4.getMappedResults());

        return result;
    }

    public List<MonthsCount> getRevenue(){
        List<MonthsCount> list=new ArrayList<>();
        for(int i=1;i<13;i++) {
            Aggregation aggregation = newAggregation(
                    project("start_date", "end_date", "price")
                            .andExpression("{$year:'$start_date'}").as("year")
                            .andExpression("{$month:'$start_date'}").as("month"),
                    match(Criteria.where("year").is(2024).and("month").is(i))
            );
            AggregationResults<booking> result=mt.aggregate(aggregation,"reservation",booking.class);
            List<booking> tmp=result.getMappedResults();
            int rev=0;
            for(booking b:tmp){
                rev+=(( b.getEnd_date().getTime() - b.getStart_date().getTime() ) / (1000 * 60 * 60 * 24) ) * b.getPrice();
            }
            MonthsCount res=new MonthsCount();
            res.setCount(rev);
            res.setMonth(i);
            list.add(res);
        }
        return list;
    }

    public HashMap<String,List<Manager>> getRanking(){
        HashMap<String,List<Manager>>  hash=new HashMap<>();
        Query query=new Query();
        query.addCriteria(Criteria.where("role").is("manager"));
        query.with(Sort.by(Sort.Direction.DESC, "numAdded")).limit(3);
        Query query2=new Query();
        query2.addCriteria(Criteria.where("role").is("manager"));
        query2.with(Sort.by(Sort.Direction.DESC, "numAccepted")).limit(3);
        Query query3=new Query();
        query3.addCriteria(Criteria.where("role").is("manager"));
        query3.with(Sort.by(Sort.Direction.DESC, "numRefused")).limit(3);
        hash.put("add",mt.find(query,Manager.class));
        hash.put("accept",mt.find(query2,Manager.class));
        hash.put("refuse",mt.find(query3,Manager.class));
        return hash;
    }
    public HashMap<String,Long> getNums(ObjectId id){
        HashMap<String,Long> nums=new HashMap<>();
        Query query=new Query();
        long cars=mt.count(query,Car.class);
        Query query1=new Query();
        query1.addCriteria(Criteria.where("status").is(2));
        long appending=mt.count(query1, booking.class);
        Query query2=new Query();
        query2.addCriteria(Criteria.where("id").is(id));
        Manager man=mt.findOne(query2,Manager.class);
        Query query3=new Query();
        query3.addCriteria(Criteria.where("role").is("manager"));
        long countMan=mt.count(query3,user.class);
        nums.put("cars",cars);
        nums.put("appending",appending);
        nums.put("added",(long)man.getNumAdded());
        nums.put("refused",(long)man.getNumRefused());
        nums.put("accepted",(long)man.getNumAccepted());
        nums.put("managers",countMan);
        return nums;
    }
}
