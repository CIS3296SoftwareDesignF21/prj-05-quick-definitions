chrome.runtime.onInstalled.addListener(() => {

    let contextMenuItem = {
        "id": "defineWord",
        "title": 'Define "%s"',
        "contexts": ["selection"]
    };
    chrome.contextMenus.create(contextMenuItem);
});

function printSelectedText(clickData) {
    if (clickData.menuItemId == "defineWord") {
        console.log(clickData.selectionText);
    }
}

chrome.contextMenus.onClicked.addListener(printSelectedText);