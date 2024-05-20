package com.server.ApiMongodb.Controller;

import ch.qos.logback.core.net.server.Client;
import com.server.ApiMongodb.ClientRepository;
import com.server.ApiMongodb.ClientTemplate;
import com.server.ApiMongodb.Model.Manager;
import com.server.ApiMongodb.Model.booking;
import com.server.ApiMongodb.Model.client;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Content-Type"})
@RequestMapping("/clients")
@RestController
public class ClientController {
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ClientTemplate clientTemplate;

    @GetMapping("getClients")
    public List<client> getClients(){
        List<client> cl=clientRepository.findByStatus(1);
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
    @PutMapping("/deleteClient/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable String id, HttpServletRequest req){
        ObjectId _id=new ObjectId(id);
        HttpSession session= req.getSession(false);
        if (session!=null) {
            client client = clientRepository.findById(_id).get();
            client.setStatus(0);
            clientRepository.save(client);
            return new ResponseEntity<>("done", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not Connected",HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/getClient/{id}")
    public ResponseEntity<client> getClient(@PathVariable String id){
        ObjectId _id=new ObjectId(id);
        client cl=clientRepository.findClientById(_id);
        return new ResponseEntity<>(cl,HttpStatus.OK);
    }

    @PostMapping(path = "/updateClient", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> updateMan(@RequestPart("infos") client cl,@RequestPart("id") String id){
        long manUp= clientTemplate.updateClient(new ObjectId(id), cl);
        if(manUp == 1){
            return new ResponseEntity<>("updated",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("not updated",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
