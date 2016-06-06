define(function(require, exports, module){

(function(window,undefined){

var PENDING = undefined, FULFILLED = 1, REJECTED = 2;

var isFunction = function(obj){
	return 'function' === typeof obj;
}
var isArray = function(obj) {
  	return Object.prototype.toString.call(obj) === "[object Array]";
}
var isThenable = function(obj){
  	return obj && typeof obj['then'] == 'function';
}

var transition = function(status,value){
	var promise = this;
	if(promise._status !== PENDING) return;
	// 所以的执行都是异步调用，保证then是先执行的
	setTimeout(function(){
		promise._status = status;
		publish.call(promise,value);
	});
}
var publish = function(val){
	var promise = this,
    	fn,
    	st = promise._status === FULFILLED,
    	queue = promise[st ? '_resolves' : '_rejects'];
    
    while(fn = queue.shift()) {
        val = fn.call(promise, val) || val;
    }
    promise[st ? '_value' : '_reason'] = val;
    promise['_resolves'] = promise['_rejects'] = undefined;
}

var Promise = function(resolver){
	if (!isFunction(resolver))
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	if(!(this instanceof Promise)) return new Promise(resolver);

	var promise = this;
	promise._value;
	promise._reason;
	promise._status = PENDING;
	promise._resolves = [];
	promise._rejects = [];
	
	var resolve = function(value){
		transition.apply(promise,[FULFILLED].concat([value]));
	}
	var reject = function(reason){
		transition.apply(promise,[REJECTED].concat([reason]));
	}
	
	resolver(resolve,reject);
}

Promise.prototype.then = function(onFulfilled,onRejected){
	var promise = this;
	// 每次返回一个promise，保证是可thenable的
	return Promise(function(resolve,reject){
		function callback(value){
	      var ret = isFunction(onFulfilled) && onFulfilled(value) || value;
	      if(isThenable(ret)){
	        ret.then(function(value){
	           resolve(value);
	        },function(reason){
	           reject(reason);
	        });
	      }else{
	        resolve(ret);
	      }
	    }
	    function errback(reason){
	    	reason = isFunction(onRejected) && onRejected(reason) || reason;
	    	reject(reason);
	    }
		if(promise._status === PENDING){
       		promise._resolves.push(callback);
       		promise._rejects.push(errback);
       	}else if(promise._status === FULFILLED){ // 状态改变后的then操作，立刻执行
       		callback(promise._value);
       	}else if(promise._status === REJECTED){
       		errback(promise._reason);
       	}
	});
}

Promise.prototype.catch = function(onRejected){
	return this.then(undefined, onRejected)
}

Promise.prototype.delay = function(ms){
	return this.then(function(val){
		return Promise.delay(ms,val);
	})
}

Promise.delay = function(ms,val){
	return Promise(function(resolve,reject){
		setTimeout(function(){
			resolve(val);
		},ms);
	})
}

Promise.resolve = function(arg){
	return Promise(function(resolve,reject){
		resolve(arg)
	})
}

Promise.reject = function(arg){
	return Promise(function(resolve,reject){
		reject(arg)
	})
}

Promise.all = function(promises){
	if (!isArray(promises)) {
    	throw new TypeError('You must pass an array to all.');
  	}
  	return Promise(function(resolve,reject){
  		var i = 0,
  			result = [],
  			len = promises.length;

  		function resolver(index) {
	      return function(value) {
	        resolveAll(index, value);
	      };
	    }

	    function rejecter(reason){
	    	reject(reason);
	    }

	    function resolveAll(index,value){
	    	result[index] = value;
	    	if(index == len - 1){
	    		resolve(result);
	    	}
	    }

  		for (; i < len; i++) {
  			promises[i].then(resolver(i),rejecter);
  		}
  	});
}

Promise.race = function(promises){
	if (!isArray(promises)) {
    	throw new TypeError('You must pass an array to race.');
  	}
  	return Promise(function(resolve,reject){
  		var i = 0,
  			len = promises.length;

  		function resolver(value) {
  			resolve(value);
	    }

	    function rejecter(reason){
	    	reject(reason);
	    }

  		for (; i < len; i++) {
  			promises[i].then(resolver,rejecter);
  		}
  	});
}

// window.Promise = Promise;
module.exports=Promise;

})(window);

});

/*var getData100 = function(){
  return Promise(function(resolve,reject){
    setTimeout(function(){
      resolve('100ms');
    },100);
  });
}

var getData200 = function(){
  return Promise(function(resolve,reject){
    setTimeout(function(){
      resolve('200ms');
    },200);
  });
}

getData100().then(function(data){
  console.log(data); // 100ms
  // return getData200();
}).then(function(data){
  console.log(data); // 200ms
  return data + data;
}).then(function(data){
  console.log(data) // 200ms200ms
});
console.log("====================");*/
/*getData100().then(getData200).then(function(val){console.log(val)})*/
/*
Promise.all([getData100(),getData200()]).then(function(value){
    console.log(value) // ['100ms','200ms']
});*/
/*
Promise.delay(1000).then(function(){
    // 一些操作
}).delay(1000).then(function(){
    // 一些操作
})

*/
/*

function Aaron(List, callback) {
	setTimeout(function() {
		var task = List.shift();
		task(); //执行函数
		if (List.length > 0) { //递归分解
			// console.log(arguments.callee)
			setTimeout(arguments.callee, 1000)
		} else {
			callback()
		}
	}, 25)
}

Aaron([
	function a() {
		console.log('a')
	},
	function b() {
		console.log('b')
	}
], function() {
	console.log('callback')
})
 */


