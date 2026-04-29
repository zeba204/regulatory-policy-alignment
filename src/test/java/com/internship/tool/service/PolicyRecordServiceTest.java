package com.internship.tool.service;

import com.internship.tool.entity.PolicyRecord;
import com.internship.tool.exception.ResourceNotFoundException;
import com.internship.tool.repository.PolicyRecordRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PolicyRecordServiceTest {

    @Mock
    private PolicyRecordRepository repository;

    @InjectMocks
    private PolicyRecordService service;

    @Test
    void testSavePolicy() {
        PolicyRecord policy = new PolicyRecord();
        policy.setPolicyName("Data Privacy Policy");
        policy.setDescription("Privacy rules");
        policy.setCategory("Security");
        policy.setStatus("Active");

        when(repository.save(policy)).thenReturn(policy);

        PolicyRecord result = service.savePolicy(policy);

        assertNotNull(result);
        assertEquals("Data Privacy Policy", result.getPolicyName());
        verify(repository, times(1)).save(policy);
    }

    @Test
    void testGetAllPolicies() {
        PolicyRecord p1 = new PolicyRecord();
        p1.setPolicyName("Policy One");

        PolicyRecord p2 = new PolicyRecord();
        p2.setPolicyName("Policy Two");

        when(repository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<PolicyRecord> result = service.getAllPolicies();

        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testGetPolicyByIdSuccess() {
        PolicyRecord policy = new PolicyRecord();
        policy.setPolicyName("Security Policy");

        when(repository.findById(1L)).thenReturn(Optional.of(policy));

        PolicyRecord result = service.getPolicyById(1L);

        assertNotNull(result);
        assertEquals("Security Policy", result.getPolicyName());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void testGetPolicyByIdNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.getPolicyById(99L);
        });

        verify(repository, times(1)).findById(99L);
    }

    @Test
    void testUpdatePolicySuccess() {
        PolicyRecord existing = new PolicyRecord();
        existing.setPolicyName("Old Policy");
        existing.setDescription("Old Description");
        existing.setCategory("Old Category");
        existing.setStatus("Draft");

        PolicyRecord updated = new PolicyRecord();
        updated.setPolicyName("Updated Policy");
        updated.setDescription("Updated Description");
        updated.setCategory("Updated Category");
        updated.setStatus("Active");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        PolicyRecord result = service.updatePolicy(1L, updated);

        assertEquals("Updated Policy", result.getPolicyName());
        assertEquals("Updated Description", result.getDescription());
        assertEquals("Updated Category", result.getCategory());
        assertEquals("Active", result.getStatus());
        verify(repository, times(1)).save(existing);
    }

    @Test
    void testUpdatePolicyNotFound() {
        PolicyRecord updated = new PolicyRecord();
        updated.setPolicyName("Updated Policy");

        when(repository.findById(10L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.updatePolicy(10L, updated);
        });

        verify(repository, never()).save(any(PolicyRecord.class));
    }

    @Test
    void testDeletePolicySuccess() {
        PolicyRecord policy = new PolicyRecord();
        policy.setPolicyName("Delete Policy");

        when(repository.findById(1L)).thenReturn(Optional.of(policy));

        service.deletePolicy(1L);

        verify(repository, times(1)).delete(policy);
    }

    @Test
    void testDeletePolicyNotFound() {
        when(repository.findById(50L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.deletePolicy(50L);
        });

        verify(repository, never()).delete(any(PolicyRecord.class));
    }

    @Test
    void testSaveRepositoryCalledOnce() {
        PolicyRecord policy = new PolicyRecord();
        policy.setPolicyName("Compliance Policy");
        policy.setDescription("Compliance description");
        policy.setCategory("Compliance");
        policy.setStatus("Active");

        when(repository.save(policy)).thenReturn(policy);

        service.savePolicy(policy);

        verify(repository, times(1)).save(policy);
    }

    @Test
    void testGetAllPoliciesEmptyList() {
        when(repository.findAll()).thenReturn(Arrays.asList());

        List<PolicyRecord> result = service.getAllPolicies();

        assertTrue(result.isEmpty());
        verify(repository, times(1)).findAll();
    }
}