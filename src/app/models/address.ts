export class Address {
	addressEntityId: number | undefined;
	block: string | undefined;
	unit: string | undefined;
	postalCode: string | undefined;
	country: string | undefined;

	constructor(addressId?: number, block?: string, unit?: string, postalCode?: string, country?: string) {
		this.addressEntityId = addressId;
		this.block = block;
		this.unit = unit;
		this.postalCode = postalCode;
		this.country = country;
	}
}
