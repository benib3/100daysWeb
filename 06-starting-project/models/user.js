const bcrypt = require("bcryptjs");
const db = require("../data/database");
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  async saveUser() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const user = {
      email: this.email,
      password: hashedPassword,
    };
    await db.getDb().collection("users").insertOne(user);
  }

  async fetch() {
    const result = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return result;
  }
}
module.exports = User;
