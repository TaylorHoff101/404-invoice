document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("createButton").addEventListener("click", function() {
        window.location.href = "create.html";
    });
});

document.getElementById("uploadCSV").addEventListener("click", function() {
    console.log("inside")
    window.open("http://3.27.23.157/invoice/CSV", "_blank");
})

document.getElementById("uploadJSON").addEventListener("click", function() {
    window.open("http://3.27.23.157/invoice/JSON", "_blank");
})

document.querySelector(".logo").addEventListener("click", function() {
    window.location.href = "index.html";
});