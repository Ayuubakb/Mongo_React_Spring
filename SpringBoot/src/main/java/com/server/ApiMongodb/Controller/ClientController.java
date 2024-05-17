package com.server.ApiMongodb.Controller;

import ch.qos.logback.core.net.server.Client;
import com.server.ApiMongodb.ClientRepository;
import com.server.ApiMongodb.Model.client;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Content-Type"})
@RequestMapping("/clients")
@RestController
public class ClientController {
    @Autowired
    ClientRepository clientRepository;

    @GetMapping("getClients")
    public List<client> getClients(){
        List<client> cl=clientRepository.findAll();
        for(client c:cl){
            c.setIdString(c.getId().toString());
        }
        return cl;
    }

    @PostMapping("addClient")
    public ResponseEntity<String> addClient(@RequestBody client cl){
        List<client> clientEx=clientRepository.findByEmail(cl.getEmail());
       if(clientEx.size()==0) {
           ObjectId id = clientRepository.save(cl).getId();
           if (id != null)
               return new ResponseEntity<>(id.toString(), HttpStatus.OK);
           else
               return new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
       }else{
           return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
       }
    }
}
