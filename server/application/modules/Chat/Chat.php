<?php

class Chat
{
    private DB $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function sendMessage($id, $message)
    {
        if (!empty($message)) {
            $this->db->sendMessage($id, $message);
        }
        return ['error' => 706];
    }

    public function getMessage()
    {
        return $this->db->getMessage();
    }

}