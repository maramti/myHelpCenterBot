//when the chatbot gets a text to process , it's not always going to classify the text to the three intent i have put out. once the first text is sent 
//to present the customer's issue the conversation evolves, we put behind the 'track order'/'shipping policy'.. intents and shift to new contexts 
//of sentences. for now i'm going to keep my chatbot conversational performance limited until i can find more time to work on broadening it.
//so the chatbot is going to stick to providing a predefined answer without evolving in the conversation [temporary].


function getEntity(entities, type) {
  const found = entities.find(e => e.type === type);
  return found ? found.value : null;
}

function generateResponse(intent, entities) {
  const orderNumber = getEntity(entities, "order_number");
  const date = getEntity(entities, "date");
  const price = getEntity(entities, "price");
  const size = getEntity(entities, "size");
  const location = getEntity(entities, "location");
  const country = getEntity(entities, "country");

  switch (intent) {

    case "track_order":
      return orderNumber
        ? `Your order ${orderNumber} is currently being processed.`
        : `Please provide your order number so I can track it.`;

    case "return_order":
      return orderNumber
        ? `You can return order ${orderNumber}. The return process is simple and quick.`
        : `Please provide your order number to start a return.`;

    case "change_size":
      return size
        ? `I understand you want to change the item size to ${size.toUpperCase()}.`
        : `Please tell me which size you would like instead.`;

    case "shipping_policy":
      let response = "Our shipping usually takes 3 to 5 business days";

      if (country) response += ` to ${country.charAt(0).toUpperCase() + country.slice(1)}`;
      if (location) response += ` and will be delivered to your ${location}`;
      if (date) response += ` starting from ${date}`;

      return response + ".";

    default:
      return "Sorry, I didn't fully understand your request. Could you please rephrase?";
  }
}

module.exports = generateResponse;
