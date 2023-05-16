import axios from "axios"
import {useQuery} from "@tanstack/react-query"

export const single = async (conversation) => {
  console.log(conversation)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        "model": "gpt-3.5-turbo",
        "messages": conversation,
        "temperature": 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`,
        },
      }
    );
  
    return [...conversation, response.data.choices[0].message];
    //return prompt
};

export const campaign = async (conversation) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        "model": "gpt-3.5-turbo",
        "messages": conversation,
        "temperature": 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`,
        },
      }
    );
  
    return [...conversation, response.data.choices[0].message];
};