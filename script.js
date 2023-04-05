// SLIDE //

const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".img");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});


// SLIDE //

// API CHAT GPT //

const pergunta = document.getElementById("pergunta"); // Var de saida
const resposta = document.getElementById("resposta"); // Var de entrada
const Key = "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"; // Key da API

pergunta.addEventListener("keypress", (e) => {
  if (pergunta.value && e.key === "Enter") env_pergunta();
});

function env_pergunta() {
  var result = pergunta.value;

  fetch("https://api.openai.com/v1/completions", { 
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + Key,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: result,
      max_tokens: 500,
      temperature: 0.5, 
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resposta.value) resposta.value += "\n";

      if (json.error?.message) {
        resposta.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var txt = json.choices[0].text || "Sem retorno";

        resposta.value += "IA => " + txt;
      }

      resposta.scrollTop = resposta.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      pergunta.value = "";
      pergunta.disabled = false;
      pergunta.focus();
    });

  if (resposta.value) resposta.value += "\n\n\n";

  resposta.value += `=> ${result}`;
  pergunta.value = "...";
  pergunta.disabled = true;
  resposta.scrollTop = resposta.scrollHeight;
}

// API CHAT GPT //