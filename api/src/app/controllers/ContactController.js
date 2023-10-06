const isValidUUID = require('../../utils/isValidUUID');
const ContactsRepo = require('../repos/ContactsRepo');

class ContactController {

	async index(req, res) {
		const { orderBy } = req.query
		const contacts = await ContactsRepo.findAll(orderBy);
		return res.json(contacts);

	}
	async show(req, res) {

		const { id } = req.params;

		if (!isValidUUID(id)) {
			return res.status(400).json({error: "Invalid contact ID"})
		}
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
		if (category_id && !isValidUUID(category_id)) {
			return res.status(400).json({error: "Invalid category"})
		}

		if (email) {
			const contactExists = await ContactsRepo.findByEmail(email);
			if (contactExists) {
			return res.status(400).json({error: "Contact email already exists"})
			}
		}

		const contact = await ContactsRepo.create({
			name,
			phone,
			email: email || null,
			category_id: category_id || null,
		});
		res.status(201).json(contact)

	}

	async update(req, res) {
		const { id } = req.params;

		if (!isValidUUID(id)) {
			return res.status(400).json({ error: "Invalid contact ID" })
		}

		const { name, phone, email, category_id } = req.body;
		if (category_id && !isValidUUID(category_id)) {
			return res.status(400).json({ error: "Invalid category" })
		}

		if (!name) {
			return res.status(400).json({ error: "Name required" })
		}
		const contactExists = await ContactsRepo.findById(id)
		if (!contactExists) {
			return res.status(404).json({ error: "User not found" })
		}
		if (email) {
			const emailExists = await ContactsRepo.findByEmail(email)
			if (emailExists && emailExists.id !== id) {
				return res.status(404).json({ error: "E-mail already in use" })
			}
		}

		const updatedContact = await ContactsRepo.update(id, {
			name,
			email: email || null,
			phone,
			category_id: category_id || null,
		});
		res.json(updatedContact)
	}

	async delete(req, res) {
		const { id } = req.params;
		// const contact = await ContactsRepo.findById(id)

		if (!isValidUUID(id)) {
			return res.status(400).json({error: "Invalid contact ID"})
		}

		await ContactsRepo.delete(id);
		res.sendStatus(204)
	}

}

module.exports = new ContactController();
