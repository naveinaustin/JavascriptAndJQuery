function handleMsg(e) {
	postMessage("worker changed " + e.data + " too");
}

addEventListener('message', handleMsg, true);