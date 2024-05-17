package com.server.ApiMongodb.Projections;

import org.springframework.http.ResponseEntity;

import java.util.Date;

public class Reservation {
    private String cl_firstName;
    private String cl_lastName;
    private Date start_date;
    private Date end_date;
    private String man_firstName;
    private String man_lastName;
    private String maker;
    private String model;
    private int year;
    private int status;
    private int price;
    public Reservation(String cl_firstName, String cl_lastName, Date start_date, Date end_date, String man_firstName, String man_lastName,String maker, String model , int year, int status, int price) {
        this.cl_firstName = cl_firstName;
        this.cl_lastName = cl_lastName;
        this.start_date = start_date;
        this.end_date = end_date;
        this.man_firstName = man_firstName;
        this.man_lastName = man_lastName;
        this.maker = maker;
        this.model = model;
        this.year = year;
        this.status=status;
        this.price=price;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCl_firstName() {
        return cl_firstName;
    }

    public void setCl_firstName(String cl_firstName) {
        this.cl_firstName = cl_firstName;
    }

    public String getCl_lastName() {
        return cl_lastName;
    }

    public void setCl_lastName(String cl_lastName) {
        this.cl_lastName = cl_lastName;
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

    public String getMan_firstName() {
        return man_firstName;
    }

    public void setMan_firstName(String man_firstName) {
        this.man_firstName = man_firstName;
    }

    public String getMan_lastName() {
        return man_lastName;
    }

    public void setMan_lastName(String man_lastName) {
        this.man_lastName = man_lastName;
    }

}
