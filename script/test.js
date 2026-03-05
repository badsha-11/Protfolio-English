const creatEliment = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    console.log(htmlElements.join(" "))
};

const synonyms = ["hellow", "hi", "konnichiwa"];
creatEliment(synonyms)