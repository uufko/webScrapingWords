const cheerio = require("cheerio")
const axios = require("axios")

const answerData = []
const dataQ = []
const answerURL = "https://kelimeturetme.com/b-ile-baslayan-4harfli-kelimeler"
const questionURL = `https://kelimeturetme.com/ağız-ne-demek`




    async function getWords (){
        const response = await axios.get(answerURL)
        const $ = cheerio.load(response.data)

        const answerLocator = $(".card-text")
        answerLocator.each(function(){
            asdd= $(this).find("a").text()

            answerData.push({"answer":asdd})
            
        }) 
        //console.log(data2);
        //console.log(data2[0].answer);
        //console.log(Object.keys(data2).length);
        console.log(Object.keys(answerData).length);
    }

    //getWords()

    async function getAnswer(){

        const response = await axios.get(questionURL)
        const $ = cheerio.load(response.data)

        const questionLocator = $("p")
        dataQ.push(questionLocator.contents().text())
        dataQString = JSON.stringify(dataQ)

        const index=dataQString.indexOf("isim") +5
        const lastindex=dataQString.indexOf("2")
        const question = dataQString.substring(index,lastindex)
        
    }
    //getAnswer()