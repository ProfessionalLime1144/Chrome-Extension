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
// Function to manipulate HTML page to place API response
function manipulatePage(apiResponse) {
  document.getElementById("searchCTA").style.color =  "#FFFFFF";
  document.getElementById("searchCTA").style.backgroundColor =  "#000000";
  document.getElementById("searchCTA").style.padding =  "24px";
  document.getElementById("searchCTA").style.fontSize =  "24px";
  document.getElementById("searchCTA").innerText = apiResponse + "\n\n";
}

chrome.runtime.sendMessage(
  // This message is sent to background.js when one of the URL's in manifest.json is invoked.
  { message: "urlMatch"},
  async function(response) {
    // This callback is invoked when the background.js responds with a URL.
    const prompt = await response.search;
    const apiResponse = await ChatGptResponse(prompt);
    manipulatePage(apiResponse);
  }
);