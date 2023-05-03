const { getDb } = require("../config/mongoConnection");

class User {
  static userCollection() {
    return getDb().collection("users");
  }

  static async create(data) {
    try {
      const userCollection = this.userCollection();
      return await userCollection.insertOne(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(option) {
    try {
      const userCollection = this.userCollection();

      return await userCollection.findOne(option);
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll(option) {
    try {
      const userCollection = this.userCollection();
      return await userCollection.find(option).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  static async destroy(option) {
    try {
      const userCollection = this.userCollection();
      return await userCollection.deleteOne(option);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
