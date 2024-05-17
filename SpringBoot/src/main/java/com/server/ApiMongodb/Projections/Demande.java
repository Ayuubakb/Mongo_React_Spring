package com.server.ApiMongodb.Projections;

import java.util.Date;

public class Demande {
    private String id;
    private int year;
    private String model;
    private String lastName;
    private String firstName;
    private Date from;
    private Date to;
    private String addedBy;
    private int price;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(String addedBy) {
        this.addedBy = addedBy;
    }


    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public Demande(String id, int year ,String model, String lastName, String firstName, Date from, Date to, String addedBy,int price) {
        this.id = id;
        this.model = model;
        this.lastName = lastName;
        this.firstName = firstName;
        this.from = from;
        this.to = to;
        this.year=year;
        this.addedBy=addedBy;
        this.price=price;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }
}
