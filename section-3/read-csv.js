const fs = require("fs");
const csv = require("csvtojson");

function writeIntoFile(data) {
  fs.appendFile("./csvdirectory/converted.txt", data, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
}

const readStream = fs.createReadStream("./csvdirectory/nodejs-hw1-ex1.csv");

const csvStream = csv().fromStream(readStream);

csvStream.on("data", (chunk) => {
  writeIntoFile(chunk.toString("utf8"));
});

csvStream.on("end", () => {
  console.log("Completed");
});

csvStream.on("error", (e) => {
  console.log(e.message);
});
