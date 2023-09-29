const { rejects } = require("assert");
const User = require("./../data/User");

class UserController {
  //Create
  async createUser(user) {
    return new Promise((resolve, _) => {
      const newUser = {
        id: User.length + 1,
        ...user,
      };
      User.push(newUser);
      resolve(newUser);
    });
  }

  //Get
  async getAllUsers() {
    return new Promise((resolve, _) => {
      const users = User.map(({ hobbies, ...u }) => {
        return u;
      });
      resolve(users);
    });
  }

  async getUserById(id) {
    return new Promise((resolve) => {
      const user = User.find((u) => u.id === +id);
      if (user) {
        const { hobbies, ...userData } = user;
        resolve(userData);
      } else {
        rejects("User Id is Invalid");
      }
    });
  }

  //Partial Update
  async updateUser(id, updateUser) {
    return new Promise((reolve, reject) => {
      const index = User.findIndex((u) => u.id === +id);
      if (index > -1) {
        const user = User[index];
        for (let key in updateUser) {
          user[key] = updateUser[key];
        }
        User[index] = user;
        const { hobbies, ...userData } = user;
        reolve(userData);
      } else {
        reject("User Id is Invalid");
      }
    });
  }
  //Delete
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const index = User.findIndex((u) => u.id === +id);
      if (index > -1) {
        const deletedUser = User[index];
        User.splice(index, 1);
        resolve(deletedUser);
      } else {
        reject("User Id is Invalid");
      }
    });
  }

  async addHobby(id, { hobby }) {
    return new Promise((resolve, reject) => {
      const user = User.find((u) => u.id === +id);
      if (user) {
        if (user.hobbies) {
          user.hobbies.push(hobby);
        } else {
          user.hobbies = [hobby];
        }
        resolve(user.hobbies);
      } else {
        reject("User Id is Invalid");
      }
    });
  }
  async getHobbies(id) {
    return new Promise((resolve, reject) => {
      const user = User.find((u) => u.id === +id);
      if (user) {
        const hobbies = user.hobbies ? user.hobbies : [];
        resolve(hobbies);
      } else {
        reject("User Id is Invalid");
      }
    });
  }

  async deleteHobby(id, { hobby }) {
    return new Promise((resolve, reject) => {
      const user = User.find((u) => u.id === +id);
      if (user) {
        const updatedHobby = user.hobbies.filter((h) => h !== hobby);
        user.hobbies = updatedHobby;
        resolve(user.hobbies);
      } else {
        reject("User Id is Invalid");
      }
    });
  }
}

module.exports = UserController;
