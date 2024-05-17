package com.server.ApiMongodb;

import com.server.ApiMongodb.Model.*;
import com.server.ApiMongodb.Projections.Demande;
import com.server.ApiMongodb.Projections.Reservation;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class BookingTemplate {
    @Autowired
    MongoTemplate mt;

    public Boolean checkBooked(ObjectId id_car, Date start_date,Date end_date){
        Query query=new Query();
        query.addCriteria(Criteria.where("id_car").is(id_car));
        query.addCriteria(new Criteria().orOperator(
                Criteria.where("status").is(1),
                Criteria.where("status").is(2)));
        List<booking> b=mt.find(query,booking.class);
        for(booking bo : b){
            if((start_date.after(bo.getStart_date()) && start_date.before(bo.getEnd_date()))
                || (end_date.after(bo.getStart_date()) && end_date.before(bo.getEnd_date()))
                || end_date.equals(bo.getEnd_date())
                || start_date.equals(bo.getStart_date())){
                return true;
            }
        }
        return false;
    }

    public List<Demande> getDemands(String name, String car,Date date){
        Query query=new Query();
        List<Demande> list=new ArrayList<>();
        query.addCriteria(Criteria.where("status").is(2));
        List<booking> bookings=mt.find(query,booking.class);
        for(booking b:bookings){
            boolean flag=true;
            Query query1=new Query();
            Query query2=new Query();
            Query query3=new Query();
            query1.addCriteria(Criteria.where("id").is(b.getClient()));
            query2.addCriteria(Criteria.where("id").is(b.getId_car()));
            query3.addCriteria(Criteria.where("id").is(b.getAddedBy()));
            if(!name.equals(" ")){
                query1.addCriteria(new Criteria().orOperator(
                        Criteria.where("last_name").regex(name,"i"),
                        Criteria.where("first_name").regex(name,"i")));
            }
            if(!car.equals(" ")){
                query2.addCriteria(new Criteria().orOperator(
                        Criteria.where("brand").regex(car,"i"),
                        Criteria.where("model").regex(car,"i")));
            }
            if(date!=null){
                if(!((b.getStart_date().before(date) && b.getEnd_date().after(date))
                    || b.getStart_date().equals(date)
                    || b.getEnd_date().equals(date))){
                    flag=false;
                }
            }
            client cl=mt.findOne(query1,client.class);
            Car c=mt.findOne(query2,Car.class);
            Manager m=mt.findOne(query3,Manager.class);
            if(cl!=null && c!=null && flag && m!=null) {
                Demande d = new Demande(
                        b.getId().toString()
                        ,c.getYear()
                        ,c.getModel(),
                        cl.getLast_name(),
                        cl.getFirst_name(),
                        b.getStart_date(),
                        b.getEnd_date(),
                        m.getFirstName()+" "+m.getLastName(),
                        b.getPrice());
                list.add(d);
            }
        }
        return list;
    }

    public List<Reservation> getReservation(String car, String client, String sort, int status){
        List<Reservation>list=new ArrayList<>();
        Query query=new Query();
        if(status!=2)
            query.addCriteria(Criteria.where("status").is(status));
        else
            query.addCriteria(Criteria.where("status").ne(2));
        if(sort.equals("ASC"))
            query.with(Sort.by(Sort.Direction.ASC,"start_date"));
        else
            query.with(Sort.by(Sort.Direction.DESC,"start_date"));
        List<booking> b=mt.find(query, booking.class);
        for(booking booking:b) {
            Query query1=new Query();
            Query query2=new Query();
            Query query3=new Query();
            query1.addCriteria(Criteria.where("id").is(booking.getId_car()));
            query2.addCriteria(Criteria.where("id").is(booking.getClient()));
            query3.addCriteria(Criteria.where("id").is(booking.getStatusModifiedBy()));
            if (!car.equals("")) {
                query1.addCriteria(new Criteria().orOperator(
                        Criteria.where("brand").regex(car,"i"),
                        Criteria.where("model").regex(car,"i")
                ));
            }
            if (!client.equals("")) {
                query2.addCriteria(new Criteria().orOperator(
                        Criteria.where("first_name").regex(client,"i"),
                        Criteria.where("last_name").regex(client,"i")
                ));
            }
            Car c=mt.findOne(query1,Car.class);
            client cl=mt.findOne(query2,client.class);
            Manager man=mt.findOne(query3,Manager.class);
            if(c!=null && cl!=null){
                String fn="";
                String ln="";
                if(man==null && booking.getStatusModifiedBy().toString().equals("2222222222aaaaa222222222")){
                     fn="Time";
                     ln="Expired";
                }else if(man!=null){
                     fn= man.getFirstName();
                     ln=man.getLastName();
                }
                if(man!=null || booking.getStatusModifiedBy().toString().equals("2222222222aaaaa222222222")) {
                    Reservation rse=new Reservation(
                            cl.getFirst_name(),
                            cl.getLast_name(),
                            booking.getStart_date(),
                            booking.getEnd_date(),
                            fn,
                            ln,
                            c.getBrand(),
                            c.getModel(),
                            c.getYear(),
                            booking.getStatus(),
                            booking.getPrice()
                    );
                    list.add(rse);
                }
            }
        }
        return list;
    }
}
