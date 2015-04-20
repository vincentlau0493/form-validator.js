/**
 * @author: Jiayu
 * @plugin: FromValidator
 **/

var FormValidator = (function($, window){

	'use strict';

	function FormValidator(formSelector) {
		this.$form = $(formSelector);
		this.errorMsgs = [];
		this.fieldArray = [];
	}

	/**
		Attributes:
			selector (required)
			name (optional)
			required (optional, default is false)
			match (optional, regex)
			sameAs (optional, a field to be the same)
			error (optional, error callback function)
			success (optional, success callback function)
	 **/

	FormValidator.prototype.config = function(fieldArray) {
		if( Object.prototype.toString.call( fieldArray ) !== '[object Array]' ) {
			throw new Error('Parameters must be array');
			return; 
		}
		this.fieldArray = fieldArray;	
	}


	FormValidator.prototype.submit = function() {

		this.errorMsgs.length = 0;

		for(var i=0; i<this.fieldArray.length; i++) {

			var field = this.fieldArray[i];
			if( Object.prototype.toString.call( field ) !== '[object Object]' ) {
				throw new Error('Each field must be object');
				return; 				
			}

			field.error = field.error || function(){};
			field.success = field.success || function(){};

			if ( !field.selector ) {
				throw new Error('Attribute selector is required');
				return;
			}
			field.$element = this.$form.find($(field.selector));

			if (field.$element.length > 0) {
				if (!this.isRequiredValid(field)) {
					//invalid
					this.errorMsgs.push({name: field.name, msg: this.generateMessage('required', field.name), attribute: 'required'});
					continue;
				};

				if (!this.isMatchValid(field)) {
					//invalid
					this.errorMsgs.push({name: field.name, msg: this.generateMessage('match', field.name), attribute: 'match'});
					continue;
				};			

				if (!this.isTheSame(field)) {
					//invalid
					this.errorMsgs.push({name: field.name, msg: this.generateMessage('sameAs', field.name), attribute: 'sameAs'});
					continue;
				};	

				// console.log(field);
				field.success.call(field);

			}




		}

		if(this.errorMsgs.length > 0) 
			return false;

		return true;

	}


	FormValidator.prototype.isRequiredValid = function(field) {

		var isRequired = field.required || false;
		if (!isRequired)
			return true;

		if (field.$element.val()) {
			return true;
		} else {
			//execute error function
			field.error.call(field);
			return false;
		}

	}

	FormValidator.prototype.isMatchValid = function(field) {

		var regex = field.match || false;
		if (!regex)
			return true;

		if (field.$element.val().match(regex)) {
			return true;
		} else {
			field.error.call(field);
			return false;
		}

	}

	FormValidator.prototype.isTheSame = function(field) {
		var $anotherEle = this.$form.find($(field.sameAs));
		if ($anotherEle.length == 0)
			return true;

		if (field.$element.val() == $anotherEle.val()) {
			return true;
		} else {
			field.error.call(field);
			return false;
		}		
	}


	FormValidator.prototype.generateMessage = function(attr, name) {

		name = name || 'This field';
		var msg = '';
		switch(attr) {

			case 'required':
				msg = name + ' is required';
				break;
			case 'match':
				msg = name + ' doesn\'t match the pattern';
				break;
			case 'sameAs':
				msg = name + ' should be the same';
				break;

			default:
				break;

		}

		return msg;


	}



	FormValidator.prototype.customizeErrorMessage = function(obj) {

	}

	return FormValidator;





})(jQuery, window);






