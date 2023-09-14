const  { v4 } = require('uuid');

let contacts = [
	{
		id: v4(),
		name: "Erick",
		email: "erick@MediaList.com",
		phone: "123456789",
		category_id: v4(),
	},
	{
		id: v4(),
		name: "Cajá",
		email: "Vini@MediaList.com",
		phone: "",
		category_id: v4(),
	},
	{
		id: v4(),
		name: "Marquin",
		email: "Vitu@MediaList.com",
		phone: "",
		category_id: v4(),
	},
	{
		id: v4(),
		name: "Lil Lou",
		email: "Lou@MediaList.com",
		phone: "",
		category_id: v4(),
	},
]


class ContactsRepo {
	findAll() {
		return new Promise((resolve, reject) => {
			resolve(contacts)
		});
	}
	findById(id) {
		return new Promise((resolve, reject) => {
			resolve(contacts.find((contact)=> contact.id === id))
		});
	}
	findByEmail(email) {
		return new Promise((resolve, reject) => {
			resolve(contacts.find((contact)=> contact.email === email))
		});
	}
	create({ name, phone, email, category_id }) {
		return new Promise((resolve) => {
			const newContact = 	{
				id: v4(),
				name,
				email,
				phone,
				category_id,
			}
			contacts.push(newContact);
			resolve()
		})
	}
	update(id, { name, phone, email, category_id }) {
		return new Promise((resolve) => {
			const updatedContact = {
				id,
				name,
				email,
				phone,
				category_id,
			};
			contacts = contacts.map((contact) => (
				contact.id === id ? updatedContact : contact
			));
				resolve(updatedContact)
		})
	}
	delete(id) {
		return new Promise((resolve, reject) => {
			contacts = contacts.filter((contact) => contact.id !== id);
			resolve();
		});
	}
}
module.exports = new ContactsRepo();
