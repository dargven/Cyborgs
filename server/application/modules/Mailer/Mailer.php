<?php


use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

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
            $this->mail->Host = 'smtp-relay.brevo.com';
            $this->mail->SMTPAuth = true;
            $this->mail->Username = 'dargvel@gmail.com';
            $this->mail->Password = 'w95fDd7txYUqmgna';
            $this->mail->SMTPSecure = 'tls';
            $this->mail->isHTML(true);
            $this->mail->Port = 587;

            $this->mail->setFrom('cyborgs@game.ru', 'Your Cyborgs');
            $this->mail->addAddress($to);
            $this->mail->Subject = $subject;
            $this->mail->isHTML(true);
            $body = file_get_contents(__DIR__ . '/../../../src/Mail/PasswordRecovery/PasswordRecovery.php');
            $this->mail->Body = $body;
            $this->mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }

    }


}
