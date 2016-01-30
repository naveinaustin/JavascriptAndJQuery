# Model Validator

Grails Domains have a facility where you can specify the constraints and grails handles the validation of the fields based on these properties.

Example:
```java
class User {
    ...
    static constraints = {
        login size: 5..15, blank: false, unique: true
        password size: 5..15, blank: false
        email email: true, blank: false
        age min: 18
    }
}
```

A summary of the constraints provided by Grails can be got at this link:
https://grails.github.io/grails-doc/3.0.x/ref/Constraints/Usage.html

Usage
-----
Step 1: Create a Domain
```javascript
var model = {
	"price": {
		dataType: $.modelvalidator.FLOAT,
		constraints: {
			nullable: false, 
			min: 10, 
			max: 999.99, 
			validator: function(val) {
				var re = /^\s*-?(\d{1,3}(\.\d{1,2})?|\.\d{1,2})\s*$/;
				if (!re.test(val)) {
					return "check.decimal.part.of.value"
				}
			},
			scale: 2
		}
	},
	"code": {
		dataType: $.modelvalidator.STRING,
		constraints: {
			nullable: true, 
			maxSize: 6,
			minSize: 2
		}
	},

	type: {
		dataType: $.modelvalidator.STRING,
		constraints: {
			nullable: false,
			inList: ["soft", "board", "outdoor"]
		}
	},
}
```
Step 2: Add this domain to the validator
```javascript
$.modelvalidator.addModel("com.example.Item", model);
```

Step 3: Create an object with Data
```javascript
var model = {
	"price": 30.999,
	"code": 'ABC'
}
```

Step 4: Call validate
```javascript
var errors = $.modelvalidator.validate("com.example.Item", model1);
```

The errors will have the domain name with the error as
```javascript
check.decimal.part.of.value - 30.999
com.example.Item.price.scale - 30.999
com.example.Item.code.minSize - A
com.example.Item.type.inList - abc
```

## Grails Constraint Messages
When grails does the validation it takes the domain name with package and suffixes the field of the domain. So if the `Item` class is in package `com.example` all errors will begin with `com.example.Item`. After this depending on the constrain violation the respective suffix is added. For example `price` is supposed to have only 2 decimal places (`scale` violation) so it throws a `com.example.Item.scale` violation.

Currently, a limited feature set of the constraint has been implmented. The file `Grails Validation.xlsx` lists what has been done and what is pending.

## What Next
Anyone wanting to extend the validation framework can look into `modelValidatorRules.js` on how to add a new validation.
You will have to add a rule with the name of the rule as key and a function that takes two params. First is the constraint that you want to apply. Second, the actual value to test. You can then use these values to write a validation. Your function should return true always. If it fails validation return false.

An Example for Scale:
```javascript
$.modelvalidator.addRule("scale", function (constraintValue, checkValue) {
	var check = false;

	var re = new RegExp("^\\s*-?(\\d+(\\.\\d{1," + constraintValue + "})?|\\.\\d{1," + constraintValue + "})\\s*$");
	if (!re.test(checkValue)) {
		check = true;
	}

	return check;
});
```
