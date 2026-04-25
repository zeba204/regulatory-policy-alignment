package com.internship.tool.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.enabled:false}")
    private boolean mailEnabled;

    public String sendReminderEmail(String toEmail, String subject, String messageText) {
        try {
            Context context = new Context();
            context.setVariable("message", messageText);

            String htmlContent = templateEngine.process("reminder-email", context);

            if (!mailEnabled) {
                System.out.println("Demo Email Sent");
                System.out.println("To: " + toEmail);
                System.out.println("Subject: " + subject);
                System.out.println("Message: " + messageText);
                return "Demo email notification generated successfully";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);

            return "Email sent successfully";
        } catch (Exception e) {
            return "Email sending failed: " + e.getMessage();
        }
    }
}