document.addEventListener("DOMContentLoaded", () => {

    let ip = $(".server-ip").attr("data-ip");

    const serverStatusElement = document.querySelector(".server-status");
    const serverIconElement = document.querySelector(".server-icon");
    const serverIPElement = document.querySelector(".server-ip");
    const serverMOTDElement = document.querySelector(".server-motd");

    const serverInfoDiv = document.getElementById("server-info");
    const popupElement = document.getElementById("popup"); 

    const apiURL = `https://api.mcstatus.io/v2/status/java/${ip}`;

    serverInfoDiv.addEventListener("click", () => {
        const serverAddress = ip;
        const textArea = document.createElement("textarea");
        textArea.value = serverAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        popupElement.classList.add("show");
        serverInfoDiv.classList.add("shrink");
        setTimeout(() => {
            serverInfoDiv.classList.remove("shrink");
        }, 500);

        setTimeout(() => {
            popupElement.classList.remove("show");
        }, 2000);
    });

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            const { players, motd } = data;
            const onlinePlayers = players.online;
            const maxPlayers = players.max;

            serverIPElement.innerHTML = ip;
            serverStatusElement.innerHTML = `${onlinePlayers}/${maxPlayers}`;

            const iconData = data.icon;
            serverIconElement.src = iconData;

            const motdText = motd.clean;
            serverMOTDElement.textContent = motdText;
        })
        .catch((error) => {
            console.error("Error fetching server data:", error);
            serverStatusElement.innerHTML = "Error";
        });
});
