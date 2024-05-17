package com.server.ApiMongodb.Projections;

import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.Date;

public class bookingProjection {
    private String id_client ;
    private String id_car;
    private Date start_date ;
    private Date end_date ;
    private int price ;
    private int status ;

    public String getId_client() {
        return id_client;
    }

    public void setId_client(String id_client) {
        this.id_client = id_client;
    }

    public String getId_car() {
        return id_car;
    }

    public void setId_car(String id_car) {
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
