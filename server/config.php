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

//DB.CONFIG
//----------------------------------------------------------------------------//

// PROD

$_ENV['HOST_PROD'] = 'server187.hosting.reg.ru';
$_ENV['PORT_PROD'] = 3306;
$_ENV['USER_PROD'] = 'u2333359_dargven';
$_ENV['PASS_PROD'] = 'bAq-UKv-YCK-fxx';
$_ENV['DB_PROD'] = 'u2333359_Cyborgs';

// LOCAL

$_ENV['HOST_LC1'] = '127.0.0.1';
$_ENV['PORT_LC1'] = 3306;
$_ENV['USER_LC1'] = 'root';
$_ENV['PASS_LC1'] = '';
$_ENV['DB_LC1'] = 'Cyborgs';

$_ENV['HOST_LC2'] = 'localhost';
$_ENV['PORT_LC2'] = 8889;
$_ENV['USER_LC2'] = 'root';
$_ENV['PASS_LC2'] = '123';
$_ENV['DB_LC2'] = 'Cyborgs';
//END OF DB.CONFIG
//----------------------------------------------------------------------------//

