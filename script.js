let body = document.querySelector("body");
let container = document.querySelector(".container");
const accessKey = "pC_gK4x5alohCFidTYqqnhX8jdtyxJ4s1_Dlb2vWFL4";
let inputData = "";
let input = document.querySelector("input");
let search = document.querySelector(".searchBtn");
let page = 0;
let loadBtn = document.querySelector(".load");
let err = document.querySelector(".resultNotfound");

async function generator() {
  try {
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const res = data.results;
    res.forEach((element) => {
      let ele = document.createElement("div");
      let description = document.createElement("a");
      description.href = element.links.html;
      ele.target = "_blank";
      ele.classList.add("imageContainer");
      let img = document.createElement("img");
      img.classList.add("boxes");
      img.src = element.urls.regular;
      description.innerText = element.alt_description;
      description.classList.add("description");
      ele.appendChild(img);
      ele.appendChild(description);
      container.appendChild(ele);
    });
    loadBtn.style.cursor = "pointer";
    page++;
    loadBtn.style.display = "block";
  } catch (e) {
    err.style.display = "block";
  }
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (inputData !== input.value) {
      container.innerHTML = "";
      page = 1;
      generator();
    }
  }
});

search.addEventListener("click", () => {
  if (inputData !== input.value) {
    err.style.display = "none";
    container.innerHTML = "";
    page = 1;
    generator();
  }
});

loadBtn.addEventListener("click", () => {
  if (page !== 0) {
    generator();
  }
});
