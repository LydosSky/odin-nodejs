const fs = require("fs");

fs.rename("before.json", "after.json", (err) => {
  if (err) {
    return console.log(err);
  }
});

try {
  fs.renameSync("before.json", "after.json");
} catch (err) {
  console.log(err);
}

const fileName = "/Users/joe/test.txt";
fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
  const content = "Some content!";
  fs.writeFile(fileName, content, (err2) => {
    if (err2) {
      console.log(err2);
      return;
    }

    console.log("Wrote some Content!");
    fs.readFile(fileName, "utf8", (err3, data3) => {
      if (err3) {
        console.log(err3);
        return;
      }
      console.log(data3);
    });
  });
});

async function example() {
  const filename = "test.txt";
  try {
    const data = await fd.readFile(fileName, "utf8");
    console.log(data);
    const content = "Some Content";
    await fs.writeFile(fileName, content);
    console.log("Wrote some content!");
    const newData = await fs.readFile(fileName, "utf8");
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}
