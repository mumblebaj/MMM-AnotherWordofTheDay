import cheerio from 'cheerio';
import { get } from 'axios';

export const url = "https://www.spanishdict.com/wordoftheday";
export function getesData(callback) {
    get(url).then(({ data }) => {
        const container = $(".gl1Y0YQP");

        const translationData = [];

        for (let i = 0; i < container.length; i++) {
            const currentContainer = container[i];
            const container1 = $(".xiQBRZra")[i];
            const container2 = $(".KkXPxEB8")[i];

            // Get Spamish Word
            const word = $(currentContainer).find("h3");

            // Get English Translation
            const tranlation = word.next();

            // Get Spanish Example
            const spanishExample = $(container1);

            // Get English Example
            const englishExample = $(container2);

            translationData.push({
                "word": word.text(),
                "translation": translation.text(),
                "examples": {
                    "spanish": spanishExample.text(),
                    "english": englishExample.text()
                }
            });
        }

        return translationData;
    });
}