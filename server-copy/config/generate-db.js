import sql from "mssql";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

const masterConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: "master",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const dropAndCreateDatabase = async () => {
  await sql.query(`
    IF DB_ID('process.env.DB_NAME') IS NOT NULL
    BEGIN
      ALTER DATABASE appdb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
      DROP DATABASE appdb;
    END
  `);

  await sql.query(`CREATE DATABASE appdb;`);
  await sql.query(`USE process.env.DB_NAME`);
};

const createTables = async () => {
  await sql.query(`
    CREATE TABLE users (
      id UNIQUEIDENTIFIER PRIMARY KEY,
      name NVARCHAR(255) NOT NULL,
      email NVARCHAR(255) UNIQUE NOT NULL,
      password NVARCHAR(255) NOT NULL,
      role NVARCHAR(50) NOT NULL DEFAULT 'user'
    );
  `);

  await sql.query(`
    CREATE TABLE categories (
      id UNIQUEIDENTIFIER PRIMARY KEY,
      name NVARCHAR(255) NOT NULL UNIQUE
    );
  `);

  await sql.query(`
    CREATE TABLE subjects (
      id UNIQUEIDENTIFIER PRIMARY KEY,
      name NVARCHAR(255) NOT NULL,
      category_id UNIQUEIDENTIFIER NOT NULL,
      CONSTRAINT FK_subject_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  await sql.query(`
    CREATE TABLE questions (
      id UNIQUEIDENTIFIER PRIMARY KEY,
      subject_id UNIQUEIDENTIFIER NOT NULL,
      question NVARCHAR(MAX) NOT NULL,

      option_a NVARCHAR(500) NOT NULL,
      option_b NVARCHAR(500) NOT NULL,
      option_c NVARCHAR(500) NOT NULL,
      option_d NVARCHAR(500) NOT NULL,

      correct_answer NVARCHAR(500) NOT NULL,

      CONSTRAINT FK_question_subject
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    );
  `);
};

const createDefaultAdmin = async () => {
  const adminId = uuidv4();
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await sql.query`
    INSERT INTO users (id, name, email, password, role)
    VALUES (
      ${adminId},
      ${process.env.ADMIN_NAME},
      ${process.env.ADMIN_EMAIL},
      ${hashedPassword},
      'admin'
    )
  `;
};

const setup = async () => {
  try {
    await sql.connect(masterConfig);

    await dropAndCreateDatabase();
    await createTables();
    await createDefaultAdmin();

    console.log("Database setup completed successfully.");
  } catch (err) {
    console.error("Database setup failed:", err.message);
  } finally {
    sql.close();
  }
};

setup();
