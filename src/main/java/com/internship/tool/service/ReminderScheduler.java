package com.internship.tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReminderScheduler {

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 18 * * ?") // 6 PM daily
    public void sendReminder() {

        System.out.println("Running scheduled reminder...");

        emailService.sendEmail(
                "test@example.com",
                "Reminder",
                "This is your daily reminder!"
        );
    }
}