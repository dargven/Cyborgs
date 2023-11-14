<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '/Users/brize/PhpstormProjects/HotOvci/server/vendor/autoload.php';

class Mailer
{
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);

        //Настройка подключения
        $this->mail->isSMTP();
        $this->mail->Host = 'smtp-relay.brevo.com';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = 'dargvel@gmail.com';
        $this->mail->Password = 'w95fDd7txYUqmgna';
        $this->mail->SMTPSecure = 'tls';
        $this->mail->Port = 587;

    }

    public function sendEmail($to, $subject, $body)
    {
        try {
            $this->mail->addAddress($to);
            $this->mail->Subject = $subject;
            $this->mail->Body = $body;
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return ['error' => 707];
        }

    }

}
