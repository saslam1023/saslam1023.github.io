document.addEventListener("DOMContentLoaded", function() {
    // Event delegation: Attach the event listener to the document (or another static parent element)
    document.addEventListener('submit', function (event) {
        // Check if the target of the event is the form
        if (event.target && event.target.id === 'contactForm') {
            event.preventDefault(); // Prevent default form submission

            const form = event.target; // The form that was submitted
            const formData = new FormData(form); // Get the form data

    // Send the form data using fetch
   /* fetch('https://slammin-design.co.uk/connect.php', {
        method: 'POST',
        body: formData
    })*/
    fetch('https://formspree.io/f/xeepqdrl', {
        method: 'POST',
        body: formData,
        headers: {
        'Accept': 'application/json'
    }
    })
    .then(response => {
    const messagesElement = document.querySelector('.messages');

    if (response.ok) {
        messagesElement.innerText = "Your message has been sent. Will be in touch shortly.";
        form.reset();
    } else {
        messagesElement.innerText = "Something went wrong. Try again later.";
    }
})
.catch(error => {
    const messagesElement = document.querySelector('.messages');
    messagesElement.innerText = "Something went wrong. Please try again.";
});

    }
    });
});
