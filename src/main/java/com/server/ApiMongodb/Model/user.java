package com.server.ApiMongodb.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class user {
    private String login;
    private String password;
    private int id;
    private String role;

    public user(String login, String password, int id) {
        this.login = login;
        this.password = password;
        this.id = id;
    }
    public user(String login, String password, int id, String role) {
        this.login = login;
        this.password = password;
        this.id = id;
        this.role = role;
    }
    public user() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
