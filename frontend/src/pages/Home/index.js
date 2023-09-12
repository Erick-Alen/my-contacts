import React, { useEffect, useState } from 'react';
import * as S from '../../pages/Home/styled';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../Components/Modal';
import Loader from '../../Components/Loader';

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	useEffect(() => {
		fetch(`http://localhost:8000/contacts?orderBy=${orderBy}`)
		.then(async (res) => {
			const data = await res.json()
			setContacts(data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}, [orderBy])

	const handleSortContacts = () => {
		setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))
	//	making another fetch here
	// 	const newOrder = orderBy === 'asc' ? 'desc' : 'asc';
	// 	setOrderBy(newOrder);
	// 	fetch(`http://localhost:8000/contacts?orderBy=${newOrder}`)
	// 	.then(async (res) => {
	// 		const data = await res.json()
	// 		setContacts(data)
	// 	})
	// 	.catch((err)=>{
	// 		console.log(err)
	// 	})
	}

	return (
		<>
			{/* <Modal danger /> */}
			{/* <Loader/> */}
			<S.InputSearchContainer>
				<input placeholder="Search contact's name" type="text" />
			</S.InputSearchContainer>

			<S.ContainerList>
				<S.HeaderList>
					<strong>{contacts.length === 0 ? 'Ops.. No contacts here!' : contacts.length} {contacts.length > 1 ? 'Contacts' : 'Contact'}</strong>
					<a href="/new">New Contact</a>
				</S.HeaderList>

				<S.OrderByName orderBy={orderBy}>
					<button type="button" className="sort-button" onClick={handleSortContacts}>
						<span>Nome</span>
						<img src={arrow} alt="arrow" />
					</button>
				</S.OrderByName>

				{contacts.map((contact) => (
					<S.Card key={contact.id}>
						<div className="info">
							<div className="contact-name">
								<strong>{contact.name}</strong>
								{contact.category_name && <small>{contact.category_name}</small>}
							</div>
							<span>{contact.email}</span>
							<span>{contact.phone}</span>
						</div>
						<div className="actions">
							<a href={`/edit/${contact.id}`}>
								<img src={edit} alt="edit" />
							</a>
							<button type="button">
								<img src={trash} alt="trash" />
							</button>
						</div>
					</S.Card>
				))}

			</S.ContainerList>
		</>
	);
}
