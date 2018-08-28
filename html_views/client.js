const wsServerPort = 5567;

var wsClient = new WebSocket("ws://localhost:" + wsServerPort);

wsClient.onmessage = function (event) {
    document.getElementById("test").innerText = "Received something... O.o";
}