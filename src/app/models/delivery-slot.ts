import { DeliveryStatusEnum } from "./enum/delivery-status-enum";

export class DeliverySlot {
	deliverySlotId: number | undefined;
	deliveryStatus: DeliveryStatusEnum | undefined;
	requestedTimeOfDelivery: Date | undefined;
	timeOfArrival: Date | undefined;

	constructor(deliverySlotId?: number, deliveryStatus?: DeliveryStatusEnum, requestedTimeOfDelivery?: Date, timeOfArrival?: Date) {
		this.deliverySlotId = deliverySlotId;
		this.deliveryStatus = deliveryStatus;
		this.requestedTimeOfDelivery = requestedTimeOfDelivery;
		this.timeOfArrival = timeOfArrival;
	}
}
