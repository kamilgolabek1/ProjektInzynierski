<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'frontend\controllers',
	'name' => 'Wirtualny Przewodnik',
    'components' => [
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
    		'urlManager' => [
					'class' => 'yii\web\UrlManager',
					'enablePrettyUrl' => true,
					'showScriptName' => false,
    				//'enableStrictParsing' => false,
    				'rules' => [
    						'<alias:index|contact|komentarze|location|login|signup>' => 'site/<alias>',
    						'<alias:forum|topics|replies>' => 'forum/<alias>',
    				],
			],
    ],
    'params' => $params,
];
