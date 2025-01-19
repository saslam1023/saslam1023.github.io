// Get form element
const form = document.getElementById('contactForm');

// Add event listener to the form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);

    // Send the form data using fetch
    fetch('https://slammin-design.co.uk/connect.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        // Update the .messages element with the response message
        const messagesElement = document.querySelector('.messages');
        if (data.success) {
            // If successful, display the success message
            messagesElement.innerText = data.message;
        } else {
            // If there's an error, display the error message
            messagesElement.innerText = data.message;
        }
    })
    .catch(error => {
        // Handle any errors from the fetch request
        const messagesElement = document.querySelector('.messages');
        messagesElement.innerText = "Something went wrong. Please try again.";
    });
});
