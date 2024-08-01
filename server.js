const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const inventoryRoutes = require("./routes/inventory");
const reservationRoutes = require("./routes/reservations");
const loanRoutes = require("./routes/loans");
const categoryRoutes = require("./routes/categories");
const authorRoutes = require("./routes/authors");
const reportRoutes = require("./routes/reports");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/reports", reportRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
