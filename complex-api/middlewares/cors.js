function enableCors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //This * is for everybody can acces api
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}

module.exports = enableCors;
