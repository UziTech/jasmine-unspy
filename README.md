[![Build Status](https://travis-ci.org/UziTech/jasmine-unspy.svg?branch=master)](https://travis-ci.org/UziTech/jasmine-unspy)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/30yaam69yeg2ka8i/branch/master?svg=true)](https://ci.appveyor.com/project/UziTech/jasmine-unspy)

# Jasmine Unspy

This will restore the original function to a spy.

## Install

```sh
npm install --save-dev jasmine-unspy
```

## Using

```js
// In your spec helper
require("jasmine-unspy")

// In your specs

describe("jasmine.unspy", function () {
  it("restores a spy", function () {
    let obj = {
      method: _ => true
    };
		spyOn(obj, "method");
    obj.method();
		expect(obj.method).toHaveBeenCalled();
		jasmine.unspy(obj, "method");
		expect(obj.method()).toBe(true);
  });
});
```
