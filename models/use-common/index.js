var commons = {};
require('./string.extend.js')(commons);
require('./array.extend.js')(commons);
require('./object.extend.js')(commons);
require('./date.extend.js')(commons);
module.exports = commons;

