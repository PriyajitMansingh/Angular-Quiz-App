import sql from "mssql";
import { v4 as uuidv4 } from "uuid";

export const createSubject = async (req, res) => {
  const { name, categoryId } = req.body;

  await sql.query`
    INSERT INTO subjects (id, name, category_id)
    VALUES (${uuidv4()}, ${name}, ${categoryId})
  `;

  res.status(201).json({ message: "Subject created" });
};

export const getSubjects = async (req, res) => {
  const result = await sql.query`SELECT * FROM subjects`;
  res.json(result.recordset);
};

export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await sql.query`
    UPDATE subjects SET name = ${name} WHERE id = ${id}
  `;

  res.json({ message: "Subject updated" });
};

export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  await sql.query`DELETE FROM subjects WHERE id = ${id}`;
  res.json({ message: "Subject deleted" });
};

export const getSubjectsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const result = await sql.query`
    SELECT * FROM subjects WHERE category_id = ${categoryId}
  `;

  res.json(result.recordset);
};
