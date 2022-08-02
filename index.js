import express from "express";
import db from "./utils/database.js";
import todosRoutes from "./routes/todos.js";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(cors())
// Connecting to database
try {
  await db.authenticate();
  console.log("Connected to database..");
} catch (err) {
  console.log("Err when connecting to database.. :  " + err);
}

app.use("/api/todos", todosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
