function nonBooleanFalse(value) {
    if (value == undefined) return true;
    if (Number.isNaN(value)) return true;
    return false;
}

/**
 * 
 * @param {*} defaultValue Value to be returned on error or non valid value (null, undefined, NaN)
 * @param {*} fn Function to be called
 * @param  {...any} args Optional arguments to call function
 * @returns 
 */
function defaultForCall(defaultValue, fn, ...args) {
    let result = defaultValue;
    try {
        const value = fn.call(undefined, ...args);
        if (value || !nonBooleanFalse(value)) {
            result = value;
        }
    } catch (_) {}
    return result;
}

module.exports = defaultForCall;