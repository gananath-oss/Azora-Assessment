const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const { notFound, errorHAndler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/items", itemRoutes);

app.use(notFound);
app.use(errorHAndler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server started on PORT ${PORT}`)
);
