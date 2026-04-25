package com.internship.tool.controller;

import com.internship.tool.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String toEmail) {
        return emailService.sendReminderEmail(
                toEmail,
                "Policy Reminder",
                "Please review the pending regulatory policy before deadline."
        );
    }
}