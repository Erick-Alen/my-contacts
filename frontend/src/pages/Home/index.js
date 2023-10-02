import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
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

  const loadContacts = useCallback( async () => {
    setIsLoading(true)
    try {
      const contactsList = await ContactsService.listContacts(orderBy)
      // const contactsList = []
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
  }, [orderBy])

	useEffect(() => {
    loadContacts();
	}, [loadContacts])

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
			{contacts.length > 0 && (
      <S.InputSearchContainer>
				<input value={searchTerm} onChange={onSearchTerm} placeholder="Search contact's name" type="text" />
			</S.InputSearchContainer>
      )}

			<S.ContainerList>
        <S.HeaderList justifyContent={
          hasError ? 'flex-end'
            : contacts.length > 0 ? 'space-between'
              : 'center'
        }>
          {(!hasError && contacts.length > 0) && (<strong>
            {filteredContacts.length === 0 ? 'Ops.. No contacts here!' : filteredContacts.length}
            {filteredContacts.length > 1 ? ' Contact(s)' : <></>}
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

        {!hasError && (
          <>
          {
            (contacts.length < 1 && !isLoading) && (
              <S.EmptyListContainer>
                <img src={emptyBox} alt='empty box' />
                <div>
                    <p>Você ainda não tem nenhum contato cadastrado! Clique no botão <strong>”Novo contato”</strong> acima para cadastrar o seu primeiro!</p>
                </div>
              </S.EmptyListContainer>
            )
          }
          {
            (contacts.length > 0 && filteredContacts.length < 1 && !isLoading) && (
              <S.SearchNotFoundContainer>
                <img src={magnifierQuestion} alt='magnifier question' />
                <div>
                    <p>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</p>
                </div>
              </S.SearchNotFoundContainer>
            )
          }
          {
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
        )}

			</S.ContainerList>
		</>
	);
}
