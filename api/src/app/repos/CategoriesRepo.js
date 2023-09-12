const db = require('../../database')

class CategoriesRepo{
  //FIND
  async findAll(orderBy = 'ASC') {
    console.log("findAll do CategoriesRepo")
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`)
    return rows;
  }
  //CREATE
  async create({ name }) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *
    `, [name]);
    //indexador ordenando as posições referentes aos valores instanciados em Values
    return row;
  }

  //UPDATE
  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }


  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM contacts
    WHERE id = $1
    `, [id])
    return deleteOp;
  }
}


module.exports = new CategoriesRepo();
