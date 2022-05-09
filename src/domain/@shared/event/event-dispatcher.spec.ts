import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLog1Handler from "../../customer/event/handle/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handle/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../../customer/event/handle/envia-console-log.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events unit tests", () => {

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0])
      .toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0])
      .toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
  });
  
  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0])
      .toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const eventName = "ProductCreatedEvent";

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.eventHandlers[eventName][0])
      .toMatchObject(eventHandler);

    eventDispatcher.notify(new ProductCreatedEvent({
      name: "Product",
      description: "Product Description",
      price: 10,
    }));

    expect(spyEventHandler).toHaveBeenCalled();
  });

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