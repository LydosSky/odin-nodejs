const https = require("https");

const options = {
  hostname: "example.com",
  port: 443,
  path: "/todos",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.log(error);
});

req.end();

const data = JSON.stringify({
  todo: "Buy the milk",
});

const options = {
  hostname: "whatever.com",
  port: 443,
  path: "/todos",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    porcess.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.log(error);
});

req.write(data);
req.end();
