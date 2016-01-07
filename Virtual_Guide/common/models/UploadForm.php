<?php
namespace common\models;

use yii\base\Model;
use yii\web\UploadedFile;

class UploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $imageFile;

    public function rules()
    {
        return [
            [['imageFile'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg'],
        ];
    }
    public function attributeLabels()
    {
    	return [
    			'imageFile' => '',
    	];
    }
    
    public function upload($name)
    {
       // if ($this->validate()) {
            $this->imageFile->saveAs('uploads/' . $name . '.' . $this->imageFile->extension);
            return true;
       // } else {
            return false;
        //}
    }
}