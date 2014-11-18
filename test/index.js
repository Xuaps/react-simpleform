var should = require('chai').should(),
	simpleform = require('../build/index');

	describe('#simpleform', function() {
	  it('Sends an email', function() {
		simpleform.sendMail({mail: "testaddr", name: "nametest", message: "messagetest"});
		simpleform.state.sent.should.equal(true);
	  });
	});
