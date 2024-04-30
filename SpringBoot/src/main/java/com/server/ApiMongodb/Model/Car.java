package com.server.ApiMongodb.Model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "car")
public class Car {
    private ObjectId id;
    private String name;
    private String color;
    private int horsePower;
    private String brand;
    private String model;
    private Boolean available;
    private String description;
    private String image;
    private String fuel;
    private int year;
    private String transmission;

public Car(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
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
                "name='" + name + '\'' +
                ", color='" + color + '\'' +
                ", horsePower=" + horsePower +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", available=" + available +
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
