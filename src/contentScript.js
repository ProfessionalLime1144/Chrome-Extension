import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
  timeout: 60000 // 60 seconds
});
const openai = new OpenAIApi(configuration);
async function ChatGptResponse(prompt) {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("Failed to get OpenAI API response:", err);
  }
}

chrome.runtime.sendMessage(
  // This message is sent to background.js when one of the URL's in manifest.json is invoked.
  { message: "urlMatch"},
  async function(response) {
    // This callback is invoked when the background.js responds with a URL.
    const prompt = await response.search;
    const apiResponse = await ChatGptResponse(prompt);
    console.log(apiResponse);
  } 
);
