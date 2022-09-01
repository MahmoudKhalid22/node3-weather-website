const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageO");
const messageTwo = document.querySelector("#messageT");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading...";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.label;

        messageTwo.textContent = data.forecast;
      }
    });
  });
});
