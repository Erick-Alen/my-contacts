import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../../Components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import * as S from '../../pages/Home/styled';
import delay from '../../utils/delay';
import ContactService from '../../services/ContactService';

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const filteredContacts = useMemo(() => contacts.filter((contact) => (
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)), [contacts, searchTerm])


	useEffect(() => {
		setIsLoading(true)
		const loadContacts = async () => {
			try {
				const contactsList = await ContactService.listContacts(orderBy)
				setContacts(contactsList)
			} catch(err) {
				console.log(err)
			} finally {
				setIsLoading(false)
			}
		}
		loadContacts()
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

	const onSearchTerm = (e) => {
		setSearchTerm(e.target.value)
	}
	return (
		<>
			{/* <Modal danger /> */}
			<Loader isLoading={isLoading} />
			<S.InputSearchContainer>
				<input value={searchTerm} onChange={onSearchTerm} placeholder="Search contact's name" type="text" />
			</S.InputSearchContainer>

			<S.ContainerList>
				<S.HeaderList>
					<strong>{filteredContacts.length === 0 ? 'Ops.. No contacts here!' : filteredContacts.length} {filteredContacts.length > 1 ? 'Contact(s)' : <></>}</strong>
					<a href="/new">New Contact</a>
				</S.HeaderList>

				{filteredContacts.length > 0 && <S.OrderByName orderBy={orderBy}>
					<button type="button" className="sort-button" onClick={handleSortContacts}>
						<span>Nome</span>
						<img src={arrow} alt="arrow" />
					</button>
				</S.OrderByName>}

				{filteredContacts.map((contact) => (
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
