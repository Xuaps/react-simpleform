/** @jsx React.DOM */
var React = require('react');
var jQuery = require('jquery-browserify');
var FormMail = React.createClass({displayName: 'FormMail',

  sendMail: function(){
	mail = this.refs.email.getDOMNode('#email').value;
	name = this.refs.name.getDOMNode('#name').value;
	message = this.refs.message.getDOMNode('#message').value;
    return jQuery.ajax({
	  dataType: 'jsonp',
	  url: "http://getsimpleform.com/messages/ajax?form_api_token=" + this.props.apikey,
	  data: {
		mail: mail,
		name: name,
		message: message,
	  }
	}).done(function() {
	  //callback which can be used to show a thank you message
	  //and reset the form
	  alert("Thank you, for contacting us");
	});
  },

  render: function() {

	return(React.DOM.form({action: "http://getsimpleform.com/messages?form_api_token=", method: "post"}, 
                            React.DOM.input({placeholder: "name", type: "text", id: "name", className: "ry-input-text"}), 
                            React.DOM.input({placeholder: "email", type: "text", id: "email", className: "ry-input-text"}), 
                            React.DOM.textarea({placeholder: "message", id: "message", className: "ry-input-text"}), 
                            React.DOM.input({type: "submit", value: "Send", className: "ry-btn floated-right", onclick: "{this.sendMail}"})
                        ));
  }

});

module.exports = FormMail;
