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
            $hash = md5(rand(0, 1000000));
            $this->db->updateChatHash($hash);
            return true;
        }
        return ['error' => 706];
    }

    public function getMessage($hash)
    {
        $hashes = $this->db->getHashes();
        if ($hash !== $hashes->chat_hash) {
            $messages = $this->db->getMessage();
            return [
                'messages' => $messages,
                'hash' => $hashes->chat_hash
            ];
        }
        return true;
    }

}