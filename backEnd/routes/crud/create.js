var express = require('express'),
	router = express.Router(),
	//モデル集モジュールを読み込んでおく
	models = require('../../model/models'),
	//mongooseオブジェクトを作成
	mongoose = require('mongoose'),
	//DBのURL
	url_db = 'mongodb://localhost:27017/todoApp';


/*--------------------------- 

POST

-----------------------------*/
router.post('/', function(req, res, next) {

	var reqBody,
		setData = {},
		db_con;

	reqBody = req.body;

	//登録用データ
	setData = {
		title: reqBody.task_new_title,
		body: reqBody.task_new_body
	}

	//DB接続
	mongoose.connect(url_db);

	//コネクションオブジェクトを取っておく
	db_con = mongoose.connection;

	//コネクション状況を監視
	//接続エラー
	db_con.on('error', console.error.bind(console, 'connection error:'));
	//接続成功
	db_con.once('open', function (callback) {

		var Model,
			model;
	  
		//モデルクラスを用意
		Model = models.task;

		//モデルクラスからインスタンスを作成
		model = new Model(setData);

		//データをDBに登録
		model.save(function (err) {
			if (err){
				db_con.close();	
				//何かしらレスを返す
				res.send('err');
			} else{
				/*
					resオブジェクトのメソッドで何かしらレスポンスを返さないと、クライアントのsaveメソッドのコールバックが発火しない
				*/
				db_con.close();
				//何かしらレスを返す
				res.send('sucess');
			}
		});
		
	});
 
});


module.exports = router;
