<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */


$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Locations', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="location-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Aktualizuj', ['update', 'id' => $model->ID], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Usuń', ['delete', 'id' => $model->ID], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'ID',
            'name',
            'descr',
            'lon',
            'lat',
            'country.country_name',
        	'category.name',
            'address',
            'zoom',
        	'tag',
        	'user.username'
           
        ],
    ]) ?>

</div>
