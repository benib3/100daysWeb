const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUlr = "mongodb://localhost:27017";
//THIS WOULDNT BE USE IN LOCAL ENV
if (process.env.MONGODB_URL) {
  mongodbUlr = process.env.MONGODB_URL;
}
let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUlr);
  database = client.db("deployment");
}

function getDb() {
  if (!database) {
    throw new Error("No database connected!");
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
