const createElements = (arr)=>{
  const htmlelemnts = arr.map(el => `<span class="btn">${el}</span>`)
  return htmlelemnts.join(" ");
}


const manegSpinner = (status) =>{
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }
  else{
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const loadLession = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then((js) => displayLesson(js.data));

}

const removeActive = () =>{
  const lessionButton = document.querySelectorAll(".lessionBtn")
  lessionButton.forEach(btn=>btn.classList.remove("active") );
}

const loadLevelWord =(id) =>{
   manegSpinner(true);
    const url =`https://openapi.programming-hero.com/api/level/ ${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=> {
      removeActive();
      const clickbtn = document.getElementById(`lession-btn-${id}`)
      
      clickbtn.classList.add("active"); //
      loadLevelWorddisplay (data.data)
    })
}
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"

const loadWordDetail =async(id) => {
  const url =`https://openapi.programming-hero.com/api/word/${id}`
  const res =await fetch(url);
  const details =await res.json();
  hafiz(details.data);
}



const hafiz = (word) =>{
  console.log(word);
    const detailsBox=document.getElementById("details_container");
    detailsBox.innerHTML=`
      <div>
        <h2 class="text-2xl font-bold .bangla-font">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
       <div>
        <h2 class=" font-bold">
        Meaning
        </h2>
        <p class="bangla-font ">${word.meaning}</p>
      </div>
       <div>
        <h2 class=" font-bold">
         Example
        </h2>
        <p>${word.sentence}</p>
      </div>
       <div>
        <h2 class=" font-bold bangla-font">
         সমার্থক শব্দ গুলো
        </h2>
       <div class ="">${createElements(word.synonyms)}
        
      </div>
      </div>
    `;
    document.getElementById("my_modal").showModal();
}


const loadLevelWorddisplay =(words)=>{
   const wordContainer =document.getElementById("word-container");
   wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML =`
         <div class="text-center  col-span-full">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
      <h3 class="mb-[12px] bangla-font text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
      <h1 class="text-[35px] font-semibold text-[#292524] bangla-font">নেক্সট Lesson এ যান</h1>
    </div>
        `;
        manegSpinner(false)
        return;
    }

   for(let word of words){
    const card =document.createElement("div");
    card.innerHTML =`
    <div class="bg-white rounded-xl h-100vh shadow-sm text-center py-10 px-5 space-y-4 m-[30px]">
      <h1 class="text-[30px] font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
      <p class="text-[18px] font-medium ">Meaning /Pronounciation</p>
      <div class="text-[#18181B] text-[20px] font-semibold bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation:"pronunciation-পাওয়া যায়নি" }"</div>
      <div class="flex justify-between items-center">

        <button onclick="loadWordDetail(${word.id})
        " class="btn text-[#374957] bg-[#1A91FF10] hover:bg-[#1A91FF80] p-[10px] "><i class="fa-solid fa-circle-info "></i></button>
        <button onclick="" class=" btn text-[#374957] bg-[#1A91FF10] p-[10px] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i>
        </button>
        
      </div>

    </div>
    `;
    wordContainer.append(card);
   };
   manegSpinner(false);
}
const displayLesson = (lessons) =>{
    const btnContainer = document.getElementById("btn-container");
          btnContainer.innerHTML = "";
    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        console.log(lesson)
        btnDiv.innerHTML = `
               <button id="lession-btn-${lesson.level_no}" 
               onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lessionBtn" >
               <span><i class="fa-solid fa-book-open-reader"></i></span>Lession- ${lesson.level_no}</button>

        `
         btnContainer.append(btnDiv);
    }
}
loadLession();




document.getElementById("search-button").addEventListener("click", () => {
  removeActive();
  const inputSearch = document.getElementById("search-input");
  const searchvalue = inputSearch.value.trim().toLowerCase();
  console.log(searchvalue);

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res=>res.json())
  .then(data=>{

    const allwords = data.data;
    console.log(allwords);

    const filterwords = allwords.filter((word)=>
      word.word.toLowerCase().includes(searchvalue)
  );
  
    loadLevelWorddisplay(filterwords);
  });

  
})
