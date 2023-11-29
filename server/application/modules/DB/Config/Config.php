<?php

class Config
{
    //WEB
    //  https://server187.hosting.reg.ru/phpmyadmin/
    static $configProd = [
        'host' => 'server187.hosting.reg.ru',
        'port' => '3306',
        'user' => 'u2333359_dargven',
        'pass' => 'bAq-UKv-YCK-fxx',
        'db' => 'u2333359_Cyborgs',

    ];
    static $configLocal = [
        'host' => '127.0.0.1',
        'port' => 3306,
        'user' => 'root',
        'pass' => '',
        'db' => 'Cyborgs'
    ];
}