const creatEliment = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.remove("hidden");
    // wordContainer.classList.add('hidden')
  } else {
    // wordContainer.classList.remove('hidden')
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remuve all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const deteilUrl = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(deteilUrl);
  const details = await res.json();
  displayWordDetail(details.data);
};

// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
// }
const displayWordDetail = (word) => {
  const detailsBox = document.querySelector("#details-container");
  detailsBox.innerHTML = `
          <div >
            <h2 class="font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h2>
          </div>
          <div >
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div >
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>

          <div >
            <h2 class="font-bold">Synonyms</h2>
            <div>${creatEliment(word.synonyms)}</div>
          </div>
           

          </div>
    `;
  document.querySelector("#word_modal").showModal();
};

// {
//     "id": 84,
//     "level": 1,
//     "word": "Fish",
//     "meaning": "মাছ",
//     "pronunciation": "ফিশ"
// }
const displayLevelWord = (words) => {
  const wordContainer = document.querySelector("#word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
               <div class="text-center col-span-full space-y-3 font-bangla">
                     <img src="./assets/alert-error.png" alt="" class ="mx-auto" {
                        constructor(parameters) {
                            
                        }
                     }>
                     <p class="text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                     <H2 class="text-3xl font-medium">নেক্সট Lesson এ যান</H2>
               </div>
            `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
           <div class="bg-white rounded-xl p-14 shadow-sm text-center space-y-6 h-full">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ খুঁজে পাওয়া যায়নি।"}</h2>
            <p class="font-semibold ">Meaning /Pronounciation</p>

            <div class="font-bangla text-2xl font-medium">"${word.meaning ? word.meaning : "অর্থ খুঁজে পাওয়া যায়নি।"} /${word.pronunciation ? word.pronunciation : "উচ্চারণ খুঁজে পাওয়া যায়নি।"}"</div>
            <div class="flex justify-between items-center ">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF1a] hover:bg-[#1A91FF8a]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

    wordContainer.appendChild(card);
  });
  manageSpinner(false);
};

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
            <button id="lesson-btn-${lesson.level_no}"
             onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn ">
                  <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
            </button>
        `;

    // append intu container
    levelContainer.append(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-scarch").addEventListener("click", () => {
    removeActive()
  const input = document.getElementById("input-scarch");
  const scarchValue = input.value.toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data; 
      const filterWords = allWords.filter(
        (word) => word.word.toLowerCase().
        includes(scarchValue),
      );
      displayLevelWord(filterWords)
    });
});
