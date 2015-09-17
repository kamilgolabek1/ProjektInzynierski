<?php
use yii\helpers\Html;
use frontend\models\User;
 Html::csrfMetaTags();
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$this->title = $model->Nazwa;
$this->params['breadcrumbs'][] = ['label' => 'Forum', 'url' => ['forum']];
$this->params['breadcrumbs'][] = $this->title;
?>
<script src="../../js/ckeditor/ckeditor.js"></script>

<?php echo "<h3>".$model->Nazwa."</h3>";

 echo "<h5>".$model->Opis."</h5>";
?>
</br>
<?php 

 if (Yii::$app->user->isGuest) {
     echo "<h4>Aby móc dodawać opinie, zaloguj się</h4>";
 }else {
     echo "<h4>Dodaj komentarz</h4>";
     $url=Yii::$app->urlManager->createUrl('site/add'); 
     ?>
    <form action=<?php echo $url; ?>  method="POST">
        <input type="hidden" name="id" value=<?php echo $model->ID; ?> >
        <textarea name="komentarz" id="komentarz" rows="2" cols="10" ></textarea></br>
        <input type="submit" value="Dodaj Komentarz">

        <input type="hidden" name="_csrf" value="<?=Yii::$app->request->getCsrfToken()?>" />
    </form>
<?php
 }
?>
</br></br>
<table class="table table-striped table-bordered detail-view">
<tr>
    <th>Uzytkownik</th>
    <th>Komentarz</th> 
</tr>
 <?php

    foreach($model->comments as $row)
  { 
      $User = User::find()
    ->where(['id' => $row->UserID])
    ->one();

    echo "<tr><td width='20%'>".$User->username.""
            . "</br>"
            .$row->Data. "</td><td>".$row->Comment."</td></tr>";
  }?>
</table>





<script>
 CKEDITOR.replace( 'komentarz' );
 
</script>
