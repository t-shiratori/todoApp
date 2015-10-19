var express = require('express'),
	router = express.Router(),
	//モデル集モジュールを読み込んでおく
	models = require('../../model/models'),
	//mongooseオブジェクトを作成
	mongoose = require('mongoose'),
	//DBのURL
	url_db = 'mongodb://localhost:27017/todoApp';


/*--------------------------- 

GET

-----------------------------*/
router.get('/', function(req, res, next) {

	var db_con,
		reqBody;

	reqBody = req.body;

	//DB接続
	mongoose.connect(url_db);

	//コネクションオブジェクトを取っておく
	db_con = mongoose.connection;

	//コネクション状況を監視
	//接続エラー
	db_con.on('error', console.error.bind(console, 'connection error:'));
	//接続成功
	db_con.once('open', function (callback) {

		var Model;
	  
		//モデルクラスを用意
		Model = models.task;

		Model.find({},function(err,docs){
			if(err){
				db_con.close();
				//何かしらレスを返す
				res.end();
			}else{
				db_con.close();
				res.type('json');
				
				/*　
				res.redirect('back');はエラー（No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.）になる。
				原因はajaxとgetとredirect('back')の組み合わせ？？bd_createはformのpostで同じ処理をしているが大丈夫。追記:formとgetでもcorsエラーになった。
				*/			
				res.json(docs);
			}
			
		});

	});
 
});


/*--------------------------- 

POST

-----------------------------*/
router.post('/', function(req, res, next) {

	var db_con,
		reqBody,
		targetId,
		query;

	reqBody = req.body;
	targetId = mongoose.Types.ObjectId(reqBody.id);//_idで指定する場合ObjectId型に変換する必要がある
	query = {_id:targetId};

	//DB接続
	mongoose.connect(url_db);

	//コネクションオブジェクトを取っておく
	db_con = mongoose.connection;

	//コネクション状況を監視
	//接続エラー
	db_con.on('error', console.error.bind(console, 'connection error:'));
	//接続成功
	db_con.once('open', function (callback) {

		var Model;
	  
		//モデルクラスを用意
		Model = models.task;

		Model.find(query,function(err,docs){
			if(err){
				db_con.close();
				//何かしらレスを返す
				res.end();
			}else{
				db_con.close();
				res.type('json');
				/*
					getのとき違う。
					なぜか res.json(docs);
					だとエラーになる。
				*/
				res.json({result:docs});
			}
			
		});

	});
 
});


module.exports = router;
