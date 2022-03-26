export class Review {
	reviewEntityId: number | undefined;
	customerUsername: string | undefined;
	rating: number | undefined;
	description: string | undefined;

	constructor(reviewEntityId?: number, customerUsername?: string, rating?: number, description?: string, visible?: boolean, banned?: boolean) {
		this.reviewEntityId = reviewEntityId;
		this.customerUsername = customerUsername;
		this.rating = rating;
		this.description = description;
	}
}
