var ngModule;ngModule=angular.module("todoApp",["ngResource","ngRoute"]),ngModule.config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/edit/:id",{templateUrl:"views/edit.html",controller:"EditController"}).otherwise({redirectTo:"/"})}]).service("myFuncs",["$rootScope",function(t){}]).controller("MainController",["$scope","$resource","myFuncs",function(t,e,a){t.tasks,t.read,t.create,t.deletes=[];var o,n,r,s;o=e("http://localhost:3000/crud_create"),n=e("http://localhost:3000/crud_read"),r=e("http://localhost:3000/crud_delete"),s=e("http://localhost:3000/crud_update"),t.getData=function(){t.read=n.query(),t.read.$promise.then(function(e){t.tasks=e})},t.saveData=function(){t.task_new_title&&(t.create=o.save({task_new_title:t.task_new_title,task_new_body:t.task_new_body}),t.create.$promise.then(function(e){t.getData(),t.task_new_title="",t.task_new_body=""}))},t.deleteData=function(){var e=[];angular.forEach(t.deletes,function(t){e.push(t._id)}),r.save(e,function(){t.getData()})},t.update_deltasks=function(){t.deletes=[],angular.forEach(t.tasks,function(e){e.checked&&t.deletes.push(e)})},t.getData()}]).controller("EditController",["$scope","$resource","$routeParams","myFuncs",function(t,e,a,o){t.read_one,t.task_one,t.targetId=a.id;var n,r;n=e("http://localhost:3000/crud_read"),r=e("http://localhost:3000/crud_update"),t.getTheData=function(e){t.read_one=n.save(e),t.read_one.$promise.then(function(e){t.task_one=e.result[0],t.task_new_title=t.task_one.title,t.task_new_body=t.task_one.body})},t.updateData=function(){t.task_new_title&&(t.update=r.save({id:t.targetId,task_new_title:t.task_new_title,task_new_body:t.task_new_body}),t.update.$promise.then(function(e){t.task_new_title="",t.task_new_body=""}))},t.getTheData({id:t.targetId})}]);