package com.internship.tool.controller;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.service.PolicyRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    // SEARCH API
    @GetMapping("/search")
    public List<PolicyRecord> searchPolicies(@RequestParam String keyword) {
        return service.searchPolicies(keyword);
    }

    // EXPORT CSV API
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv() {

        List<PolicyRecord> policies = service.getAllPolicies();

        StringBuilder csv = new StringBuilder();
        csv.append("ID,Policy Name,Description,Category,Status,AI Score,Created Date\n");

        for (PolicyRecord p : policies) {

            csv.append(p.getId()).append(",")
                    .append(p.getPolicyName()).append(",")
                    .append(p.getDescription()).append(",")
                    .append(p.getCategory()).append(",")
                    .append(p.getStatus()).append(",")
                    .append(p.getAiScore() != null ? p.getAiScore() : "").append(",")
                    .append(p.getCreatedDate()).append("\n");
        }

        byte[] csvBytes = csv.toString().getBytes();

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=policies.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvBytes);
    }

    // FILE UPLOAD API
    @PostMapping(
    value = "/{id}/upload",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
    public ResponseEntity<String> uploadFile(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("File is empty");
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                (!contentType.equals("application/pdf")
                        && !contentType.equals("image/jpeg")
                        && !contentType.equals("image/png")
                        && !contentType.equals("text/plain"))) {

            return ResponseEntity.badRequest()
                    .body("Invalid file type");
        }

        long maxSize = 5 * 1024 * 1024;

        if (file.getSize() > maxSize) {
            return ResponseEntity.badRequest()
                    .body("File size exceeds 5MB");
        }

        try {

            String uploadDir = "uploads/";

            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = id + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);

            Files.write(path, file.getBytes());

            return ResponseEntity.ok("File uploaded successfully");

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("File upload failed");
        }
    }
}