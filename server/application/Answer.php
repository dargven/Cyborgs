<?php
class Answer{
    static array $CODES = array(
        '101' => 'param method not setted',
        '102' => 'method not found',
        '404' => 'not found',
        '9000' => 'unknown error',
        '1001' => 'Unknown user/password',
        '242' => 'params not set fully ',
    );

    static function response(array $data): array
    {
        if(!empty($data)){
            if(!empty($data['error'])){
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