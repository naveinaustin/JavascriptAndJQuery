$.modelvalidator.addRule("min", function (constraintValue, checkValue) {
	var check = false;
	if(checkValue !== '') {
		check = checkValue < constraintValue;
	}
	return check;
});

$.modelvalidator.addRule("max", function (constraintValue, checkValue) {
	var check = false;
	if(checkValue !== '') {
		check = checkValue > constraintValue;
	}
	return check;
});

$.modelvalidator.addRule("nullable", function (constraintValue, checkValue) {
	var check = false;
	if(!constraintValue) {
		if(checkValue === '') {
			check = true;
		}
		else {
			check = false;
		}
	}
	return check;
});

$.modelvalidator.addRule("maxSize", function (constraintValue, checkValue) {
	var check = false;
	if(checkValue.length > constraintValue) {
		check = true;	
	}
	return check;
});

$.modelvalidator.addRule("minSize", function (constraintValue, checkValue) {
	var check = false;
	if(checkValue.length < constraintValue) {
		check = true;	
	}
	return check;
});

$.modelvalidator.addRule("scale", function (constraintValue, checkValue) {
	var check = false;

	var re = new RegExp("^\\s*-?(\\d+(\\.\\d{1," + constraintValue + "})?|\\.\\d{1," + constraintValue + "})\\s*$");
	if (!re.test(checkValue)) {
		check = true;
	}

	return check;
});

$.modelvalidator.addRule("inList", function (constraintValue, checkValue) {
	var check = false;

	if($.inArray(checkValue, constraintValue)) {
		check = true;
	}

	return check;
});