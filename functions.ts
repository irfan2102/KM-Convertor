import { dictionary } from './json';
import { corpus } from './corpus';
import { dictionarywords } from './dictionaryWords';

export function noOfCorpes() {
  console.log(`Number of corpus available in the json file : ${Object.keys(corpus).length}`)
}

export function getCorpusDetails(fileName: any) {
  //get each word from corpus
  let words = [];
  corpus[fileName].forEach((line: any) => {
    let y = line.split(' ');
    y.forEach((i) => {
      i !== '' && words.push(i);
    });
  });
  //display each unique word
  let uniqueWords = [...new Set(words)];

  // console.log('***Unique words***');
  // uniqueWords.forEach((unique) => {
  //   console.log(unique);
  // });
  console.log('******');
  console.log('Number of words in the corpus : ' + words.length);
  console.log('Number of unique words in the corpus : ' + uniqueWords.length);
}

export function convertCorpus(fileName: any) {
  //get each word from corpus
  let words = [];
  corpus[fileName].forEach((line: any) => {
    let y = line.split(' ');
    y.forEach((i: any) => {
      i !== '' && words.push(i);
    });
  });

  //convert corpus to KM grammar
  let convertedText = [];
  words.forEach((txt) => {
    dictionary.json[txt] !== undefined
      ? convertedText.push(dictionary.json[txt])
      : convertedText.push(txt);
  });

  console.log(convertedText.join(' '));
}

export function getMissingWordsInDict(fileName: any) {
  //get each word from corpus
  let words = [];
  corpus[fileName].forEach((line: any) => {
    let y = line.split(' ');
    y.forEach((i) => {
      i !== '' && words.push(i);
    });
  });
  let uniqueWords: any = [...new Set(words)];
  console.log('Number of unique words in the corpus : ' + uniqueWords.length);
  //get diff in two arrays :- (A ∩ B)'
  let missings = uniqueWords.filter((d) => !(<any>dictionarywords).includes(d));
  console.log(
    'Number of words not present in dict from this corpus: ' + missings.length
  );
  missings.forEach((missing: any) => {
    missing !== undefined && console.log(missing);
  });
}

export function generateSentencesinKMfromCorpus(
  fileName: any,
  sentenceLength: number
) {
  //get each word from corpus
  let words = [];
  corpus[fileName].forEach((line: any) => {
    let y = line.split(' ');
    y.forEach((i: any) => {
      i !== '' && words.push(i);
    });
  });

  //convert corpus to KM grammar
  let convertedText = [];
  words.forEach((txt) => {
    dictionary.json[txt] !== undefined
      ? convertedText.push(dictionary.json[txt])
      : convertedText.push(txt);
  });

  let count = 0;
  for (let i = 0; i <= convertedText.length; i += sentenceLength) {
    count++;
    let temp = convertedText.slice(i, sentenceLength + i);
    console.log(`<s> ${temp.join(' ')} <s> (Male4/4_${count})`);
  }
}
