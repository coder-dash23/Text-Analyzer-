let charCount = document.getElementById('char')
let wordCount = document.getElementById('count')
let sentences = document.getElementById('sentences')
let spaces = document.getElementById('spaces')
let punctuation = document.getElementById('Punctuation');
const textArea = document.querySelector('.text')
const Processbtn = document.getElementById('btn');

let UIValues = [charCount, wordCount, sentences, spaces, punctuation];

function init() {
    UIValues.forEach(value => value.innerHTML = 0);

}
init();

Processbtn.addEventListener('click', () => {
    let text = textArea.value;
    charCount.innerHTML = text.length;
    wordCount.innerHTML = findWord(text);
    sentences.innerHTML = findsentences(text);
    spaces.innerHTML = text.split(" ").length - 1;
    punctuation.innerHTML = findPunctuation(text)

});

function findWord(text) {
    let temptext = text.replace(/[.,!%&*;:'"-()]/g, "");
    temptext = temptext.replace(/[\r]/g, "").split(/\n/);

    let templist = [];
    temptext.forEach(word => templist.push(word.split(" ")));
    function extract(arr) {
        return arr.reduce((wordList, word) => {
            return wordList.concat(Array.isArray(word) ? extract
                (word) : word);
        }, []);
    }


    let wordList = extract(templist);
    return wordList.filter(char => char != '').length;

}

function findsentences(text) {
    const regex = /[\w|\][.?!](\s|$)/g;
    let sencount = text.match(regex);
    return sencount ? sencount.length : 0;

}

function findPunctuation(text) {
    const regex = /[`.,?;:!-'"(){}]/g;
    let puncConst = text.match(regex);
    return puncConst ? puncConst.length : 0;
}


