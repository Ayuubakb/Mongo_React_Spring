package com.server.ApiMongodb.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Objects;

@Document(collection = "car")
public class Car {
    @Id
    private ObjectId id;
    private String color;
    private int horsePower;
    private String brand;
    private String model;
    private String description;
    private HashMap<String, Object> image;
    private String fuel;
    private int year;
    private String transmission;
    private String idString;

    public String getIdString() {
        return idString;
    }

    public void setIdString(String idString) {
        this.idString = idString;
    }

    public Car(){

    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getHorsePower() {
        return horsePower;
    }

    public void setHorsePower(int horsePower) {
        this.horsePower = horsePower;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HashMap<String, Object> getImage() {
        return image;
    }

    public void setImage(HashMap<String,Object> image) {
        this.image = image;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }
    public String toString(){
        return "Car{" +
                ", color='" + color + '\'' +
                ", horsePower=" + horsePower +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", fuel='" + fuel + '\'' +
                ", year=" + year +
                ", transmission='" + transmission + '\'' +
                '}';
    }
    public ObjectId getId() {
        return id;
    }

}
