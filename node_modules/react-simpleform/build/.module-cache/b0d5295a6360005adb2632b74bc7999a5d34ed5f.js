/** @jsx React.DOM */
var React = require('react');
var jQuery = require('jquery-browserify');
var SimpleMail = React.createClass({displayName: 'SimpleMail',

  sendMail: function(){
	mail = this.refs.email.getDOMNode('#email').value;
	name = this.refs.name.getDOMNode('#name').value;
	message = this.refs.message.getDOMNode('#message').value;
	console.log('entra');
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

	return(React.DOM.form({action: "http://getsimpleform.com/messages?form_api_token=" + this.props.apikey, method: "post"}, 
                            React.DOM.input({placeholder: "name", type: "text", id: "name", ref: "name", className: "ry-input-text"}), 
                            React.DOM.input({placeholder: "email", type: "text", id: "email", ref: "email", className: "ry-input-text"}), 
                            React.DOM.textarea({placeholder: "message", id: "message", ref: "message", className: "ry-input-text"}), 
                            React.DOM.input({type: "button", value: "Send", className: "ry-btn floated-right", onClick: this.sendMail})
                        ));
  }

});

module.exports = SimpleMail;
