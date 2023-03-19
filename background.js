chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed");
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "urlMatch") {
      let search = sender.tab.url;
      search = search.split("q=")[1];
      search = search.split('&source=web')[0];
      sendResponse({ search });
    }
  }
);