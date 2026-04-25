package com.internship.tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ReminderScheduler {

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendDailyReminder() {
        System.out.println("Daily reminder scheduler executed");

        emailService.sendReminderEmail(
                "your_email@gmail.com",
                "Daily Policy Reminder",
                "This is your daily reminder to review pending policies."
        );
    }

    @Scheduled(cron = "0 0 18 * * ?")
    public void sendDeadlineAlert() {
        System.out.println("Deadline alert scheduler executed");

        emailService.sendReminderEmail(
                "your_email@gmail.com",
                "Policy Deadline Alert",
                "Deadline alert: Please complete policy review before end of day."
        );
    }
}