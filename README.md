# default-for-call
Default value for a function call. Useful for reading user input or enviroment variables.

## Installation

Using npm

```sh
$ npm install default-for-call
```

## Usage

Sometimes you need to get values from objects that does not exists or have non valid values (null, undefined, NaN). This function solves that by returning a defined default value whenever a function call throws an error or it returns a non valid value.

### Examples

```js
const defaultForCall = require('default-for-call');

// Reading property from JSON

const user = {
    name: "John Doe",
    blocked: false
};

const name = defaultForCall('No name', (o) => o.name, user); // 'John Doe' (it existed)
const blocked = defaultForCall(false, (o) => o.blocked, user); // false (it existed)
const verifiedUser = defaultForCall(false, (o) => o.verified, user); // false (verified did not exists)
const streetName = defaultForCall('N/A', (o) => o.address.street, user); // 'N/A' (Error since address was undefined)

// Parsing from Environment variables

process.env = {
    FEATURE_ONE_ENABLED: 'TRUE',
    FEATURE_ONE_CODES: '[200,201,400]',
};

const featureOneEnabled = defaultForCall(false, (e) => e.toLowerCase() == 'true', process.env.FEATURE_ONE_ENABLED) // true
const featureOneCodes = defaultForCall([], JSON.parse, process.env.FEATURE_ONE_CODES) // [200,201,400]
const featureTwoEnabled = defaultForCall(false, (e) => e.toLowerCase() == 'true', process.env.FEATURE_TWO_ENABLED) // false 
const featureTwoCodes = defaultForCall([], JSON.parse, process.env.FEATURE_TWO_CODES) // []

// Executing a function that may fail

function mayFail() {
    return JSON.parse('hello');
}

const obj = defaultForCall({}, mayFail);

```

## API

```js
/**
 * 
 * @param {*} defaultValue Value to be returned on error or non valid value (null, undefined, NaN)
 * @param {*} fn Function to be called
 * @param  {...any} args Optional arguments to call function
 * @returns 
 */
function defaultForCall(defaultValue, fn, ...args) {
    ...
}
```