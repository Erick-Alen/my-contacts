import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
	constructor() {
		this.httpClient = new HttpClient(`http://localhost:8000`)
	}
	async listCategories() {
		const categories = await this.httpClient.get(`/categories`)
		return categories.map(CategoryMapper.toDomain)
	}
	createCategory(category) {
		return this.httpClient.post(`/categories`, category)
	}
}
export default new CategoriesService();
