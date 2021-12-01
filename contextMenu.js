chrome.runtime.onInstalled.addListener(() => {

    let contextMenuItem = {
        "id": "defineWord",
        "title": 'Define "%s"',
        "contexts": ["selection"]
    };
    chrome.contextMenus.create(contextMenuItem);
});

function storeSelectedWord(clickData) {
    if (clickData.menuItemId == "defineWord") {
        let word = clickData.selectionText.split(' ')[0];
        chrome.storage.local.set({"wordToDefine": word}, function() {
            console.log('Word has been saved: ' + word);
        });
    }
}

chrome.contextMenus.onClicked.addListener(storeSelectedWord);