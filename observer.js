var Observer = (function () {

	var __message = {};
	
	return {
		/**
		 * 注册消息
		 * @type 	消息的名称
		 * @fn 		回调函数	
		 **/
		regist: function (type, fn) {
			
			if (__message[type]) {
				
				__message[type].push(fn);
			} else {
				
				__message[type] = [fn];
			}
		},
		/**
		 * 触发消息
		 * @type 	消息的名称
		 * @data 	传递的数据
		 **/
		fire: function (type, obj) {
			
			var params = {
				
				context: (obj && obj.context) || null,
				args: (obj && obj.args) || []
			}
			params.args.unshift(type)
			
			if (__message[type]) {
				
				for (var i = 0; i < __message[type].length; i++) {
					
					__message[type][i].apply(params.context, params.args)
				}
			}
		},
		
		/**
		 * 注销事件
		 * @type 	消息类型
		 * @fn 		消息回调函数
		 **/
		remove: function (type, fn) {
			
			if (__message[type]) {
				
				for (var i = __message[type].length - 1; i >= 0; i--) {
					
					if (__message[type][i] === fn) {
						
						__message[type].splice(i, 1);
					}
				}
			}
		}
	}
})()