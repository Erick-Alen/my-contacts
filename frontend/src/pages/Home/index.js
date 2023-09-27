import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import * as S from '../../pages/Home/styled';
import ContactsService from '../../services/ContactsService';

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [orderBy, setOrderBy] = useState('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const filteredContacts = useMemo(() => contacts.filter((contact) => (
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	)), [contacts, searchTerm])

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      const contactsList = await ContactsService.listContacts(orderBy)
      setContacts(contactsList)
      setHasError(false)
    } catch (err) {
      setHasError(true)
      console.log(err.name)
      console.log(err.message)
      console.log(err.response)

    } finally {
      setIsLoading(false)
    }
  }

	useEffect(() => {
    loadContacts();
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

  const handleTryAgain = () => {
    console.log('handleTryAgain')
    loadContacts();
  }

	return (
		<>
			{/* <Modal danger /> */}
			<Loader isLoading={isLoading} />
			<S.InputSearchContainer>
				<input value={searchTerm} onChange={onSearchTerm} placeholder="Search contact's name" type="text" />
			</S.InputSearchContainer>

			<S.ContainerList>
				<S.HeaderList hasError={hasError}>
          {!hasError && (<strong>
            {filteredContacts.length === 0 ? 'Ops.. No contacts here!' : filteredContacts.length}
            {filteredContacts.length > 1 ? 'Contact(s)' : <></>}
          </strong>)}
					<a href="/new">New Contact</a>
        </S.HeaderList>

        {hasError && (
          <S.ErrorContainer>
            <img src={sad} alt='sad'/>
            <div className='details'>
              <strong>Ocorreu um erro ao obter seus contatos!</strong>
              <Button type='button' onClick={handleTryAgain}>Tentar novamente</Button>
            </div>
          </S.ErrorContainer>
        )}

        {!hasError&&
          <>{
            filteredContacts.length > 0 && <S.OrderByName orderBy={orderBy}>
                <button type="button" className="sort-button" onClick={handleSortContacts}>
                  <span>Nome</span>
                  <img src={arrow} alt="arrow" />
                </button>
              </S.OrderByName>
            }

            {
              filteredContacts.map((contact) => (
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
              ))
            }
          </>
        }

			</S.ContainerList>
		</>
	);
}
