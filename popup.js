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
