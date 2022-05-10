import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handle/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handle/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handle/envia-console-log.handler";

describe("Customer Events unit test", () => {

  it("should notify all event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const eventName = "CustomerCreatedEvent";

    eventDispatcher.register(eventName, eventHandler1);
    eventDispatcher.register(eventName, eventHandler2);

    expect(eventDispatcher.eventHandlers[eventName][0])
      .toMatchObject(eventHandler1);
    expect(eventDispatcher.eventHandlers[eventName][1])
      .toMatchObject(eventHandler2);

    eventDispatcher.notify(new CustomerCreatedEvent({ name: "Fabio" }));

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify all event handlers when address customer is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const eventName = "CustomerAddressChangedEvent";

    eventDispatcher.register(eventName, eventHandler);
    
    expect(eventDispatcher.eventHandlers[eventName][0])
      .toMatchObject(eventHandler);
    
    eventDispatcher.notify(new CustomerAddressChangedEvent({ 
      id: "1", 
      name: "Fabio",
      address: {
        street: "street",
        number: 1,
        zip: "zip",
        city: "city"
      }
    }));

    expect(spyEventHandler).toHaveBeenCalled();
  });
});