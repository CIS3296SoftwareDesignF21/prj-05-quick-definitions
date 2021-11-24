document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("dictionary_com").addEventListener("click", handler);
    document.getElementById("thesaurus_com").addEventListener("click", handler);
    //console.log("event listeners added");
    displayDefinitions();
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
    //add code here to add each definition to popup
    console.log("in function");
    var selected = document.getElementById("selectedButton");
    let partOfSpeech = item.partOfSpeech;
    let definition = item.definitions[0].definition;
    let line = (index + 1) + ". " + partOfSpeech + ". " + definition;
    selected.innerHTML += "<p>" + line + "</p>";
}

// The handler also must go in a .js file
function handler(event) {
    // console.log(event);
    // console.log("clicked!");
    var selected = document.getElementById("selectedButton");
    // console.log(selected.id);
    var target = event.target;
    // console.log("here1");
    var clickedEle = event.target.id ;
    // //console.log(clickedEle);
    var ele = document.getElementById(clickedEle);
    // //console.log(ele);
    // //console.log(ele.innerHTML);
    var line = '';
    var word = window.getSelection().toString();
    var value = '';
    if (event.target.id === 'dictionary_com') {
        line = "Define: " + word;
    } else {
        line = "Thesaurus: " + word;
    }

    //This code is moved to displayDefinitions()
    /*getDataForWord(word)
        .then(data => {
            let meanings = [];
            for (let i = 0; i < data[0].meanings.length; i++) {
                value += data[0].meanings[i].definitions[0].definition;
                meanings.push(data[0].meanings[i]);
            }
        });*/
    line += value;
    selected.innerHTML = line;
}