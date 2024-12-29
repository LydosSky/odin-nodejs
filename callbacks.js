// Named Functions
function funkyFunction(music, isWhiteBoy) {
  if (isWhiteBoy) {
    console.log("Play: " + music);
  }
}

// Ananonymous Functions
const funkyFunction_ = function (music, isWhiteBoy) {
  if (isWhiteBoy) {
    console.log("Play: " + music);
  }
};

// Ananonymous Arrow function
const funkyFucntion__ = (music, isWhiteBot) => {
  if (isWhiteBoy) {
    console.log("Play: " + music);
  }
};

// Calling a function
funkyFunction("that funcky music", true);
funkyFunction_("that funcky music", true);
funkyFunction__("that funcky music", true);

// own version of array.map()
function myMap(array, callback) {
  const myNewArray = [];
  for (let i = 0; i < array.length; i++) {
    const callbackResult = callback(array[i]);
    myNewArray.push(callbackResult);
  }

  return myNewArray;
}

const addedArray = myMap([1, 2, 3], (arrayNum) => {
  return arrayNum + 2;
});

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World");
  })
  .listen(8080);
