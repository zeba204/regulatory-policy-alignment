package com.internship.tool.controller;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.service.PolicyRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policy")
public class PolicyRecordController {

    @Autowired
    private PolicyRecordService service;

    // CREATE
    @PostMapping
    public PolicyRecord createPolicy(@Valid @RequestBody PolicyRecord policy) {
        return service.savePolicy(policy);
    }

    // GET ALL
    @GetMapping
    public List<PolicyRecord> getAllPolicies() {
        return service.getAllPolicies();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public PolicyRecord getPolicyById(@PathVariable Long id) {
        return service.getPolicyById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public PolicyRecord updatePolicy(@PathVariable Long id,
                                     @Valid @RequestBody PolicyRecord policy) {
        return service.updatePolicy(id, policy);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        service.deletePolicy(id);
        return "Policy deleted successfully";
    }
}