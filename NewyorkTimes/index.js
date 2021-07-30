let api_url = "https://api.nytimes.com/svc/topstories/v2/";
let key = "g8ZklzqvLYqkpzeuMn4TtCk2VUSJO2WA";
let info = document.querySelector(".info-body");
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getData(section) {
  try {
    info.innerHTML = "";
    let res = await fetch(`${api_url}${section}.json?api-key=${key}`);
    let data = await res.json();
    data.results.forEach((indata) => {
      let card = createTag("div", "card col-lg-8 col-sm-12");
      let section_card = createTag("h4", "section-card");
      section_card.innerText = indata.section.toUpperCase();
      let titlecard = createTag("h5", "titlecard");
      titlecard.innerText = indata.title;
      let date = createTag("p", "date-card");
      let indate = new Date(indata.created_date);
      date.innerText = `${monthNames[indate.getMonth()]} ${indate.getDate()}`;
      let abstract = createTag("p", "abstract-card");
      abstract.innerText = indata.abstract;
      let anchor = createTag("a", "continueReading");
      anchor.innerText = "Continue Reading";
      anchor.setAttribute("href", indata.url);
      anchor.setAttribute("target", "_blank");
      let img = createTag("img", "img-thumbnail col-lg-4 col-sm-12");
      img.src = indata.multimedia[0].url;
      card.append(section_card, titlecard, date, abstract, anchor);
      info.append(card, img);
    });
  } catch (err) {
    console.log(err);
  }
}

function createTag(ele, eleclass) {
  let element = document.createElement(ele);
  element.setAttribute("class", eleclass);
  return element;
}