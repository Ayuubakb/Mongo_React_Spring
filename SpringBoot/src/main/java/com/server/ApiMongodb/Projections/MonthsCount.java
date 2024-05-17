package com.server.ApiMongodb.Projections;

public class MonthsCount {
    private int _id;
    private int count;

    public int getMonth() {
        return _id;
    }

    public void setMonth(int month) {
        this._id = month;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
