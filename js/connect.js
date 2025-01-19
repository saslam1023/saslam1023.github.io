    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from refreshing the page

        const formData = new FormData(this);
        fetch('https://slammin-design.co.uk/connect.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.querySelector('.messages').innerText = "Thank you for your message!";
        })
        .catch(error => {
            document.querySelector('.messages').innerText = "Oops! Something went wrong. Please try again.";
        });
    });


    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        document.querySelector('.messages').innerText = "Thank you for your message!";
    }