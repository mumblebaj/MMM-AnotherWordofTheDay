const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    url: "https://www.spanishdict.com/wordoftheday",
    getesData: function (callback) {
        axios.get(url).then(({ data }) => {
            const $ = cheerio.load(data);

            const container = $(".gl1Y0YQP");

            const translationData = [];

            for (let i = 0; i < container.length; i++) {
                const currentContainer = container[i];
                const container1 = $(".xiQBRZra")[i];
                const container2 = $(".KkXPxEB8")[i];

                // Get Spanish Word
                const word = $(currentContainer).find("h3");
                // Get English Translation
                const translation = word.next();

                // Get Spanish Examples
                const spanishExample = $(container1);

                // Get English Translation
                const englishExample = $(container2);

                translationData.push({
                    "word": word.text(),
                    "translation": translation.text(),
                    "examples": {
                        "wordex": spanishExample.text(),
                        "wordextr": englishExample.text()
                    }
                })
            }
            callback(translationData);
        })
    }
}