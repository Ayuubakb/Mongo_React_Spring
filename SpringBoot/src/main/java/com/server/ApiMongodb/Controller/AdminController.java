package com.server.ApiMongodb.Controller;

import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Model.user;
import com.server.ApiMongodb.Projections.MonthsCount;
import com.server.ApiMongodb.Projections.SearchMan;
import com.server.ApiMongodb.UserRepository;
import com.server.ApiMongodb.UserTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000", allowedHeaders = {"Content-Type"})
@RequestMapping("/admin")
@RestController
public class AdminController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserTemplate userTemplate;

    @GetMapping("/adminDash")
    public List<MonthsCount> getDash(){
        return userTemplate.getRevenue();
    }
    @GetMapping("/raking")
    public HashMap<String,List<Manager>> getRanking(){
        return userTemplate.getRanking();
    }
    @PostMapping("/addManager")
    public ResponseEntity<String> addManager(@RequestBody Manager manager){
        user userByLogin=userRepository.findByLogin(manager.getLogin());
        if(userByLogin!=null){
            return new ResponseEntity<>("Login Already Used", HttpStatus.BAD_REQUEST);
        }else{
            userRepository.save(manager);
            return new ResponseEntity<>("Manager Added", HttpStatus.OK);
        }
    }

    @PostMapping("/listMan")
    public ResponseEntity<Object> listMan(@RequestBody SearchMan searchMan){
        List<Manager> listManagers=userTemplate.searchManagerAll(searchMan);
        return new ResponseEntity<>(listManagers,HttpStatus.OK);
    }

    @DeleteMapping("/deleteMan")
    public ResponseEntity<String> deleteMan(@RequestBody String login){
        long listManagers=userTemplate.deleteMan(login);
        if(listManagers!=0)
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        else
            return new ResponseEntity<>("Not Deleted",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/findMan")
    public ResponseEntity<Manager> findMan(@RequestBody String login){
        Manager man= userTemplate.findMan(login);
        return new ResponseEntity<>(man,HttpStatus.OK);
    }
    @PostMapping(path = "/updateMan",  consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateMan(@RequestPart("infos") Manager man,@RequestPart("login") String login){
        long manUp= userTemplate.updateMan(login, man);
        if(manUp == 1){
            return new ResponseEntity<>("updated",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("not updated",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
