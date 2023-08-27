const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Tatiana:SNngzhv8IATTlyco@cluster0.xtvsr0i.mongodb.net/db-contacts?retryWrites=true&w=majority";
PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
