const http = require("http");
const UserController = require("./src/controller/userController");
const { getReqData } = require("./src/utility/read");

const userController = new UserController();

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/users" && req.method === "GET") {
    //Get All User
    const users = await userController.getAllUsers();
    res.end(JSON.stringify(users));
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
    //Get User By Id
    try {
      const id = req.url.split("/")[2];
      const user = await userController.getUserById(id);
      res.end(JSON.stringify(user));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url === "/users" && req.method === "POST") {
    //Create User
    try {
      const user = await getReqData(req);
      const newUser = await userController.createUser(user);
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PATCH") {
    //Update User
    try {
      const id = req.url.split("/")[2];
      const updateUser = await getReqData(req);
      const updatedUser = await userController.updateUser(id, updateUser);
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "DELETE") {
    //Delete User
    try {
      const id = req.url.split("/")[2];
      const deletedUser = await userController.deleteUser(id);
      res.statusCode = 204;
      res.end(JSON.stringify(deletedUser));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (
    req.url.match(/\/users\/hobbies\/([0-9]+)/) &&
    req.method === "POST"
  ) {
    //add hobbies
    try {
      const id = req.url.split("/")[3];
      const hobby = await getReqData(req);
      const addedHobbies = await userController.addHobby(id, hobby);
      res.statusCode = 201;
      res.end(JSON.stringify(addedHobbies));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (
    req.url.match(/\/users\/hobbies\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    //get hobbies
    try {
      const id = req.url.split("/")[3];
      const hobbies = await userController.getHobbies(id);
      res.end(JSON.stringify(hobbies));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error }));
    }
  } else if (
    req.url.match(/\/users\/hobbies\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    //Delete Hobby
    try {
      const id = req.url.split("/")[3];
      const hobby = await getReqData(req);
      const hobbies = await userController.deleteHobby(id, hobby);
      res.statusCode = 204;
      res.end(JSON.stringify(hobbies));
    } catch (error) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: error }));
    }
  }
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
