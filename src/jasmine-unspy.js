"use strict";

(function (global) {

	if (!global.jasmine) {
		throw new Error("jasmine must be loaded before jasmine-unspy");
	}

	var __realSpyOn = global.spyOn;
	var currentSpies = [];

	global.spyOn = function (object, methodName) {
		var originalMethod = object[methodName];
		var restore;
		if (Object.prototype.hasOwnProperty.call(object, methodName)) {
			restore = function () {
				object[methodName] = originalMethod;
			};
		} else {
			restore = function () {
				if (!delete object[methodName]) {
					object[methodName] = originalMethod;
				}
			};
		}

		var spy = __realSpyOn(object, methodName);

		currentSpies.push({
			object: object,
			methodName: methodName,
			restore: restore
		});

		return spy;
	};

	global.jasmine.unspy = function (object, methodName) {
		for (var i = currentSpies.length - 1; i >= 0; i--) {
			var spy = currentSpies[i];
			if (spy.object === object && spy.methodName === methodName) {
				spy.restore();
				currentSpies.splice(i, 1);
			}
		}
	};

})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
