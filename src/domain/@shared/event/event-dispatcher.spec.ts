import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
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

});