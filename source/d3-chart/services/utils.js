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
