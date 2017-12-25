var socket = io();
console.log("data emitted");
socket.emit("data", "well fuck me");
socket.on("data", function(data) {
    console.log(data);
});
