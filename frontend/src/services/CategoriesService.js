import HttpClient from './utils/HttpClient';

class CategoriesService {
	constructor() {
		this.httpClient = new HttpClient(`http://localhost:8000`)
	}
	listCategories() {

		return this.httpClient.get(`/categories`)
	}
	createCategory(category) {
		return this.httpClient.post(`/categories`, category)
	}
}
export default new CategoriesService();
