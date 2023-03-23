chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed");
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "urlMatch") {
      // Return the search data
      let search = sender.tab.title;
      // Remove the last 16 characters of string (which returns " - Brave Search")
      search = search.slice(0, -15)
      // search = search.split('&source=web')[0];
      sendResponse({ search });
    }
  }
);