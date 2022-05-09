import EventInterface from "../../@shared/event/event.interface";
import CustomerAddressChangedEventData from "./customer-address-changed.eventdata";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedEventData;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}