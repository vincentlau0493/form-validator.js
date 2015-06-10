# Form Validator
jQuery plugin providing a flexible form validated function.

## Example
Examples can be found [here](http://vincentlau0493.github.io/form-validator.js/example/).

## Features
* Flexible
* Deal with success or error msg
* Reusable

## Get Started

HTML Form:

```html
<!-- use bootstrap.css -->
<form class="form">
	<div class="form-group">
    <label for="your-name">Name</label>
    <input type="text" name="name" class="form-control" id="your-name" placeholder="Enter your name">
  </div>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="text" name="email" class="form-control" id="email" placeholder="Enter email">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>	
```

Configure form validator:

```javascript

var validator = new FormValidator('.form');  // form DOM element
validator.config([
	// name
	{
		selector: '[name="name"]',  // jQuery selector inside the form
		name: 'Name', // give a name to this entity (whatever you want)
		match: new RegExp('[a-zA-Z]','g'),  // the exgex it should match
		required: true,  // whether it is a required field
		error: function() {  // when invalid
			this.$element.closest('.form-group').addClass('has-error');
		},
		success: function() {  // when valid
			this.$element.closest('.form-group').removeClass('has-error');
		},
	},
	//email
	{
		selector: '[name="email"]',
		name: 'Email',
		required: true,
		match: new RegExp("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$","g"),
		error: function() {
			this.$element.closest('.form-group').addClass('has-error');
		},
		success: function() {
			this.$element.closest('.form-group').removeClass('has-error');
		},
	}
]);

```

Trigger Validator:

```javascript
$('.register-form').submit(function(){
	
	// the check whether all elements are valid
	if (validator.submit())  // return boolean, valid element trigger success function, otherwise, error function
		return true;
	
	return false;
})
```


## Usage

#### Init Validator

Constructor accepts one parameter which is CSS selector of form element

```javascript
var validator = new FormValidator('.form')
```

#### Configure Validator

config method accepts an array as parameter which is the element entity or input need to validate

```javascript
validator.config([
	//...
])
```

#### Entity Attribute

###### selector (required)
The selector of input element in the form, so if your form selector is **.form**, and your selector attribute equals **.input**, the final selector would be **.form .input**.

###### name (optional)
Define the alias of elements which would be used when retrieve desired element or print error message. For example:

```javascript
//...
name: 'Your Password',
required: true,
//...
```

If you didn't fill out this field, the error message would be "Your Password is required"













