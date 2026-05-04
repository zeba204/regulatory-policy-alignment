package com.internship.tool.config;

import com.internship.tool.entity.AuditLog;
import com.internship.tool.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;

    @AfterReturning("execution(* com.internship.tool.service.*.create*(..))")
    public void logCreate(JoinPoint joinPoint) {
        saveLog("CREATE", joinPoint);
    }

    @AfterReturning("execution(* com.internship.tool.service.*.update*(..))")
    public void logUpdate(JoinPoint joinPoint) {
        saveLog("UPDATE", joinPoint);
    }

    @AfterReturning("execution(* com.internship.tool.service.*.delete*(..))")
    public void logDelete(JoinPoint joinPoint) {
        saveLog("DELETE", joinPoint);
    }

    private void saveLog(String action, JoinPoint joinPoint) {
        try {
            String performedBy = "anonymous";
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                performedBy = auth.getName();
            }

            AuditLog log = new AuditLog();
            log.setAction(action);
            log.setEntityName("PolicyRecord");
            log.setPerformedBy(performedBy);
            log.setDetails(joinPoint.getSignature().getName());

            auditLogRepository.save(log);
        } catch (Exception e) {
            log.error("Audit logging failed: {}", e.getMessage());
        }
    }
}