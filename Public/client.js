document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const messages = document.getElementById("messages");
    const toggleButton = document.getElementById("toggle-btn");

    let username = prompt("Enter your username:");
    while (!username) {
        username = prompt("Username cannot be empty. Please enter your username:");
    }

    toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (socket.connected) {
            toggleButton.classList.remove("connected");
            toggleButton.innerText = "Connect";
            socket.disconnect();
        } else {
            toggleButton.classList.add("connected");
            toggleButton.innerText = "Disconnect";
            socket.connect();
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit("chat message", { username, message: input.value });
            input.value = "";
        }
    });

    socket.on("chat message", (data) => {
        const item = document.createElement("li");
        item.textContent = `${data.username}: ${data.message}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
});
