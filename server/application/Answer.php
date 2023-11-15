<?php

class Answer
{
    static $CODES = array(
        '101' => 'param method not setted',
        '102' => 'method not found',
        '242' => 'params not set fully ',
        '404' => 'not found',
        '555' => 'Is it Polygon?',
        '605' => ' In selected team more gamers than in the other. Please, select other team ',
        '700' => 'No skins',
        '701' => 'Skin is not found',
        '705' => 'User is not found',
        '706'=> 'text message is empty',
        '707'=>'could not send message', // e-mail;
        '708'=>'invalid code from E-mail',
        '999' => 'Is it Triangle?',
        '1001' => 'params login or password not set',
        '1002' => 'error in auth user',
        '1003' => 'Is it unique login?',
        '1004' => 'Unable to find user.',
        '9000' => 'unknown error'
    );

    static function response($data)
    {
        if ($data) {
            if (!is_bool($data) && array_key_exists('error', $data)) {
                $code = $data['error'];
                return [
                    'result' => 'error',
                    'error' => [
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    ]
                ];
            }
            return [
                'result' => 'ok',
                'data' => $data
            ];
        }
        $code = 9000;
        return [
            'result' => 'error',
            'error' => [
                'code' => $code,
                'text' => self::$CODES[$code]
            ]
        ];

    }

}