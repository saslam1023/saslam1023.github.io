document.querySelector('#contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const formData = new FormData(this);

    fetch('https://slammin-design.co.uk/connect.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.querySelector('.messages');
            if (data.success) {
                messagesDiv.innerText = data.message; // Display success message
                messagesDiv.style.color = 'green';
            } else {
                messagesDiv.innerText = data.message; // Display error message
                messagesDiv.style.color = 'red';
            }
        })
        .catch(error => {
            document.querySelector('.messages').innerText =
                'Something went wrong. Please try again.';
            document.querySelector('.messages').style.color = 'red';
        });
});
