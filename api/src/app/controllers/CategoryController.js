const CategoriesRepo = require("../repos/CategoriesRepo")


class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query
    const categories = await CategoriesRepo.findAll(orderBy);
    res.json(categories);
  }
  async store(req, res) {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({error: "Name required!"})
    }
    const category = await CategoriesRepo.create({ name })
    res.json(category)
  }
}
module.exports = new CategoryController
