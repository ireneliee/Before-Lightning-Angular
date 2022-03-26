import { AccessoryItem } from "./accessory-item";

export class Accessory {
	accessoryEntityId: number | undefined;
	accessoryName: string | undefined;
	description: string | undefined;
	isDisabled: boolean | undefined;

	accessoryItemEntities: AccessoryItem[] | undefined;

	constructor(accessoryEntityId?: number, accessoryName?: string, description?: string, isDisabled?: boolean) {
		this.accessoryEntityId = accessoryEntityId;
		this.accessoryName = accessoryName;
		this.description = description;
		this.isDisabled = isDisabled;
	}
}
