//>>built
define("dojox/lang/oo/aop",["dijit","dojo","dojox","dojo/require!dojox/lang/oo/Decorator,dojox/lang/oo/general"],function(k,b,h){b.provide("dojox.lang.oo.aop");b.require("dojox.lang.oo.Decorator");b.require("dojox.lang.oo.general");(function(){var a=h.lang.oo,e=a.makeDecorator,g=a.general,a=a.aop,f=b.isFunction;a.before=g.before;a.around=g.wrap;a.afterReturning=e(function(a,d,c){return f(c)?function(){var a=c.apply(this,arguments);d.call(this,a);return a}:function(){d.call(this)}});a.afterThrowing=
e(function(a,d,c){return f(c)?function(){var a;try{a=c.apply(this,arguments)}catch(b){throw d.call(this,b),b;}return a}:c});a.after=e(function(a,b,c){return f(c)?function(){var a;try{a=c.apply(this,arguments)}finally{b.call(this)}return a}:function(){b.call(this)}})})()});