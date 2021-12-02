//state will take the value "dictionary" or "thesaurus"
let state = "dictionary";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("dictionary_com").addEventListener("click", handler);
    document.getElementById("thesaurus_com").addEventListener("click", handler);
    //console.log("event listeners added");
    chrome.storage.local.get("state", function(result) {
        state = result.state;
        if (state === "dictionary")
            displayDefinitions();
        else
            displayThesaurus();
    });
});

function displayDefinitions() {

    chrome.storage.local.get("wordToDefine", function(result) {
        const word = result.wordToDefine;
        console.log("Value of word: " + word);

        if (word === null) return;
    
        getDataForWord(word)
            .then(data => {
                let meanings = [];
                for (let i = 0; i < data[0].meanings.length; i++) {
                    //console.log(data[0].meanings[i].definitions[0].definition);
                    meanings.push(data[0].meanings[i]);
                }
                
                var selected = document.getElementById("selectedButton");
                selected.innerHTML += "<h2>" + word + "<h2>";
                meanings.forEach(addToPopup);
                
                //alert([word, meanings[0].partOfSpeech, meanings[0].definitions[0].definition]);
            });
    });
}

function displayThesaurus() {

    chrome.storage.local.get("wordToDefine", function(result) {
        const word = result.wordToDefine;
        console.log("Value of word: " + word);

        if (word === null) return;
    
        getDataForWord(word)
            .then(data => {
                let meanings = [];
                for (let i = 0; i < data[0].meanings.length; i++) {
                    meanings.push(data[0].meanings[i]);
                }
                
                var selected = document.getElementById("selectedButton");
                selected.innerHTML += "<h2>" + word + "<h2>";
                meanings.forEach(addToPopup);
            });
    });
}

async function getDataForWord(word) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        console.error("Error: Could not fetch url. Word is: " + word);
        return null;
    }
}

function addToPopup(item, index) {
    if (state === "dictionary") {
        var selected = document.getElementById("selectedButton");
        let partOfSpeech = item.partOfSpeech;
        selected.innerHTML += "<h3>" + partOfSpeech + ".</h3>";
        for (let i = 0; i < item.definitions.length; i++) {
            let line = (i + 1) + ". " + item.definitions[i].definition;
            selected.innerHTML += "<p>" + line + "</p>";
        }
    } else {
        //thesaurus
        var selected = document.getElementById("selectedButton");
        let partOfSpeech = item.partOfSpeech;
        selected.innerHTML += "<h3>" + partOfSpeech + ".</h3>";
        for (let i = 0; i < item.definitions.length; i++) {
            let synonyms = item.definitions[i].synonyms;
            let line = (i + 1) + ". ";
            for (let j = 0; j < synonyms.length; j++) {
                line += synonyms[j];
                if (j !== synonyms.length - 1)
                    line += ", ";
            }
            selected.innerHTML += "<p>" + line + "</p>";
        }
    }
}

function handler(event) {
    var selected = document.getElementById("selectedButton");
    var target = event.target;
    var clickedEle = event.target.id;
    var ele = document.getElementById(clickedEle);
    var line = '';
    var word = window.getSelection().toString();
    var value = '';
    if (event.target.id === 'dictionary_com') {
        line = "Define: " + word;
        state = "dictionary";
    } else {
        line = "Thesaurus: " + word;
        state = "thesaurus";
    }
    line += value;
    selected.innerHTML = line;
    saveState();
    if (state === "dictionary")
        displayDefinitions();
    else
        displayThesaurus();
}

function saveState() {
    chrome.storage.local.set({"state": state}, function() {
        console.log('State has been saved: ' + state);
    });
}