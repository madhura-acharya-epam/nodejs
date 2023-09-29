const WithTime = require("./WithTime");
const http = require("http");

let startTime;

function fetchPost(payload) {
  let promise = new Promise((resolve, reject) => {
    let responseData = "";

    const request = http.request(payload, (response) => {
      response.on("data", (data) => {
        responseData += data;
      });

      response.on("end", () => {
        resolve(responseData);
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    request.end();
  });

  return promise;
}

function begin() {
  startTime = Date.now();
}

function end() {
  const endTime = Date.now();
  console.log("Total Time Taken to execute is : ", endTime - startTime);
}

const withTime = new WithTime();
withTime.on("begin", begin);
withTime.on("end", end);
withTime.execute(fetchPost, {
  hostname: "jsonplaceholder.typicode.com",
  path: "/posts/1",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
