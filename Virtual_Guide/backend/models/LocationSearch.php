<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use backend\models\Location;

/**
 * LocationSearch represents the model behind the search form about `backend\models\Location`.
 */
class LocationSearch extends Location
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ID', 'category', 'zoom'], 'integer'],
            [['name', 'descr', 'lon', 'lat', 'forumID', 'address'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Location::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
            'ID' => $this->ID,
            'category' => $this->category,
            'zoom' => $this->zoom,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'descr', $this->descr])
            ->andFilterWhere(['like', 'lon', $this->lon])
            ->andFilterWhere(['like', 'lat', $this->lat])
            ->andFilterWhere(['like', 'forumID', $this->forumID])
            ->andFilterWhere(['like', 'address', $this->address]);

        return $dataProvider;
    }
}
