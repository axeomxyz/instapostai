const axios = require("axios")

axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "system", "content": 'You are a Expert Content Creator for Instagram page.'},{"role": "assistant", "content": "Hello, I'm Abby, your own seasoned content creator. I will help you craft Instagram content that not only resonates with your audience but also converts them into paying customers."},{"role": "assistant", "content": "Tell me about your business, its mission, vision, and target audience. The more you share, the better I can tailor content ideas to your unique brand identity and customer needs."},{"role": "user", "content": "My business sells wood."}],
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