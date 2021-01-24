const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "workout-log-server",
  "postgres",
  "P3Jfamily",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to workout-log-server postgres database!");
  },
  function (err) {
    console.log(err);
  }
)
.catch(console.log);

module.exports = sequelize;
