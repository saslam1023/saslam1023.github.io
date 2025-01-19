document.querySelector('#contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const formData = new FormData(this);

    fetch('https://slammin-design.co.uk/connect.php', {
        method: 'POST',
        body: formData,
    })
 .then(response => response.json()) // Parse JSON response
        .then(data => {
            const messagesDiv = document.querySelector('.messages');
            if (data.success) {
                // Display success message
                messagesDiv.innerText = data.message;
                messagesDiv.style.color = 'green';
            } else {
                // Display error message
                messagesDiv.innerText = data.message;
                messagesDiv.style.color = 'red';
            }
        })
        .catch(error => {
            // Handle network or fetch errors
            const messagesDiv = document.querySelector('.messages');
            messagesDiv.innerText = 'Oops! Something went wrong. Please try again.';
            messagesDiv.style.color = 'red';
        });
});
