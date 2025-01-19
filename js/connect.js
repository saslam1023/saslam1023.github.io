document.addEventListener("DOMContentLoaded", function() {
    // Event delegation: Attach the event listener to the document (or another static parent element)
    document.addEventListener('submit', function (event) {
        // Check if the target of the event is the form
        if (event.target && event.target.id === 'contactForm') {
            event.preventDefault(); // Prevent default form submission

            const form = event.target; // The form that was submitted
            const formData = new FormData(form); // Get the form data


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
    }
    });
});
