<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

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
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//


// Mail CONFIG
//----------------------------------------------------------------------------//

$_ENV['Mail_Host'] = 'smtp-relay.brevo.com';
$_ENV['Mail_UserName'] = 'dargvel@gmail.com';
$_ENV['Mail_Password'] = 'w95fDd7txYUqmgna';
$_ENV['Mail_Port'] = 587;
// END OF Mail CONFIG
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//


// Game CONFIG
//----------------------------------------------------------------------------//
