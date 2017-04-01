// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require('core-js/es5');

// Replace ./source with the directory of your application code and
// make sure the file name regexp matches your test files.
const testsContext = require.context('./source', true, /\.ktest\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
