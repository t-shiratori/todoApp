//mongooseオブジェクトを作成
var mongoose = require('mongoose');

//スキーマクラスを用意
var Schema = mongoose.Schema;

//スキーマを定義
//スキーマクラスにjson形式でデータ形式を指定してインスタンスを作成
var schema = new Schema({
	title: String,
	body: String
});

//モデルクラスを作成
var Task = mongoose.model('Task', schema);

//モデルをモジュールのエクスポートにセット
module.exports = Task;