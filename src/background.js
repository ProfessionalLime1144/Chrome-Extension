chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed");
});

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    if (request.message === "urlMatch") {
      // Return the search data
      let search = sender.tab.title;
      // Remove the last 16 characters of string (which returns " - Brave Search")
      search = search.slice(0, -15);
      sendResponse({ search });
    }
  }
);