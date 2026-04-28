package com.internship.tool.controller;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.service.PolicyRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policy-records")
public class PolicyRecordController {

    @Autowired
    private PolicyRecordService service;

    @PostMapping
    public PolicyRecord createPolicy(@Valid @RequestBody PolicyRecord policy) {
        return service.savePolicy(policy);
    }

    @GetMapping
    public List<PolicyRecord> getAllPolicies() {
        return service.getAllPolicies();
    }

    @GetMapping("/{id}")
    public PolicyRecord getPolicyById(@PathVariable Long id) {
        return service.getPolicyById(id);
    }

    @PutMapping("/{id}")
    public PolicyRecord updatePolicy(
            @PathVariable Long id,
            @Valid @RequestBody PolicyRecord policy
    ) {
        return service.updatePolicy(id, policy);
    }

    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        service.deletePolicy(id);
        return "Policy deleted successfully";
    }

    // This API is only for testing 500 Internal Server Error
    @GetMapping("/error-test")
    public String errorTest() {
        throw new NullPointerException("Testing 500 error");
    }
}