const fs = require('fs');
const { pipeline } = require('stream');

const readStream = fs.createReadStream('./warandpeace.txt', {
  encoding: 'utf8',
});

const writeStream = fs.createWriteStream('./piece.txt');

readStream.on('data', function (chunk) {
  console.log('---- New Chunk ----');
  console.log(chunk.toString());
  writeStream.write('\nNEW CHUNK\n');
  writeStream.write(chunk);
});

readStream.pipe(writeStream);
