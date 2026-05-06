package com.internship.tool.repository;

import com.internship.tool.entity.PolicyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRecordRepository extends JpaRepository<PolicyRecord, Long> {

    List<PolicyRecord> findByPolicyNameContainingIgnoreCase(String keyword);

    List<PolicyRecord> findByPolicyNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String policyName,
            String category
    );
}