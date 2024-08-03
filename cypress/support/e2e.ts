chai.Assertion.addMethod('unique', function () {
	this.assert(
		this._obj.length === 1,
		'expected #{this} to be unique',
		'expected #{this} to not be unique',
		true
	);
});
