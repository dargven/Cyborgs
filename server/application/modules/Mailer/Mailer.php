<?php

namespace App\server\application\modules\Mailer\Mailer;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require_once '/Users/brize/PhpstormProjects/HotOvci/server/vendor/autoload.php';
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
            $this->mail->Body = $body;
            $this->mail->send();
            var_dump('asd');

            return true;
        } catch (Exception $e) {
            var_dump('asd');
            return ['error' => 707];
        }

    }


}
