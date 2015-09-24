<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\LocationSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="location-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'ID') ?>

    <?= $form->field($model, 'name') ?>

    <?= $form->field($model, 'descr') ?>

    <?= $form->field($model, 'lon') ?>

    <?= $form->field($model, 'lat') ?>

    <?php // echo $form->field($model, 'forumID') ?>

    <?php // echo $form->field($model, 'address') ?>

    <?php // echo $form->field($model, 'category') ?>

    <?php // echo $form->field($model, 'zoom') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
