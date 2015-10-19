var ngModule;
ngModule = angular.module('todoApp', ['ngResource','ngRoute']);



ngModule
/*------------------------

ルーティングの設定

-------------------------*/
.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditController'
      })
      .otherwise({
        redirectTo: '/'
      });
}])
/*------------------------

モデル（サービス）

-------------------------*/
.service('myFuncs',["$rootScope",function($rootScope){
	//ビジネスロジックはここに書く
	//今回は使ってない
}])
/*------------------------

コントローラー

-------------------------*/
//メインコントローラー
.controller('MainController',['$scope','$resource','myFuncs',function($scope,$resource,myFuncs){

	$scope.tasks;
	$scope.read;
	$scope.create;
	$scope.deletes = [];
	
	var $resource_create,
		$resource_read,
		$resource_delete,
		$resource_update;

	//$resourceはajax通信
	$resource_create = $resource("http://localhost:3000/crud_create");
	$resource_read = $resource("http://localhost:3000/crud_read");
	$resource_delete = $resource("http://localhost:3000/crud_delete");
	$resource_update = $resource("http://localhost:3000/crud_update");
	
	//DBからデータの取得
	$scope.getData = function(){
		$scope.read = $resource_read.query();
		$scope.read.$promise.then(function(data){
			$scope.tasks = data;
		});
	};

	//DBにデータを保存
	$scope.saveData = function () {
		//ngバリデーションでinvalidが有る場合は$scope.task_newはundefinedになるのでif文を通過しない
		if($scope.task_new_title){
			//saveはpostメソッドの送信になる
			$scope.create = $resource_create.save({
				task_new_title : $scope.task_new_title,
				task_new_body : $scope.task_new_body
			});
			$scope.create.$promise.then(function(data){
				$scope.getData();
				//inputを空にする
				$scope.task_new_title = "";
				$scope.task_new_body = "";
			});
		}
	};

	//DBからデータを削除
	$scope.deleteData = function () {
		//deleteメソッドはurlにパラメーターをつけて送信される
		//サーバー側はreq.queryに渡したパラメーターが入っている
		var sendData = [];
		angular.forEach($scope.deletes,function(task){
			sendData.push(task._id);
		});
		//post送信したいのでsaveで実行
		$resource_delete.save(sendData, function () {
			$scope.getData();
		});
	};

	//削除予定データの更新
	$scope.update_deltasks = function(){
		/*
			ng-modelはそのタグがもつvalueをやりとりするもの。
			ng-model="task.checked"としておくとtask.checkedにvalueがセットされる。
			↓こんな感じ
			task:{
				checked : true
			}
		*/
		$scope.deletes = [];
		angular.forEach($scope.tasks, function(task) {
	      if (task.checked) $scope.deletes.push(task);
	    });
	};

	//ページロードしたら一旦DBのデータを読み込む
	$scope.getData();

}]).
//編集画面コントローラー
controller('EditController',['$scope','$resource','$routeParams','myFuncs',function($scope,$resource,$routeParams,myFuncs){

	$scope.read_one;
	$scope.task_one;

	$scope.targetId = $routeParams.id;
	
	var $resource_read,
		$resource_update;

	//$resourceはajax通信
	$resource_read = $resource("http://localhost:3000/crud_read");
	$resource_update = $resource("http://localhost:3000/crud_update");

	//DBから指定データの取得
	$scope.getTheData = function(query){
		$scope.read_one = $resource_read.save(query);
		$scope.read_one.$promise.then(function(data){
			$scope.task_one = data.result[0];
			$scope.task_new_title = $scope.task_one.title;
			$scope.task_new_body = $scope.task_one.body;
		});
	};

	//DBのデータを更新
	$scope.updateData = function () {
		//$resourceオブジェクトにはputメソッドがないのでsaveで行う

		if($scope.task_new_title){
			//saveはpostメソッドの送信になる
			$scope.update = $resource_update.save({
				id : $scope.targetId,
				task_new_title : $scope.task_new_title,
				task_new_body : $scope.task_new_body
			});
			$scope.update.$promise.then(function(data){
				$scope.task_new_title = "";
				$scope.task_new_body = "";
			});
		}
	};

	$scope.getTheData({id:$scope.targetId});

}]);


