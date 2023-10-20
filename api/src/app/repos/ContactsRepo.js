// let contacts = [
// 	{
// 		id: v4(),
// 		name: "Erick",
// 		email: "erick@MediaList.com",
// 		phone: "123456789",
// 		category_id: v4(),
// 	},
// 	{
// 		id: v4(),
// 		name: "Cajá",
// 		email: "Vini@MediaList.com",
// 		phone: "",
// 		category_id: v4(),
// 	},
// 	{
// 		id: v4(),
// 		name: "Marquin",
// 		email: "Vitu@MediaList.com",
// 		phone: "",
// 		category_id: v4(),
// 	},
// 	{
// 		id: v4(),
// 		name: "Lil Lou",
// 		email: "Lou@MediaList.com",
// 		phone: "",
// 		category_id: v4(),
// 	},
// ]
const db = require('../../database');

class ContactsRepo {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const rows = db.query(`
			SELECT contacts.*, categories.name AS category_name
			FROM contacts
			LEFT JOIN categories ON categories.id = contacts.category_id
			ORDER BY contacts.name ${direction}
		`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
			SELECT contacts.*, categories.name AS category_name
			FROM contacts
			LEFT JOIN categories ON categories.id = contacts.category_id
			WHERE contacts.id = $1
		 `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
		INSERT INTO contacts( name, email, phone, category_id)
		VALUES ($1, $2, $3, $4)
		RETURNING *
		`, [name, email, phone, category_id]);
    return row;
  }

  async update(id, {
    name, phone, email, category_id,
  }) {
    const [row] = await db.query(`
			UPDATE contacts
			SET name = $1, email = $2, phone = $3, category_id = $4
			WHERE id = $5
			RETURNING *
		`, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new ContactsRepo();
