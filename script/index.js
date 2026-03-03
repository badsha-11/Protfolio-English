const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.data))
}


// {
//     "id": 84,
//     "level": 1,
//     "word": "Fish",
//     "meaning": "মাছ",
//     "pronunciation": "ফিশ"
// }
const displayLevelWord = (words) => {
    const wordContainer = document.querySelector("#word-container")
    wordContainer.innerHTML = ""
    words.forEach((word) =>{
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML = `
           <div class="bg-white rounded-xl p-14 shadow-sm text-center space-y-6">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold ">Meaning /Pronounciation</p>

            <div class="font-bangla text-2xl font-medium">"${word.meaning} /${word.pronunciation}"</div>
            <div class="flex justify-between items-center ">
                <button class="btn bg-[#1A91FF1a] hover:bg-[#1A91FF8a]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(card)
    })
}

// display function
const displayLessons = (lessons) => {
    
  // 1.get the emti container
  const levelContainer = document.querySelector("#level-container");
  levelContainer.innerHTML = "";
  // 2.get intu every lesson
  for (let lesson of lessons) {
    // console.log(lesson);
    // creat eliment
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary ">
                  <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
            </button>
        `;

    // append intu container
    levelContainer.append(btnDiv);
  }
};


loadLessons();
