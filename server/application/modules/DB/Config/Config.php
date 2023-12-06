<?php

/*class Config
{
    //  WEB
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

//    static $configLocal = [
//        'host' => 'localhost',
//        'port' => 8889,
//        'user' => 'root',
//        'pass' => '123',
//        'db' => 'Cyborgs'
//    ];
}*/

// PROD

$_ENV['HOST'] = 'server187.hosting.reg.ru';
$_ENV['PORT'] = 3306;
$_ENV['USER'] = 'u2333359_dargven';
$_ENV['PASS'] = 'bAq-UKv-YCK-fxx';
$_ENV['DB'] = 'u2333359_Cyborgs';

// LOCAL

//$_ENV['HOST'] = '127.0.0.1';
//$_ENV['PORT'] = 3306;
//$_ENV['USER'] = 'root';
//$_ENV['PASS'] = '';
//$_ENV['DB'] = 'Cyborgs';

//$_ENV['HOST'] = 'localhost';
//$_ENV['PORT'] = 8889;
//$_ENV['USER'] = 'root';
//$_ENV['PASS'] = '123';
//$_ENV['DB'] = 'Cyborgs';
