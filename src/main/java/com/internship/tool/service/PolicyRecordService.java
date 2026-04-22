package com.internship.tool.service;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.repository.PolicyRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyRecordService {

    @Autowired
    private PolicyRecordRepository repository;

    // CREATE
    public PolicyRecord savePolicy(PolicyRecord policy) {
        return repository.save(policy);
    }

    // READ ALL
    public List<PolicyRecord> getAllPolicies() {
        return repository.findAll();
    }

    // READ BY ID
    public PolicyRecord getPolicyById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy with ID " + id + " not found"));
    }

    // UPDATE
    public PolicyRecord updatePolicy(Long id, PolicyRecord newPolicy) {
        PolicyRecord existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy with ID " + id + " not found"));

        existing.setPolicyName(newPolicy.getPolicyName());
        existing.setDescription(newPolicy.getDescription());
        existing.setCategory(newPolicy.getCategory());
        existing.setStatus(newPolicy.getStatus());

        return repository.save(existing);
    }

    // DELETE
    public void deletePolicy(Long id) {
        PolicyRecord existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy with ID " + id + " not found"));

        repository.delete(existing);
    }
}