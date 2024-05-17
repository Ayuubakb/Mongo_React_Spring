package com.server.ApiMongodb.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Document(collection = "reservation")
public class booking {
    @Id
    private ObjectId id ;
    private ObjectId id_client ;
    private ObjectId id_car ;
    private Date start_date ;
    private Date end_date ;
    private int price ;
    private int status ;
    private ObjectId addedBy;
    private ObjectId statusModifiedBy;

    public ObjectId getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(ObjectId addedBy) {
        this.addedBy = addedBy;
    }

    public ObjectId getStatusModifiedBy() {
        return statusModifiedBy;
    }

    public void setStatusModifiedBy(ObjectId statusModifiedBy) {
        this.statusModifiedBy = statusModifiedBy;
    }

    public booking(){

    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getClient() {
        return id_client;
    }

    public void setClient(ObjectId client) {
        this.id_client = client;
    }

    public ObjectId getId_car() {
        return id_car;
    }

    public void setId_car(ObjectId id_car) {
        this.id_car = id_car;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
