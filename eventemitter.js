const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', function (start, end) {
  console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);
