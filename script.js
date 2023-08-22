console.log("hello welcome");

const baseUrl = "https://pixabay.com/api/";

const API_KEY = "24177466-d88d351020f5fc5de5a1ed9d4";

const loader = document.querySelector(".loader");

const template = document.querySelector("#template");

const load_more_button = template.content.lastElementChild;

console.log(load_more_button)

const load_button = load_more_button.querySelector(".load-more");

const notFound = document.querySelector('.not-found');

const title = document.querySelector(".img-title");

let page = 1

let query = "programming";



window.addEventListener("load", fetchData(page,query));



// fetch data function
async function fetchData(page,query) {
  console.log(page)
  console.log(query)
  notFound.style.display = "none";
  title.style.display = "none"
  loader.style.display = "block";
  try {
    console.log('hello')
    const response = await fetch(
      `${baseUrl}?key=${API_KEY}&q=${query}&image_type=photo&page=${page}`
    );
    const { hits } = await response.json();
    if (hits.length === 0){
        notFound.style.display = "block"
        title.style.display = "none"
    }
    if (page == 4) {
      load_button.style.display = "none";
    }
    bindData(hits);

    loader.style.display = "none";
  } catch (error) {
    console.log("something went wrong");
  }
}

const img_card_container = document.querySelector(".img-card-container");
const fragment = document.createDocumentFragment();




// bind data function
function bindData(hits) {
  hits.forEach((hit) => {
    const cloneNode = template.content.cloneNode(true).firstElementChild;
    fillData(cloneNode, hit);
    fragment.appendChild(cloneNode);
  });

  if (hits.length > 0){
    fragment.appendChild(load_more_button);
  }
  img_card_container.appendChild(fragment);

}


// fill data function
function fillData(cloneNode, hit) {
  const heart_icon = cloneNode.querySelector(".fa-heart");
  const image = cloneNode.querySelector("img");
  const img_info = cloneNode.querySelector(".image-info p span");
  image.src = hit.largeImageURL;
  img_info.innerText = hit.likes;
  heart_icon.addEventListener("click" , ()=>{
    heart_icon.classList.toggle('red')
    if (heart_icon.classList.contains('red')){
      img_info.innerText = hit.likes + 1
      console.log('red')
    }
    else{
      img_info.innerText = hit.likes
      console.log("removed")
    }
  })



}

// load more buttons
load_button.addEventListener("click", () => {
  page += 1;
  if (page <= 4) {
    fetchData(page , query);
  }
});




// seach data based on buttons
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", function() {
    query = button.innerText;
    title.innerText = `${query}s images`
    img_card_container.innerHTML = " ";
    fetchData(page = 1,query);
  });
});




// seach 

const search = document.querySelector("#search");
const search_button = document.querySelector(".search-button");
search_button.addEventListener("click" , ()=>{
  query = search.value;

  img_card_container.innerHTML = " ";
  fetchData(page = 1 , query)
})
