/// <reference types="chai" />

export default function unique(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
	utils.addProperty(
		chai.Assertion.prototype,
		'unique',
		function (this: Chai.AssertionPrototype) {
			this.assert(
				this._obj.length === 1,
				'expected #{this} to be unique',
				'expected #{this} to not be unique',
				undefined
			);
		}
	);
}

// Not "declare namespace Chai" because `astro check` seems to treat it as
// overriding the existing type definition entirely
declare global {
	namespace Chai {
		export interface Assertion {
			get unique(): void;
		}
	}
}
