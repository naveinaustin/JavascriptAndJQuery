(function($) {

function ModelValidator() {
	this.STRING = 0;
	this.BOOLEAN = 1;
	this.INT = 2;
	this.FLOAT = 3;
	this.DATE = 4;
	
	this.rules = {};
	this.models = {};
}

$.extend(ModelValidator.prototype, {
	addRule: function(rule, func) {
		this.rules[rule] = func;
	},
	
	addModel: function( modelName, model) {
		this.models[modelName] = model;
	},
	
	isValidData: function(dataType, value) {
		var validData = true;
		switch(dataType) {
			case this.STRING:
				validData = (typeof value == "string");
				break;
			case this.BOOLEAN:
				var str = (new String(value)).toString();
				if(!(str === "true" || str === "false")) {
					validData = false;
				}
				break;
			case this.INT:
				var re = new RegExp("^\\s*-?(\\d+)\\s*$");
				if (!re.test(value)) {
					validData = false;
				}
				break;
			case this.FLOAT:
				var re = new RegExp("^\\s*-?(\\d+(\\.\\d+)?|\\.\\d+)\\s*$");
				if (!re.test(value)) {
					validData = false;
				}
				break;
			case this.DATE:
				validData = (value instanceof Date);
				break;
		}
		return validData;
	},
	
	validate: function( modelName, data) {
		var model = this.models[modelName];
		var errors = {};
		
		jQuery.each(data, function (attr, checkValue) {
			if(model[attr] === undefined) {
				var errorKey = modelName + "." + attr + ".doesNotExist";
				errors[errorKey] = checkValue
			} else {
				var constraints = model[attr].constraints;
				var dataType = model[attr].dataType;
				
				if($.modelvalidator.isValidData(dataType, checkValue)) {
				
					if(constraints) {
						jQuery.each(constraints, function (constraintKey, constraintValue) {
							if(constraintKey == "validator") {
								var msgKey = constraintValue(checkValue);
								if(msgKey !== undefined) {
									errors[msgKey] = checkValue
								}
							}
							else if($.modelvalidator.rules[constraintKey]) {
								if($.modelvalidator.rules[constraintKey](constraintValue, checkValue)) {
									var errorKey = modelName + "." + attr + "." + constraintKey;
									errors[errorKey] = checkValue
								}
							}
						});
					}
				}
				else {
					var errorKey = modelName + "." + attr + ".dataTypeMismatch";
					errors[errorKey] = checkValue
				}
			}
		});
		
		return errors;
	}
});

$.modelvalidator = new ModelValidator(); // singleton instance

})(jQuery);