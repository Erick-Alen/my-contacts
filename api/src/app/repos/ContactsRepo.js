const { v4 } = require('uuid')

const db = require('../../database')

let contacts = [
  {
    id: v4(),
    name: 'erick',
    email: 'erick@teste.com',
    phone: '99999999',
    category_id: v4()
  },
]




class ContactsRepo{
  //FIND
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}
    `)
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1
    `, [id])
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.email ${direction}
    `, [email])
    return row;
  }


  //CREATE
  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);
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


module.exports = new ContactsRepo();
