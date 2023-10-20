import React from 'react';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import Modal from '../../Components/Modal';
import emptyBox from '../../assets/images/empty-box.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import sad from '../../assets/images/sad.svg';
import * as S from '../../pages/Home/styled';
import useHome from './useHome';


export default function Home() {
	const {
		contacts,
		orderBy,
		searchTerm,
		isLoading,
		isDeleteModalVisible,
		isLoadingDelete,
		hasError,
		contactToBeDeleted,
		filteredContacts,
		handleSortContacts,
		onSearchTerm,
		handleTryAgain,
		handleDeleteContact,
		handleCloseDeleteModal,
		handleConfirmDeleteContact
	} = useHome();

	return (
		<>
			<Loader isLoading={isLoading} />
			<Modal
				danger
				title={`Do you want to delete the contact ${contactToBeDeleted?.name} ?`}
				confirm='Delete'
				isLoading={isLoadingDelete}
				visible={isDeleteModalVisible}
				onCancel={handleCloseDeleteModal}
				onConfirm={handleConfirmDeleteContact}
			>
				<p>This action cannot be undone</p>
			</Modal>

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
											{contact.category.name && <small>{contact.category.name}</small>}
										</div>
										<span>{contact.email}</span>
										<span>{contact.phone}</span>
									</div>
									<div className="actions">
										<a href={`/edit/${contact.id}`}>
											<img src={edit} alt="edit" />
										</a>
										<button onClick={()=>handleDeleteContact(contact)} type="button">
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
