package com.internship.tool.controller;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.service.PolicyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policy")
public class PolicyRecordController {

    @Autowired
    private PolicyRecordService service;

    // CREATE (POST)
    @PostMapping
    public PolicyRecord savePolicy(@RequestBody PolicyRecord policy) {
        return service.savePolicy(policy);
    }

    // READ ALL (GET)
    @GetMapping
    public List<PolicyRecord> getAllPolicies() {
        return service.getAllPolicies();
    }

    // READ BY ID (GET)
    @GetMapping("/{id}")
    public PolicyRecord getPolicyById(@PathVariable Long id) {
        return service.getPolicyById(id);
    }

    // UPDATE (PUT)
    @PutMapping("/{id}")
    public PolicyRecord updatePolicy(@PathVariable Long id,
                                     @RequestBody PolicyRecord policy) {
        return service.updatePolicy(id, policy);
    }

    // DELETE (DELETE)
    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        service.deletePolicy(id);
        return "Policy deleted successfully";
    }
}