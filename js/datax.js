

async function loadData() {
    try {
        const response = await fetch('json/data.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        await loadBoxesWithDelay(data); // Load boxes with delay
        setTimeout(placeTheHolders, 0); // Placeholders loaded after a delay



    } catch (error) {
        console.error('Fetch error:', error);
    }
}


async function loadBoxesWithDelay(data) {
    const gridContainer = document.getElementById('grid');
    const items = data.items;
    const delay = 100; // 1 second delay

    for (const item of items) {
        await sleep(delay); // Sleep for the delay before inserting the box
        const box = createBoxHTML(item); // Create HTML for the box
        gridContainer.insertAdjacentHTML('beforeend', box); // Insert the box after the delay
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createBoxHTML(item) {
    let boxHTML = '';
    const status = item.item.status;
    const h1 = item.h1;
    const h2 = item.h2;
    let boxcontent = item.boxcontent;
    const boxtype = item.boxtype;
    // Define an array of transition effects
    const transitions = ['slideInLeft', 'slideInRight', 'slideInUp', 'slideInDown'];
    // Choose a random transition effect from the array
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];

    // if status is live/true
    if (status === "live") {
        // then if h1 is not empty
        if (h1 !== "") {
            // h1 text boxes - display
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive  ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                <h1 class='clickable brand searchable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${h1}</h1>
                ${boxcontent}
                <span class='exit material-symbols-rounded md-16 whitet'>close</span>
            </li>
            <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                            <div class='contentLayout'>
                                <div class='content-grid-container'>
                                    <div class='square-item'>
                                        <h2>${item.item.heading}</h2>
                                        <h4 class='md-16'>${item.item.date}</h4>
                                    </div>
                                    <div class='wide-item'>
                                        ${item.item.content}
                                    </div>
                                    <div class='media-item'>
                                        <h3 class='md-32 flex-item square'>${item.item.subheading}</h3>
                                        </div><div class='media-item ${item.item.figureStatus}'>
                                        <figure class=' ${item.item.figure}'>
                                            <img src='images/${item.item.image}'>
                                            <figcaption class='caption'>${item.item.caption}</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        }
        // Display boxes with no link
        else if (boxtype === "display" && boxcontent !== "empty") {
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                            <div class='icon-clr'>
                                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                            </div>
                            <h2><a href='${item.boxlink}' target='_blank'>${h2}</a></h2>
                            ${boxcontent}
                            <span class='exit material-symbols-rounded md-16 whitet'>close</span>
                        </li>
                        `;
        }
        // Display boxes with link
        else if (boxtype === "link") {
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                                    <a href='${item.boxlink}' target='_blank'><div class='icon-clr'>
                                        ${item.icon}</div>
                                        <a href='${item.boxlink}' target='_blank'>
                                    <h2 class='clickable searchable'>${h2}</h2></a>
                                    ${boxcontent}
                                    <span class='exit material-symbols-rounded md-16 whitet'>close</span></a>
                                </li>`;

        }

        // Boxes - clickable headings that open full width content - (h2 boxes and has content and h2 is not empty OR boxcontent is not equal to 'empty' then display boxes)
        else if (h2 !== "" || boxcontent !== "empty") {
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive  ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                            <div class='icon-clr'>
                                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                            </div>
                            <h2 class='clickable searchable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
                            ${item.boxcontent}
                            <span class='exit is-hidden md-16 whitet'>exit</span>
                        </li>
                        <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                            <div class='contentLayout'>
                                <div class='content-grid-container'>
                                    <div class='square-item'>
                                        <h2>${item.item.heading}</h2>
                                        <h4 class='md-16'>${item.item.date}</h4>
                                    </div>
                                    <div class='wide-item'>
                                        ${item.item.content}
                                    </div>
                                    <div class='media-item'>
                                        <h3 class='md-32 flex-item square'>${item.item.subheading}</h3>
                                        </div><div class='media-item ${item.item.figureStatus}'>
                                        <figure class=' ${item.item.figure}'>
                                            <img src='images/${item.item.image}'>
                                            <figcaption class='caption'>${item.item.caption}</figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        }
        // h2 boxes and has content and h2 is not empty OR boxcontent is not equal to 'empty' then display boxes
        else if (h2 !== "" || boxcontent !== "empty") {

            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive' id='box-${item.id}' tabindex='${item.id}>
            <div class='icon-clr'>
            <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
            </div>
            <h2 class='clickable searchable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
            ${item.boxcontent}</li >
                <li class='fullwidth is-hidden' id='quickview-${item.id}'>
                <div class='contentLayout'>
                <div class='content-grid-container'>
                <div class='square-item'>
                            <h2 class='md-48'>${item.item.heading}</h2>
                            <h4 class='md-16'>${item.item.date}</h4>
                            </div>
                            <div class='wide-item'>
                                ${item.item.content}</div>
                        <div class='media-item ${item.item.figureStatus}'>
                         <h3 class='md-32 flex-item square'>${item.item.subheading}</h3>
                         </div><div class='media-item ${item.item.figureStatus}'>
                    <figure class=' ${item.item.figure}'>
                    <img src='images/${item.item.image}'>
                     <figcaption class='caption'>${item.item.caption}</figcaption></figure></div>
                     
                    </div>
                    </div>
                </li>`;

        }
        // Blank boxes - if boxcontent is 'empty' display blank boxes
        else if (boxtype === "display" && boxcontent === "empty") {
            boxHTML = `<li class="box ${item.item.colour} ${randomTransition}"'></li>`;

        }
        // If box status is equal to 'pending' don't display anything
        else if (status === 'pending') {
            box = ``;
        }
    }

    return boxHTML;
}



function placeTheHolders() {
    const gridContainer = document.getElementById('grid');
    const targetItemCount = 8;
    const currentItemCount = gridContainer.querySelectorAll('.box').length;

    const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

    if (remainingItems < 8) {
        addPlaceholders(remainingItems);
    }
    else {
        loadSearchScript();

    }
}

function addPlaceholders(remainingItems) {
    console.log("add placeholder atived")
    const gridContainer = document.getElementById('grid');
    const colors = ['pink', 'blue', 'green', 'gold', 'black', 'white'];

    for (let i = 0; i < remainingItems; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const placeholderLi = document.createElement('li');
        placeholderLi.classList.add('box', 'illuminate', 'boxshadow', randomColor);
        placeholderLi.textContent = '';
        gridContainer.append(placeholderLi);
        console.log("appeneded")
    }



    // Run the search function only if placeholders have been loaded
    placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
    if (placeholdersLoaded) {
        loadSearchScript();

    }

}
// Call loadData function after the DOM content is loaded

loadData();




function loadSearchScript() {
    const script = document.createElement('script');

    script.src = 'js/search.js'; // Path to your second script file
    document.body.appendChild(script);
}



