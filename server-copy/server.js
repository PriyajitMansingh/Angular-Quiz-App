import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
