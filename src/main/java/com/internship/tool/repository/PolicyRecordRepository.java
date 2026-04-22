package com.internship.tool.repository;

import com.internship.tool.entity.PolicyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRecordRepository extends JpaRepository<PolicyRecord, Long> {

}
