<?php
return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=virtualguide',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
        ],
         'mailer' => [
        'class' => 'yii\swiftmailer\Mailer',
        'transport' => [
            'class' => 'Swift_SmtpTransport',
            'host' => 'smtp.gmail.com',
            'username' => 'kgit.future@gmail.com',
            'password' => 'kabza777',
            'port' => '587',
            'encryption' => 'tls',
			],
		],
    ],
];
