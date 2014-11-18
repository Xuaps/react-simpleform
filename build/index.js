/** @jsx React.DOM */
var React = require('react');
var jQuery = require('jquery-browserify');
var SimpleMail = React.createClass({displayName: 'SimpleMail',

  getInitialState: function(){
	return ({sent: false,succeed: false});
  },

  sendMail: function(){
	var mail = this.refs.email.getDOMNode('#email').value;
	var name = this.refs.name.getDOMNode('#name').value;
	var message = this.refs.message.getDOMNode('#message').value;
    return jQuery.ajax({
	  dataType: 'jsonp',
	  url: "http://getsimpleform.com/messages/ajax?form_api_token=" + this.props.apikey,
	  data: {
		mail: mail,
		name: name,
		message: message,
	  }
	}).done(function() {
		this.resetForm();
		this.setState({sent: true, succeed: true});
	}.bind(this)).error(function(xhr, ajaxOptions, thrownErro){
		this.setState({sent: true, succeed: false});

	}.bind(this));
  },

  resetForm: function(){
	this.refs.email.getDOMNode('#email').value = '';
	this.refs.name.getDOMNode('#name').value = '';
	this.refs.message.getDOMNode('#message').value = '';
  },

  render: function() {
	var message = '';
	if(this.state.sent){
		if(this.state.succeed){
			message = this.props.messages.done;
		}else{
			message = this.props.messages.fail;
		}
	}
	return(
	React.DOM.div(null, 
	React.DOM.form({action: "http://getsimpleform.com/messages?form_api_token=" + this.props.apikey, method: "post"}, 
                            React.DOM.input({placeholder: "name", type: "text", id: "name", ref: "name", className: "ry-input-text"}), 
                            React.DOM.input({placeholder: "email", type: "text", id: "email", ref: "email", className: "ry-input-text"}), 
                            React.DOM.textarea({placeholder: "message", id: "message", ref: "message", className: "ry-input-text"}), 
                            React.DOM.input({type: "button", value: "Send", className: "ry-btn floated-right", onClick: this.sendMail})
                        ), 
React.DOM.div({id: "mailmessage"}, message)
)
);
  }

});

module.exports = SimpleMail;
