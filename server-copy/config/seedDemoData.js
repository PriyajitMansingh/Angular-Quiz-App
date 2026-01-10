// scripts/seedDemoData.js
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const appDbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const seed = async () => {
  try {
    await sql.connect(appDbConfig);

    // Clear tables (order matters due to FK)
    await sql.query(`DELETE FROM questions`);
    await sql.query(`DELETE FROM subjects`);
    await sql.query(`DELETE FROM categories`);

    // Categories
    await sql.query(`
      INSERT INTO categories (id, name) VALUES
      ('963d4dc2-3122-4265-87f7-0372875a6de9', 'Programming'),
      ('b2f1c6b8-6d63-4b6f-9f94-8e2b6d9c2f41', 'Mathematics')
    `);

    // Subjects (2 per category)
    await sql.query(`
      INSERT INTO subjects (id, name, category_id) VALUES
      ('4a2e1f7d-0b8f-4c8d-b1c3-9e8f1c2a7d11', 'JavaScript', '963d4dc2-3122-4265-87f7-0372875a6de9'),
      ('9d6b3f2a-1c7e-4e9d-b8f4-2a6c9d7e1b22', 'Node.js', '963d4dc2-3122-4265-87f7-0372875a6de9'),
      ('c3a9e7b1-2f6d-4e5a-8b9c-1d7f6a2e4c33', 'Algebra', 'b2f1c6b8-6d63-4b6f-9f94-8e2b6d9c2f41'),
      ('7f2d9c6a-4b1e-4a8f-9d3c-2e6b7a1c5d44', 'Geometry', 'b2f1c6b8-6d63-4b6f-9f94-8e2b6d9c2f41')
    `);

    // Questions (2 per subject)
    await sql.query(`
      INSERT INTO questions
      (id, subject_id, question, option_a, option_b, option_c, option_d, correct_answer)
      VALUES
      -- JavaScript
      (
        '1a2b3c4d-1111-4a6b-8c9d-aaaaaaaaaaaa',
        '4a2e1f7d-0b8f-4c8d-b1c3-9e8f1c2a7d11',
        'Which keyword declares a variable in JavaScript?',
        'var',
        'define',
        'int',
        'constlet',
        'var'
      ),
      (
        '1a2b3c4d-2222-4a6b-8c9d-bbbbbbbbbbbb',
        '4a2e1f7d-0b8f-4c8d-b1c3-9e8f1c2a7d11',
        'Which method parses JSON text?',
        'JSON.stringify()',
        'JSON.parse()',
        'JSON.decode()',
        'JSON.object()',
        'JSON.parse()'
      ),

      -- Node.js
      (
        '1a2b3c4d-3333-4a6b-8c9d-cccccccccccc',
        '9d6b3f2a-1c7e-4e9d-b8f4-2a6c9d7e1b22',
        'Which object is used to handle HTTP requests?',
        'fs',
        'http',
        'url',
        'path',
        'http'
      ),
      (
        '1a2b3c4d-4444-4a6b-8c9d-dddddddddddd',
        '9d6b3f2a-1c7e-4e9d-b8f4-2a6c9d7e1b22',
        'Which command initializes a Node project?',
        'node init',
        'npm start',
        'npm init',
        'node new',
        'npm init'
      ),

      -- Algebra
      (
        '1a2b3c4d-5555-4a6b-8c9d-eeeeeeeeeeee',
        'c3a9e7b1-2f6d-4e5a-8b9c-1d7f6a2e4c33',
        'Solve: 2x = 10',
        '2',
        '3',
        '5',
        '10',
        '5'
      ),
      (
        '1a2b3c4d-6666-4a6b-8c9d-ffffffffffff',
        'c3a9e7b1-2f6d-4e5a-8b9c-1d7f6a2e4c33',
        'Solve: x + 4 = 9',
        '3',
        '4',
        '5',
        '6',
        '5'
      ),

      -- Geometry
      (
        '1a2b3c4d-7777-4a6b-8c9d-111111111111',
        '7f2d9c6a-4b1e-4a8f-9d3c-2e6b7a1c5d44',
        'How many degrees are in a triangle?',
        '90',
        '180',
        '270',
        '360',
        '180'
      ),
      (
        '1a2b3c4d-8888-4a6b-8c9d-222222222222',
        '7f2d9c6a-4b1e-4a8f-9d3c-2e6b7a1c5d44',
        'A square has how many equal sides?',
        '2',
        '3',
        '4',
        '5',
        '4'
      )
    `);

    console.log("Demo data seeded successfully.");
  } catch (err) {
    console.error("Demo data seeding failed:", err.message);
  } finally {
    sql.close();
  }
};

seed();
