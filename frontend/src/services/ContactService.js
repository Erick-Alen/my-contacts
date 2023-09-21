import HttpClient from './utils/HttpClient';

export default class ContactService {
	constructor() {
		this.httpClient = new HttpClient(`http://localhost:3000`)
	}
	async listContacts(orderBy = 'asc') {
		return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
	}
	async createContact(contact) {
		return this.httpClient.post(`/contacts`, contact)
	}
}
