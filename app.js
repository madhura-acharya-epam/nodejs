const http = require("http");
const url = require("url");

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const { query } = url.parse(req.url, true);
  const date = query.year + " " + query.month;

  res.end(date);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
