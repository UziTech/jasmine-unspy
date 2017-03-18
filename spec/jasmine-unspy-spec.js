"use strict";

require("../src/jasmine-unspy.js");

describe("unspy", function () {
	beforeEach(function () {
		var self = this;
		this.count = 0;
		this.obj = { method: function () { return ++self.count; } };
	});
	it("should remove the spy", function () {
		spyOn(this.obj, "method");
		expect(jasmine.isSpy(this.obj.method)).toBe(true);
		jasmine.unspy(this.obj, "method");
		expect(jasmine.isSpy(this.obj.method)).toBe(false);
	});

	it("should restore the original function", function () {
		this.obj.method();
		expect(this.count).toBe(1);
		spyOn(this.obj, "method");
		this.obj.method();
		expect(this.count).toBe(1);
		jasmine.unspy(this.obj, "method");
		this.obj.method();
		expect(this.count).toBe(2);
	});

	it("should restore the first original function", function () {
		spyOn(this.obj, "method");
		this.obj.method = function () {};
		spyOn(this.obj, "method");
		jasmine.unspy(this.obj, "method");
		this.obj.method();
		expect(this.count).toBe(1);
	});
});
