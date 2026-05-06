package com.internship.tool.service;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.exception.ResourceNotFoundException;
import com.internship.tool.repository.PolicyRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyRecordService {

    @Autowired
    private PolicyRecordRepository repository;

    @CacheEvict(value = {"policies", "policy"}, allEntries = true)
    public PolicyRecord savePolicy(PolicyRecord policy) {
        return repository.save(policy);
    }

    @Cacheable(value = "policies")
    public List<PolicyRecord> getAllPolicies() {
        return repository.findAll();
    }

    public PolicyRecord getPolicyById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy with ID " + id + " not found"));
    }

    @CacheEvict(value = {"policies", "policy"}, allEntries = true)
    public PolicyRecord updatePolicy(Long id, PolicyRecord newPolicy) {
        PolicyRecord existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy with ID " + id + " not found"));

        existing.setPolicyName(newPolicy.getPolicyName());
        existing.setDescription(newPolicy.getDescription());
        existing.setCategory(newPolicy.getCategory());
        existing.setStatus(newPolicy.getStatus());

        return repository.save(existing);
    }
    @Cacheable(value = "policies")
    public List<PolicyRecord> searchPolicies(String keyword) {

        return repository.findByPolicyNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            keyword,
            keyword
        );
    }
    @CacheEvict(value = {"policies", "policy"}, allEntries = true)
    public void deletePolicy(Long id) {
        PolicyRecord existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy with ID " + id + " not found"));

        repository.delete(existing);
    }
}