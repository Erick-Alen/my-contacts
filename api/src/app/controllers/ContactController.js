const ContactsRepo = require('../repos/ContactsRepo');

class ContactController {

	async index(req, res) {
		const { orderBy } = req.query
		const contacts = await ContactsRepo.findAll(orderBy);
		return res.json(contacts);

	}
	async show(req, res) {

		const { id } = req.params;
		const contact = await ContactsRepo.findById(id)

		if (!contact) {
			return res.status(404).json({error: "Contact not found"})
		}

		res.json(contact);
	}
	async store(req, res) {

		const { name, phone, email, category_id } = req.body;
		if (!name) {
			return res.status(400).json({error: "Name required"})
		}

		const contactExists = await ContactsRepo.findByEmail(email);
		if (contactExists) {
			return res.status(400).json({error: "Contact email already exists"})
		}

		const contact = await ContactsRepo.create({ name, phone, email, category_id });
		res.status(201).json(contact)

	}

	async update(req, res) {
		const { id } = req.params;
		const { name, phone, email, category_id } = req.body;
		const contactExists = await ContactsRepo.findById(id)
		if (!contactExists) {
			return res.status(404).json({error: "User not found"})
		}
		const emailExists = await ContactsRepo.findByEmail(email)
		if (emailExists && emailExists.id !== id) {
			return res.status(404).json({error: "E-mail already in use"})
		}

		if (!name) {
			return res.status(400).json({error: "Name required"})
		}

		const updatedContact = await ContactsRepo.update(id, {
			name,
			email,
			phone,
			category_id,
		});
		res.json(updatedContact)
	}

	async delete(req, res) {
		const { id } = req.params;
		// const contact = await ContactsRepo.findById(id)

		// if (!contact) {
		// 	return res.status(404).json({error: "User not found"})
		// }

		await ContactsRepo.delete(id);
		res.sendStatus(204)
	}

}

module.exports = new ContactController();
