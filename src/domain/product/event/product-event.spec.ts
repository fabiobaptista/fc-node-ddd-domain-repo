import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product-created.event";

describe("Product Event unit test", () => {

  it("should notify all event handlers when product is created", () => {
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
  
});