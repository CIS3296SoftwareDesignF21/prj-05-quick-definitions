document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("dictionary_com").addEventListener("click", handler);
    document.getElementById("thesaurus_com").addEventListener("click", handler);
    //console.log("event listeners added");
});

async function getDataForWord(word) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        console.error("Error: Could not fetch url.");
        return null;
    }
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
    getDataForWord(word)
        .then(data => {
            let meanings = [];
            for (let i = 0; i < data[0].meanings.length; i++) {
                value += data[0].meanings[i].definitions[0].definition;
                meanings.push(data[0].meanings[i]);
            }
        });
    line += value;
    selected.innerHTML = line;
}

let word = "hello"
getDataForWord(word)
    .then(data => {
        let meanings = [];
        for (let i = 0; i < data[0].meanings.length; i++) {
            console.log(data[0].meanings[i].definitions[0].definition);
            meanings.push(data[0].meanings[i]);
        }
        //alert([word, meanings[0].partOfSpeech, meanings[0].definitions[0].definition]);
    });
