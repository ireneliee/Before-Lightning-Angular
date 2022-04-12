export class CreateNewReview {
    customerUsername?: string;
    rating?: number;
    description?: string;
    itemId?: number;

    constructor(itemId?: number, rating?: number, description?: string, customerUsername?: string) {
        this.itemId = itemId;
        this.rating = rating;
        this.description = description;
        this.customerUsername = customerUsername;
    }

}