package com.server.ApiMongodb.Model;

import java.util.Date;

public class Manager extends user{
    private String firstName;
    private String lastName;
    private Date joiningDate;
    private float salary;
    private String branch;

    private int numAdded;
    private int numAccepted;
    private int numRefused;

    public int getNumAdded() {
        return numAdded;
    }

    public void setNumAdded(int numAdded) {
        this.numAdded = numAdded;
    }

    public int getNumAccepted() {
        return numAccepted;
    }

    public void setNumAccepted(int numAccepted) {
        this.numAccepted = numAccepted;
    }

    public int getNumRefused() {
        return numRefused;
    }

    public void setNumRefused(int numRefused) {
        this.numRefused = numRefused;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(Date joiningDate) {
        this.joiningDate = joiningDate;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}
