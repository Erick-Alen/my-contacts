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
		res.status(201).json(category)

	}

}

module.exports = new CategoryController();
