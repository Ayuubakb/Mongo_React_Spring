package com.server.ApiMongodb.Projections;

public class SearchRes {
    private String Car;
    private String sort;
    private int status;
    private String client;

    public String getCar() {
        return Car;
    }

    public void setCar(String car) {
        Car = car;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }
}
