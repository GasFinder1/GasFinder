import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const metaphone = natural.Metaphone;

function calculateJaccardSimilarity(str1, str2) {
    const tokens1 = new Set(tokenizer.tokenize(str1));
    const tokens2 = new Set(tokenizer.tokenize(str2));

    const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
    const union = new Set([...tokens1, ...tokens2]);

    return intersection.size / union.size;
}

function calculateMetaphoneSimilarity(str1, str2) {
    const metaphone1 = metaphone.process(str1);
    const metaphone2 = metaphone.process(str2);

    return metaphone1 === metaphone2 ? 1 : 0;
}

function similaritySort(a, b) {
    if (a.similarity_total < b.similarity_total) {
        return 1;
    } else if (a.similarity_total > b.similarity_total) {
        return -1;
    }
    return 0;
}
//obj_comparação, obj_posto, array_pesquisa
function getSimilarity(searchString, toComparate, searchText) {
    const tokenizer = new natural.WordTokenizer();
    const metaphone = natural.Metaphone;

    for (let i = 0; i < searchText.length; i++) {
        const st = searchText[i];
        for (let j = 0; j < toComparate.length; j++) {
            const similarity = calculateJaccardSimilarity(searchString[st].toLowerCase(), toComparate[j][st].toLowerCase()) + calculateMetaphoneSimilarity(searchString[st].toLowerCase(), toComparate[j][st].toLowerCase());
            toComparate[j]["similarity_total"] = toComparate[j]["similarity_total"] == undefined ? similarity : toComparate[j]["similarity_total"] + similarity;
            toComparate[j]["similarity_amount"] = (toComparate[j]["similarity_amount"] ?? 0) + 1;
            toComparate[j]["similarity_AVG"] = toComparate[j]["similarity_total"] / toComparate[j]["similarity_amount"]
        }
    }
    //pegar a melhorresposta
    toComparate.sort(similaritySort);
    return (toComparate);
}

export default { getSimilarity };