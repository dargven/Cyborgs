<?php


use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/../../../vendor/autoload.php';

class Mailer
{
    private PHPMailer $mail;


    public function __construct()
    {
        $this->mail = new PHPMailer(true);

    }

    public function sendEmail($to, $subject, $body)
    {
        try {
            $this->mail->isSMTP();
            $this->mail->Host = $_ENV['Mail_Host'];
            $this->mail->SMTPAuth = true;
            $this->mail->Username = $_ENV['Mail_UserName'];
            $this->mail->Password = $_ENV['Mail_Password'];
            $this->mail->SMTPSecure = 'tls';
            $this->mail->isHTML(true);
            $this->mail->Port = $_ENV['Mail_Port'];

            $this->mail->setFrom('cyborgs@game.ru', 'Your Cyborgs');
            $this->mail->addAddress($to);
            $this->mail->Subject = $subject;
            $this->mail->Body = $body;
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }

    }


}
