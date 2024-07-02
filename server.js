import http from "http";
import { stringify } from "querystring";
import url from "url";
import path from "path";
import fs from "fs/promises";
const PORT = process.env.PORT;

const all_comlains = [
  {
    id: 1,
    comment: "This is what it is",
    rating: 4,
  },
  {
    id: 1,
    comment: "This is what it is",
    rating: 4,
  },
];

//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
// ROute handler for GET /api/users
const getUserHandler = (req, res) => {
  res.write(JSON.stringify(all_comlains));
  res.end();
};
const creatUserHandler = (req, res) => {
  let body = "";
  //Listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newComplain = JSON.parse(body);
    all_comlains.push(newComplain);
    res.statusCode = 201;
    res.write(JSON.stringify(newComplain));
    res.end();
  });
};
// NOt found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Message not found" }));
  res.end();
};

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  jsonMiddleware(req, res, () => {
    if (req.url === "/api/allComplains" && req.method === "GET") {
      getUserHandler(req, res);
    } else if (req.url === "/api/addComplain" && req.method === "POST") {
      creatUserHandler(req, res);
    } else {
      notFoundHandler(req, res);
    }
  });
});

server.listen(8000, () => {
  console.log(`Server running on port ${PORT}`);
});
