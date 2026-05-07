package com.internship.tool.config;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.repository.PolicyRecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final PolicyRecordRepository policyRecordRepository;

    @Override
    public void run(String... args) {

        if (policyRecordRepository.count() == 0) {

            log.info("Seeding database with sample data...");

            Random random = new Random();

            String[][] data = {
                {"GDPR Compliance Policy", "General Data Protection Regulation compliance framework", "Compliance", "ACTIVE"},
                {"Anti-Money Laundering Policy", "AML procedures and controls for financial transactions", "Finance", "ACTIVE"},
                {"Data Retention Policy", "Guidelines for storing and deleting organizational data", "Compliance", "ACTIVE"},
                {"Cybersecurity Framework", "Security controls and incident response procedures", "IT Security", "ACTIVE"},
                {"Employee Code of Conduct", "Workplace behavior and ethics standards", "HR", "ACTIVE"},
                {"Vendor Risk Management", "Third party vendor assessment and monitoring policy", "Risk", "PENDING"},
                {"Business Continuity Plan", "Disaster recovery and business continuity procedures", "Operations", "ACTIVE"},
                {"KYC Policy", "Know Your Customer identity verification procedures", "Finance", "ACTIVE"},
                {"Whistleblower Protection Policy", "Reporting mechanisms for unethical behavior", "HR", "ACTIVE"},
                {"IT Access Control Policy", "User access management and authentication standards", "IT Security", "ACTIVE"},
                {"Environmental Compliance Policy", "Environmental regulations and sustainability guidelines", "Compliance", "PENDING"},
                {"Trade Sanctions Policy", "International trade restrictions and sanctions compliance", "Legal", "ACTIVE"},
                {"Privacy Policy", "Customer data privacy and consent management", "Compliance", "ACTIVE"},
                {"Risk Assessment Framework", "Enterprise risk identification and mitigation procedures", "Risk", "INACTIVE"},
                {"Conflict of Interest Policy", "Guidelines for managing conflicts of interest", "HR", "ACTIVE"},
                {"Supply Chain Policy", "Supplier standards and procurement guidelines", "Operations", "PENDING"},
                {"Financial Reporting Policy", "Standards for financial disclosure and reporting", "Finance", "ACTIVE"},
                {"Information Security Policy", "Data classification and information security standards", "IT Security", "ACTIVE"},
                {"Health and Safety Policy", "Workplace health safety and wellbeing standards", "HR", "ACTIVE"},
                {"Audit and Compliance Policy", "Internal audit procedures and compliance monitoring", "Compliance", "ACTIVE"},
                {"Social Media Policy", "Guidelines for organizational social media usage", "Communications", "ACTIVE"},
                {"Procurement Policy", "Purchasing procedures and approval workflows", "Operations", "ACTIVE"},
                {"Tax Compliance Policy", "Corporate tax obligations and reporting requirements", "Finance", "ACTIVE"},
                {"Data Breach Response Policy", "Incident response procedures for data breaches", "IT Security", "ACTIVE"},
                {"Equal Opportunity Policy", "Non-discrimination and equal opportunity standards", "HR", "ACTIVE"},
                {"Credit Risk Policy", "Credit assessment and risk management framework", "Finance", "INACTIVE"},
                {"Intellectual Property Policy", "IP protection and usage guidelines", "Legal", "ACTIVE"},
                {"Travel and Expense Policy", "Business travel and expense reimbursement standards", "Operations", "ACTIVE"},
                {"Customer Complaint Policy", "Customer grievance handling and resolution procedures", "Operations", "PENDING"},
                {"Board Governance Policy", "Corporate governance and board oversight standards", "Legal", "ACTIVE"},
            };

            for (int i = 0; i < data.length; i++) {

                PolicyRecord policy = new PolicyRecord();

                policy.setPolicyName(data[i][0]);
                policy.setDescription(data[i][1]);
                policy.setCategory(data[i][2]);
                policy.setStatus(data[i][3]);

                policy.setAiScore((int) (Math.random() * 40) + 60);

                policy.setCreatedBy("system");

                LocalDateTime randomDate =
                LocalDateTime.now().minusDays(random.nextInt(30));

                policy.setCreatedDate(randomDate);

                policyRecordRepository.save(policy);
            }

            log.info("Seeded 30 policy records successfully!");
        }
    }
}