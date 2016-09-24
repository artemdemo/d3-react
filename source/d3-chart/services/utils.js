export function throttle(fn, threshhold = 250, scope) {
    let last;
    let deferTimer;
    return function(...args) {
        const context = scope || this;
        const now = +(new Date());

        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}


/**
 * Create list of classes based on alphabet
 * @param baseClass
 * @param length {Number}
 * @return {Array}
 */
export function createAlphabetList(baseClass, length = 0) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `${baseClass}_${letter}`);
    return length > 0 ? alphabet.slice(0, length) : alphabet;
}

/**
 * Remove prohibited characters from the string - make it useful for class name in html.
 * Also convert spaces to underscore.
 * @param name {String}
 * @return {String}
 * @example
 * linefyName('Name of the Class') -> name-of-the-class
 */
export function linefyName(name) {
    return name.toLowerCase().trim().replace(/[^a-z1-9\s]+/g, '').replace(/\s+/g, '-');
}

/**
 * Check whether given parameter is an function
 * @param functionToCheck
 * @return {Boolean}
 */
export function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
