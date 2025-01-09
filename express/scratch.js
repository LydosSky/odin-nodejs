app.get('/', (req, res) => res.send('Hello, world!'));

// ? makes a character optional
// The following path matches both /message and /messages
('/messages?');

// () groups characters together, allowing symbols to act on the group
// The following path matches both / and /messages
('/(messages)?');

// * is a wildcard matching any number of any characters
// The following path can match /foo/barbar and even /foo-FOO/bar3sdjsdfbar
('/foo*/bar*bar');

/**
 * GET /odin/messages will have this log
 * { username: 'odin' }
 *
 * GET /theodinproject79687378/messages would instead log
 * { username: 'theodinproject79687378' }
 */
app.get('/:username/messages', (req, res) => {
  console.log(req.params);
  res.end();
});

/**
 * GET /odin/messages/79687378 will have this log
 * { username: "odin", messageId: "79687378" }
 */
app.get('/:username/messages/:messageId', (req, res) => {
  console.log(req.params);
  res.end();
});

/**
 * GET /odin/messages?sort=date&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: "date", direction: "ascending" }
 *
 * GET /odin/messages?sort=date&sort=likes&direction=ascending will log
 * Params: { username: "odin" }
 * Query: { sort: ["date", "likes"], direction: "ascending" }
 */
app.get('/:username/messages', (req, res) => {
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  res.end();
});
