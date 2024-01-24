async function loadData() {
    try {
        // Fetch JSON data using the fetch API
        const response = await fetch('json/data.json');

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Handle the loaded data
        processData(data);
    } catch (error) {
        // Handle errors
        console.error('Fetch error:', error);
    }
}

function processData(data) {
    // Select the grid container
    const gridContainer = document.querySelector('#grid');
    const targetItemCount = 8;

    // Access the 'items' array from the JSON data
    const items = data.items;

    // Iterate through each item and display it
    items.forEach(item => {

        const status = `${item.item.status}`;
        const h1 = `${item.h1}`;
        const h2 = `${item.h2}`;
        let box = ``;
        const boxcontent = `${item.boxcontent}`;


        if (status === "live") {

            if (h1 !== "") {
                // h1 text boxes
                box = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}'>
                <h1 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h1}</h1>
                </li >
                    <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                        <div class='contentLayout'>
                            <div class='contentLayoutDiv'>
                                <h2 class='md-48 pad50'>${item.item.heading}</h2>
                                <h4 class='md-16 pad50'>${item.item.date}</h4>
                            </div>
                            <figure class='visible'><img src="images/${item.item.image}">
                                <figcaption class='caption'>${item.item.caption}</figcaption></figure>
                            <h3 class='md-32 pad50'>${item.item.subheading}</h3>

                            <div>${item.item.content}</div>
                        </div>
                    </li>`;
            }
            // h2 boxes and has content
            else if (h2 !== "" || boxcontent !== "empty") {

                box = `<li class='box illuminate ${item.item.colour} inactive' id='box-${item.id}'>
                <div class='icon-clr'>
                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                </div>
                <h2 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
                ${item.boxcontent}</li >
                    <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                        <div class='contentLayout'>
                            <div class='contentLayoutDiv'>
                                <h2 class='md-48 pad50'>${item.item.heading}</h2>
                                <h4 class='md-16 pad50'>${item.item.date}</h4>
                            </div>
                            <figure class='visible'><img src="images/${item.item.image}">
                                <figcaption class='caption'>${item.item.caption}</figcaption></figure>
                            <h3 class='md-32 pad50'>${item.item.subheading}</h3>

                            <div>${item.item.content}</div>
                        </div>
                    </li>`;

            }
            // Blank boxes
            else if (boxcontent === "empty") {
                box = `<li class="box ${item.item.colour} inactive"  id='box-${item.id}'></li> `;
            }
            else if (status === 'pending') {
                box = ``;
            }

            // Append the item element to the container
            gridContainer.insertAdjacentHTML('beforeend', box);
        }
    });

}


// Call the function to load data
loadData();

