import apiKey from "../config/config.mjs";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: apiKey
})
const openai = new OpenAIApi(configuration);
async function ChatGptResponse(prompt) {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  })
  return res.data.choices[0].message.content;
}


chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed");
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "urlMatch") {
      // Return the search data
      let search = sender.tab.title;
      // Remove the last 16 characters of string (which returns " - Brave Search")
      search = search.slice(0, -15);
      sendResponse({
        apiResponse: apiKey
      });
    }
  }
);