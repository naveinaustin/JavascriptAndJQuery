function handleMsg(e) {
	/*for(var i = 0; i <= parseInt(e.data); i++) {
		postMessage(i);
	}*/
	var time = 0
	postMessage(time);
	self.setInterval(function () {
		//if(time <= parseInt(e.data)) {
			time++;
			postMessage(time);			
		//}
	}, 1000);
}

addEventListener('message', handleMsg, true);