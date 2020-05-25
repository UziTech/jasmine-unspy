[![Actions Status](https://github.com/UziTech/jasmine-unspy/workflows/CI/badge.svg)](https://github.com/UziTech/jasmine-unspy/actions)

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
