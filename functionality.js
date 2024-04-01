document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("createButton").addEventListener("click", function() {
        window.location.href = "create.html";
    });
    document.getElementById("renderButton").addEventListener("click", function() {
        window.location.href = "rendering.html";
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
    document.querySelectorAll('.invoice_link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Get the corresponding render buttons for the clicked link
            const renderButtons = link.nextElementSibling;

            // Toggle the visibility of render buttons
            renderButtons.classList.toggle('show');

            // Prevent default link behavior
            event.preventDefault();
        });
    });
});
