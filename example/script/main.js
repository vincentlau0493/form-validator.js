$(document).ready(function(){

	//register form validation
	window.validator = new FormValidator('.register-form');
	validator.config([
		//first name
		{
			selector: '[name="name"]',
			name: 'Name',
			match: new RegExp('[a-zA-Z]','g'),
			required: true,
			error: function() {
				this.$element.closest('.form-group').addClass('has-error');
			},
			success: function() {
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
		},
		//password
		{
			selector: '[name="password"]',
			name: 'Password',
			required: true,
			match: new RegExp("^(?=.*[a-z])(?=.*[0-9]).*$", "g"),
			error: function() {
				this.$element.closest('.form-group').addClass('has-error');
			},
			success: function() {
				this.$element.closest('.form-group').removeClass('has-error');
			},
		},
		//password2
		{
			selector: '[name="password2"]',
			name: 'Password again',
			required: true,
			sameAs: '[name="password"]',
			error: function() {
				this.$element.closest('.form-group').addClass('has-error');
			},
			success: function() {
				this.$element.closest('.form-group').removeClass('has-error');
			},
		}

	]);

	//validate begins
	$('.register-form').submit(function(){
		if (validator.submit()) // all legal
			return true;

		//something illegal, output error messages
		$('.register-alert').empty();
		validator.errorMsgs.forEach(function(obj){

			// customize error message
			if (obj.name == 'Password again' && obj.attribute == 'sameAs') {
				obj.msg = obj.msg + ' as password';
			}

			var $err = $('<p class="text-danger">'+obj.msg+'</p>')
			$('.register-alert').append($err);
		})

		$('.register-alert').removeClass('hidden');
		return false;
	}) //form submit



})