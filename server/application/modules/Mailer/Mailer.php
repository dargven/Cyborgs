<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer
{
    protected PHPMailer $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);

        // Настройки сервера SMTP
        $this->mail->isSMTP();
        $this->mail->Host = 'smtp.yandex.ru';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = 'cy8orgs';
        $this->mail->Password = 'm7n-DZW-yVe-t8n';
        $this->mail->SMTPSecure = 'SSL';
        $this->mail->Port = 465;

        // Остальные настройки, если необходимо

        // Адрес отправителя по умолчанию
        $this->mail->setFrom('cy8orgs@yandex.ru', 'Your Name');
    }

    public function sendMail($recipient, $subject, $body)
    {
        try {
            // Адрес получателя
            $this->mail->addAddress($recipient);

            // Тело письма
            $this->mail->isHTML(true);
            $this->mail->Subject = $subject;
            $this->mail->Body = $body;

            // Отправка письма
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return ['error' => '24242'];
        } finally {
            // Сброс настроек после отправки
            $this->mail->clearAddresses();
            $this->mail->clearAttachments();
        }
    }
}
