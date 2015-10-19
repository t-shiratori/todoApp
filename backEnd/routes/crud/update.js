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

	var query,
		db_con;

	//クエリデータ
	query = req.query;

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

		//データをDBに登録
		Model.update(query,updateData,function (err) {
			if (err){
				res.send('更新失敗');	
				//何かしらレスを返す
				db_con.close();
			} else{
				res.send('更新成功');
				//何かしらレスを返す
				db_con.close();
			}
		});
		
	});

});


/*--------------------------- 

POST

-----------------------------*/
router.post('/', function(req, res, next) {

	var reqBody,//bodyに値があるのはpost送信のみ
		targetId,//_idで指定する場合ObjectId型に変換する必要がある
		query,
		updateData = {},
		db_con;

	//クエリデータ
	reqBody = req.body;//bodyに値があるのはpost送信のみ
	targetId = mongoose.Types.ObjectId(reqBody.id);//_idで指定する場合ObjectId型に変換する必要がある
	query = {_id:targetId};
	updateData = {
		title : reqBody.task_new_title,
		body : reqBody.task_new_body
	};

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

		//データをDBに登録
		Model.update(query,updateData,function (err) {
			if (err){
				db_con.close();
				//何かしらレスを返す
				res.send('err');
			} else{
				db_con.close();
				//何かしらレスを返す
				res.send('success');
			}
		});
		
	});

});


/*--------------------------- 

PUT

-----------------------------*/
router.put('/', function(req, res, next) {

	var query = {},
		updateData = {},
		db_con;

	//クエリデータ
	query = {
		title: 'タイトル4',
		author : '著者4',
		price : 2500,
		date : '2015/11/20'
	}

	//更新データ
	updateData = {
		title: 'タイトル4000',
		author : '著者4000',
		price : 21000,
		date : '2015/12/20'
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

		var Book;
	  
		//モデルクラスを用意
		Book = models.book;

		//データをDBに登録
		Book.update(query,updateData,function (err) {
			if (err){
				db_con.close();
				//何かしらレスを返す
				res.send('更新失敗');
			} else{
				db_con.close();
				//何かしらレスを返す
				res.send('更新成功');
			}
		});
		
	});
 
});


module.exports = router;
