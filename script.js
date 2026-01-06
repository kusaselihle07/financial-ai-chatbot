let database = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => database = data);

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  let reply = getBotResponse(message);
  setTimeout(() => addMessage(reply, "bot"), 500);
}

function getBotResponse(message) {
  for (let item of database) {
    for (let keyword of item.keywords) {
      if (message.includes(keyword)) {
        return item.answer;
      }
    }
  }
  return "Sorry, I can only answer basic financial planning questions for now.";
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
