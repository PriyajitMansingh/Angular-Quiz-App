import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // use container name if Express is in Docker
  // port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("SQL Server connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export { sql, connectDB };
