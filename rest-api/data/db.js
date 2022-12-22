const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;
async function initDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("api-test");
}
function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
