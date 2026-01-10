import sql from "mssql";
import { v4 as uuidv4 } from "uuid";

// Create question
export const createQuestion = async (req, res) => {
  const {
    subject_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
  } = req.body;

  try {
    const id = uuidv4();
    await sql.query`
      INSERT INTO questions (id, subject_id, question, option_a, option_b, option_c, option_d, correct_answer)
      VALUES (${id}, ${subject_id}, ${question}, ${option_a}, ${option_b}, ${option_c}, ${option_d}, ${correct_answer})
    `;
    res.status(201).json({ message: "Question created", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM questions`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single question by id
export const getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM questions WHERE id = ${id}`;
    if (result.recordset.length === 0)
      return res.status(404).json({ message: "Question not found" });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, option_a, option_b, option_c, option_d, correct_answer } =
    req.body;

  try {
    await sql.query`
      UPDATE questions
      SET question = ${question},
          option_a = ${option_a},
          option_b = ${option_b},
          option_c = ${option_c},
          option_d = ${option_d},
          correct_answer = ${correct_answer}
      WHERE id = ${id}
    `;
    res.json({ message: "Question updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM questions WHERE id = ${id}`;
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions for a specific subject
export const getQuestionsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const result = await sql.query`
      SELECT * FROM questions WHERE subject_id = ${subjectId}
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
