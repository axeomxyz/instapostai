const axios = require("axios")

axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "system", "content": 'You are a Expert Content Creator for Instagram page.'},
      {"role": "assistant", "content": "Hello, I'm Abby, your own seasoned content creator. I will help you craft Instagram content that not only resonates with your audience but also converts them into paying customers."},
      {"role": "assistant", "content": "Tell me about your business, its mission, vision, and target audience. The more you share, the better I can tailor content ideas to your unique brand identity and customer needs."},
      {"role": "system", "content": 'You will get the details from the user and give him 3 content ideas and do not make them long. After that ask the user to choose an idea and you will generate three posts captions using it. Each one should start with: InstaPostStart and ends with InstaPostEnd'},{"role": "user", "content": "My business sells wood."},
      {
        role: 'assistant',
        content: 'Great! Here are three content ideas for your wood-selling business:\n' +
          '\n' +'se captions that highlight the unique features of each piece.\n' +
          '\n' +
          '2. Share educational content about the benefits of using wood products. Create posts that feature interesting facts about the sustainability of wood, the durability of wood products, and the eco-friendliness of wood as a building material.\n' +
          '\n' +
          '3. Highlight the craftsmanship that goes into creating your wood products. Share behind-the-scenes images of your workshop and the skilled artisans who create your products. Use captions to tell the story of how each piece is made by hand and the care that goes into every detail.\n' +
          '\n' +
          'Which idea do you like the most?'
      },{"role": "user", "content": "third idea"}
    ],
      "temperature": 0.7
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer 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`,
      },
    }
  ).then(function (response) {
    // handle success
    console.log(response.data.choices);
    
  })