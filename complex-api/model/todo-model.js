const db = require("../data/database");
const mongodb = require("mongodb");
class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
  static async getAllTodos() {
    const todoDocs = await db.getDb().collection("todos").find().toArray();

    return todoDocs.map(function (todoDocs) {
      return new Todo(todoDocs.text, todoDocs._id);
    });
  }
  save() {
    if (this.id) {
      const todoId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("todos")
        .updateOne(
          { _id: todoId },
          {
            $set: { text: this.text },
          }
        );
    } else {
      return db.getDb().collection("todos").insertOne({ text: this.text });
    }
  }
  delete() {
    const todoId = new mongodb.ObjectId(this.id);
    if (!this.id) {
      throw new Error("Failed to delete cuz id missing fam");
    }
    return db.getDb().collection("todos").deleteOne({ _id: todoId });
  }
}

module.exports = Todo;
