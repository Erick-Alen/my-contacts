const ContactsRepo = require("../repos/ContactsRepo");

class ContactController{
  async index(req, res) {

    //list all registers
    const { orderBy } = req.query
    const contacts = await ContactsRepo.findAll(orderBy);
    res.json(contacts);
  }

  async store(req, res) {
    //list all registers
    const { name, email, phone, category_id } = req.body

    if (!name) {
      return res.status(400).json({error: "Name required!"})
    }
    if (!email) {
      return res.status(400).json({error: "E-mail required!"})
    }

    const contactsExists = await ContactsRepo.findByEmail(email);
    if (contactsExists) {
      return res.status(400).json({error: "email already in use"})
    }

    const contact = await ContactsRepo.create({ name, email, phone, category_id })
    res.json(contact)
  }


  async show(req, res) {
    //list one register
    const { id } = req.params
    const contact = await ContactsRepo.findById(id)
    if (!contact) {
      return res.status(404).json({error: "User not found"})
    }
    res.json(contact)
  }

  async update(req, res) {
    //edit one register
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    const idExists = await ContactsRepo.findById(id);
    const emailExists = await ContactsRepo.findByEmail(email);

    if (!idExists) {
      return res.status(404).json({error: "User not found"})
    }
    if (!name) {
      return res.status(400).json({error: "Name required"})
    }

    if (emailExists && emailExists.id !== id) {
      return res.status(400).json({error: "Different e-mail address"})
    }
    const contact = await ContactsRepo.update(id, { name, email, phone, category_id })
    res.json(contact)
  }
  async delete(req, res) {
    //delete a register
    const { id } = req.params
    // opcional -> checa se há o contato antes de excluir do banco,
    // mas não dá pra ter certeza se o usuário existia
    // const contact = await ContactsRepo.findById(id)
    // if (!contact) {
    //   return res.status(404).json({error: "User not found"})
    // }
    await ContactsRepo.delete(id)
    //204 -> no-content
    res.sendStatus(204);
  }

}

//singleton
module.exports = new ContactController();
