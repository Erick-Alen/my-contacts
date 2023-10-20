class CategoryMapper {
	// toPersistence(domainCategory) {
	// 	return {
	// 		id: persistenceCategory.id,
	// 		name: domainCategory.name,
	// 		email: domainCategory.email,
	// 		phone: domainCategory.phone,
	// 		category_id: domainCategory.categoryId,
	// 	};
	// }
	toDomain(persistenceCategory) {
		return {
			id: persistenceCategory.id,
			name: persistenceCategory.name
		};
	}
}

export default new CategoryMapper();
