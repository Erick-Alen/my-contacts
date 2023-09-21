const db = require('../../database')

class CategoriesRepo {
	async findAll() {
		const rows = db.query(`SELECT * FROM categories ORDER BY name`);
		return rows;
	}
	async create({ name }) {
		const [row] = await db.query(`
		INSERT INTO categories( name )
		VALUES ($1)
		RETURNING *
		`, [name]
		)
		return row;
	}

	async findById(id) {
		const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
		return row;
	}
	
	async update(id, { name, phone, email, category_id }) {
		const [row] = await db.query(`
			UPDATE contacts
			SET name = $1, email = $2, phone = $3, category_id = $4
			WHERE id = $5
			RETURNING *
		`, [name, phone, email, category_id, id]
		);
		return row;
	}
	async delete(id) {
		const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
		return deleteOp;
	}
}
module.exports = new CategoriesRepo();
