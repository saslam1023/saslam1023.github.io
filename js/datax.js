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
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                <h1 class='clickable brand' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${h1}</h1>
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
        // Boxes with no additional content - if h2 is not empty and boxcontent is 'nocontent' display box but no fullwidth container
        else if (h2 !== "" && boxtype === "display") {
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                            <div class='icon-clr'>
                                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                            </div>
                            <h2><a href='${item.boxlink}' target='_blank'>${h2}</a></h2>
                            ${boxcontent}
                            <span class='exit material-symbols-rounded md-16 whitet'>close</span>
                        </li>
                        `;
        }
        // h2 boxes and has content and h2 is not empty OR boxcontent is not equal to 'empty' then display boxes
        else if (h2 !== "" || boxcontent !== "empty") {
            boxHTML = `<li class='box illuminate focusable ${item.item.colour} inactive ${randomTransition}' id='box-${item.id}' tabindex='${item.id}'>
                            <div class='icon-clr'>
                                <a href='${item.boxlink}' target='_blank'>${item.icon}</a>
                            </div>
                            <h2 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
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
            <h2 class='clickable' data-link='#box-${item.id}' data-target='#quickview-${item.id}'>${item.h2}</h2>
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
        else if (boxcontent === "empty") {
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

    if (remainingItems > 0) {
        addPlaceholders(remainingItems);
    }
}

function addPlaceholders(remainingItems) {
    const gridContainer = document.getElementById('grid');
    const colors = ['pink', 'blue', 'green', 'gold', 'black', 'pink', 'white'];

    for (let i = 0; i < remainingItems; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const placeholderLi = document.createElement('li');
        placeholderLi.classList.add('box', 'illuminate', 'boxshadow', randomColor);
        placeholderLi.textContent = '';
        gridContainer.append(placeholderLi);
    }



    // Run the search function only if placeholders have been loaded
    placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
    if (placeholdersLoaded) {
        initializeSearch();
    }



    // Search

    function initializeSearch() {
        const searchBar = document.getElementById('search-bar');
        const searchOptions = document.getElementById('search-options');
        const searchResults = document.getElementById('search-results');
        const clearBtn = document.getElementById('clear-btn');
        let searchTimeout;

        searchBar.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(search, 500); // Adjust the delay as needed (in milliseconds)
        });

        searchOptions.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                searchBar.value = event.target.textContent;
                scrollToElement(event.target.dataset.index);
            }
        });

        searchBar.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default form submission
                search();
            }
        });

        clearBtn.addEventListener('click', function () {
            searchBar.value = '';
            searchResults.innerHTML = '';
            hideOptions();
            clearHighlight();
        });
        // here
        function search() {
            const searchText = searchBar.value.toLowerCase();
            searchResults.innerHTML = '';

            if (searchText.length <= 1) {
                hideOptions();
                clearHighlight();
                return;
            }

            const headings = document.querySelectorAll('h1, h2, h3');
            const matches = [];

            headings.forEach((heading, index) => {
                const headingText = heading.innerText.toLowerCase();
                const headingIndex = headingText.indexOf(searchText);

                // Check if the heading is within an li with class 'box' - add ! if want to invert search to hidden content in fullwidth containers.
                if (isInsideBoxList(heading)) {
                    if (headingIndex !== -1) {
                        matches.push({
                            index: index,
                            start: headingIndex,
                            end: headingIndex + searchText.length
                        });
                    }
                }
            });

            displayResults(matches);
        }
        //
        // Helper function to check if an element is inside an li with class 'box'
        function isInsideBoxList(element) {
            const closestLi = element.closest('li.box');
            return closestLi !== null && closestLi.classList.contains('box');
        }

        // there
        function displayResults(matches) {
            if (matches.length > 0) {
                showOptions(matches);
                scrollToElement(matches[0].index);
            } else {
                hideOptions();
            }
        }

        function showOptions(matches) {
            searchOptions.innerHTML = '';
            matches.forEach(match => {
                const li = document.createElement('li');
                li.textContent = document.querySelectorAll('h1, h2, h3, .clickable')[match.index].textContent;
                li.dataset.index = match.index;
                searchOptions.appendChild(li);
            });
            searchOptions.style.display = 'block';
            highlightMatches(matches);
        }

        function hideOptions() {
            searchOptions.innerHTML = '';
            searchOptions.style.display = 'none';
            clearHighlight();
        }

        function clearHighlight() {
            const headings = document.querySelectorAll('h1, h2, h3, .clickable');
            headings.forEach(heading => {
                heading.innerHTML = heading.innerText;
            });
        }

        function scrollToElement(index) {
            const targetElement = document.querySelectorAll('h1, h2, h3, .clickable')[index];
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            clearHighlight();
            // Highlight the matched text
            targetElement.innerHTML = targetElement.innerText.replace(new RegExp(searchBar.value, 'gi'), (match) => `<span class="highlight">${match}</span>`);
        }

        function highlightMatches(matches) {
            const headings = document.querySelectorAll('h1, h2, h3, .clickable');
            headings.forEach((heading, index) => {
                const headingText = heading.innerText;
                let highlightedText = '';

                matches.forEach(match => {
                    if (match.index === index) {
                        const start = match.start;
                        const end = match.end;
                        highlightedText += `${headingText.substring(0, start)}<span class="highlight">${headingText.substring(start, end)}</span>${headingText.substring(end)}`;
                    } else {
                        highlightedText = headingText;
                    }
                });

                heading.innerHTML = highlightedText;
            });
        }



        function showOptions(matches) {
            searchOptions.innerHTML = '';

            const addedIndexes = []; // Track added indexes

            matches.forEach(match => {
                const index = match.index;

                // Check if the item with the same index has already been added
                if (!addedIndexes.includes(index)) {
                    const li = document.createElement('li');
                    li.textContent = document.querySelectorAll('h1, h2, h3, .clickable')[index].textContent;
                    li.dataset.index = index;
                    searchOptions.appendChild(li);

                    addedIndexes.push(index); // Add the index to the addedIndexes array
                }
            });

            searchOptions.style.display = 'block';
            highlightMatches(matches);
        }
    }



}

loadData();
