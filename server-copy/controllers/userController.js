import sql from "mssql";

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await sql.query`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
