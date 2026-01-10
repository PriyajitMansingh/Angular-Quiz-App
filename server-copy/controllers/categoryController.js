import sql from "mssql";
import { v4 as uuidv4 } from "uuid";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  await sql.query`
    INSERT INTO categories (id, name)
    VALUES (${uuidv4()}, ${name})
  `;

  res.status(201).json({ message: "Category created" });
};

export const getCategories = async (req, res) => {
  const result = await sql.query`SELECT * FROM categories`;
  res.json(result.recordset);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await sql.query`
    UPDATE categories SET name = ${name} WHERE id = ${id}
  `;

  res.json({ message: "Category updated" });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await sql.query`DELETE FROM categories WHERE id = ${id}`;
  res.json({ message: "Category deleted" });
};
