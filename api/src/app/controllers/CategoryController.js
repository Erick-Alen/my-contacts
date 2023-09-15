const CategoriesRepo = require('../repos/CategoriesRepo');

class CategoryController {

	async index(req, res) {

		const categories = await CategoriesRepo.findAll();
		return res.json(categories);
	}

	async show(req, res) {

		const { id } = req.params;
		const category = await CategoriesRepo.findById(id)

		if (!category) {
			return res.status(404).json({error: "Category not found"})
		}

		res.json(category);
	}
	async store(req, res) {

		const { name } = req.body;
		if (!name) {
			return res.status(400).json({error: "Category name required"})
		}

		const category = await CategoriesRepo.create({ name });
		res.json(category)

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

module.exports = new CategoryController();
