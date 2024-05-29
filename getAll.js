const cheerio = require("cheerio")
const axios = require("axios")
const fs = require("fs")
const { log } = require("console")
const answerData = []
const dataQ = []
const questionData = []
const answerURL = "https://kelimeturetme.com/a-ile-baslayan-4harfli-kelimeler"
const harfler =['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş','t', 'u', 'ü', 'v', 'y', 'z']


async function getAll() {

    const response = await axios.get(answerURL)
    const $ = cheerio.load(response.data)

    const answerLocator = $(".card-text")
    answerLocator.each(function () {
        asdd = $(this).find("a").text()
        answerData.push({ "answer": asdd })

    })

    for (let i = 0; i < Object.keys(answerData).length; i++) {
        let response2 = await axios.get(`https://kelimeturetme.com/${answerData[i].answer}-ne-demek`)
        let $2 = cheerio.load(await response2.data)

        let questionLocator = $2("p")
        let dataaa= questionLocator.contents().text()
        dataQString = JSON.stringify(dataaa)
        let index = dataQString.indexOf("isim") + 5
        let lastindex = dataQString.indexOf("\\n")
        let question = dataQString.substring(index, lastindex)
        questionData.push({ "question": question, "answer": answerData[i].answer})

        console.log(harfler[0]);
    }
    
    console.log(questionData);
    fs.writeFile('Output.txt', JSON.stringify(questionData), (err) => {
 
        // In case of a error throw err.
        if (err) throw err;
    })
}
getAll()