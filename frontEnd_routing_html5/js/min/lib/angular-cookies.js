!function(e,n,o){"use strict";function t(e,o,t){function i(e,t,i){var u,c;i=i||{},c=i.expires,u=n.isDefined(i.path)?i.path:r,n.isUndefined(t)&&(c="Thu, 01 Jan 1970 00:00:00 GMT",t=""),n.isString(c)&&(c=new Date(c));var s=encodeURIComponent(e)+"="+encodeURIComponent(t);s+=u?";path="+u:"",s+=i.domain?";domain="+i.domain:"",s+=c?";expires="+c.toUTCString():"",s+=i.secure?";secure":"";var f=s.length+1;return f>4096&&o.warn("Cookie '"+e+"' possibly not set or overflowed because it was too large ("+f+" > 4096 bytes)!"),s}var r=t.baseHref(),u=e[0];return function(e,n,o){u.cookie=i(e,n,o)}}n.module("ngCookies",["ng"]).provider("$cookies",[function(){function e(e){return e?n.extend({},t,e):t}var t=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(t,i){return{get:function(e){return t()[e]},getObject:function(e){var o=this.get(e);return o?n.fromJson(o):o},getAll:function(){return t()},put:function(n,o,t){i(n,o,e(t))},putObject:function(e,o,t){this.put(e,n.toJson(o),t)},remove:function(n,t){i(n,o,e(t))}}}]}]),n.module("ngCookies").factory("$cookieStore",["$cookies",function(e){return{get:function(n){return e.getObject(n)},put:function(n,o){e.putObject(n,o)},remove:function(n){e.remove(n)}}}]),t.$inject=["$document","$log","$browser"],n.module("ngCookies").provider("$$cookieWriter",function(){this.$get=t})}(window,window.angular);