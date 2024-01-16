$(document).ready(function () {

    // *** Get Date
    function getDate() {
        function formatDate(d) {
            var dd = d.getDate()
            if (dd < 10) dd = '0' + dd

            var mm = d.getMonth() + 1
            if (mm < 10) mm = '0' + mm

            var yyyy = d.getFullYear() + 0 % 100
            if (yyyy < 10) yyyy = '0' + yyyy

            var tthh = d.getHours()
            if (tthh < 10) tthh = '0' + tthh

            var ttss = d.getMinutes()
            if (ttss < 10) ttss = '0' + ttss

            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

            var mmm = monthNames[d.getMonth()]
            return dd + ' ' + mmm + ' ' + yyyy
        }

        var d = new Date()
        document.getElementById('date').value = formatDate(d);
    }
    //. end date


    // *** Load Grid
    $(document).ready(function () {
        // Select the grid container
        const gridContainer = $('#grid');
        const targetItemCount = 8;


        // *** Load dynamic data from a JSON file using jQuery
        $.getJSON('json/data.json', function (data) {
            $.each(data.items, function (i, f) {
                let tblRow = "";
                const status = `${f.item.status}`;
                const h1 = `${f.h1}`;
                const h2 = `${f.h2}`;
                const boxcontent = `${f.boxcontent}`;

                if (status === 'live') {
                    if (h1 !== "") {
                        tblRow = `
                    <li class='box illuminate boxshadow ${f.item.colour}' >
                        <h1 class='clickable' data-target='#quickview-${f.id}'>${f.h1}</h1>${f.icon}${f.boxcontent}
                    </li>
                    <li class='fullwidth is-hidden' id='quickview-${f.id}'>
                        <div class='contentLayout'>
                            <h2 class='md-48 pad50'>${f.item.heading}</h2>
                            <div>${f.item.content}</div>
                            <p class='md-32 pad50'>Test <a href='#'>inline ${f.item.link} link</a>.</p>
                        </div>
                    </li>`;
                    } else if (h2 !== "" || boxcontent !== "empty") {
                        tblRow = `
                    <li class='box illuminate boxshadow ${f.item.colour}'>
                        <h2 class='clickable' data-target='#quickview-${f.id}'>${f.h2}</h2>${f.icon}${f.boxcontent}
                    </li>
                    <li class='fullwidth is-hidden' id='quickview-${f.id}'>
                        <div class='contentLayout'>
                            <h2 class='md-48 pad50'>${f.item.heading}</h2>
                            <div>${f.item.content}</div>
                            <p class='md-32 pad50'>Test <a href='#'>inline ${f.item.link} link</a>.</p>
                        </div>
                    </li>`;
                    } else if (boxcontent === "empty") {
                        tblRow = `<li class='box illuminate boxshadow ${f.item.colour}' ></li>`;
                    }
                } else if (status === 'pending') {
                    tblRow = "";
                }

                // Append the generated HTML to the grid container
                gridContainer.append(tblRow);
            });


            // Placeholders for full grid style view

            // Check the current number of li elements after dynamic data is loaded
            const currentItemCount = gridContainer.children('.box').length;

            // Calculate the remaining items needed to complete the last row
            const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

            // Add placeholder li elements only for the last row
            if (remainingItems > 0) {
                addPlaceholders(remainingItems);

            }
        });
        // Placeholder additions
        let placeholdersLoaded = false;

        // Placeholder additions
        function addPlaceholders(remainingItems) {
            // Array of possible colors (yes, pink and white are set twice!)
            const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];

            // Array to store the colors used in the current row
            let usedColorsInRow = [];

            for (let i = 0; i < remainingItems; i++) {
                // Filter out colors that have been used in the current row to prevent duplicates
                const availableColors = colors.filter(color => !usedColorsInRow.includes(color));

                // If all unique colors have been used, allow controlled repetition
                if (availableColors.length === 0) {
                    // Choose a random color from the entire color array
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    // Add the chosen color to the usedColorsInRow array
                    usedColorsInRow.push(randomColor);
                } else {
                    // Choose a random color from the available colors
                    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
                    // Add the chosen color to the usedColorsInRow array
                    usedColorsInRow.push(randomColor);
                }

                // Create placeholder li element with the random color
                const placeholderLi = document.createElement('li');

                // Add additional classes
                placeholderLi.classList.add('box', 'illuminate', 'boxshadow', usedColorsInRow[i], 'round-border');

                // Add text content if desired
                placeholderLi.textContent = '';

                // Update grid
                gridContainer.append(placeholderLi);
            }
            placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
            if (placeholdersLoaded) {
                initializeSearch();
            }
        }

        /* removed
        // Click event for dynamically created h1 elements
        $(document).on("click", "h1.clickable", function () {
            var targetId = $(this).data("target");
            var isOpen = $(targetId).hasClass("is-hidden");
            var color = getColorFromClass($(this).closest("li").attr('class'));
        
            // Close all open fullwidth containers
            $(".fullwidth").addClass("is-hidden");
        
            // Makes li container full width
            $("li").removeClass("expand");
            $(this).parent("li").toggleClass("expand");
        
            // Scroll to a selected item and position it to the top-left corner
            function scrollToTopLeft(selector) {
                var selectedElement = $(selector);
        
                // Check if the element exists
                if (selectedElement.length > 0) {
                    // Calculate the offset of the element
                    var offset = selectedElement.offset();
        
                    // Scroll to the element's top-left corner
                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    }, 'slow');
                }
            }
        
            // Scroll to the top-left corner of the selected element with ID 'exampleElement'
            scrollToTopLeft(this);
        
            // If the clicked container was not open, open it and set background color
            if (isOpen) {
                // Fade in and set background color
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000); // Adjust the duration as needed
            }
        
        
            // KEEP Helper function to get the color from class
            function getColorFromClass(classString) {
                // Extract the color class, assuming it is the second class in the list
                var colorClass = classString.split(' ')[1];
                return window.getComputedStyle(document.querySelector('.' + colorClass), null).getPropertyValue('background-color');
            }
        });
        
        /*/
        //h2

        // Click function

        $(document).on("click", ".clickable", function () {
            var targetId = $(this).data("target");
            var isOpen = $(targetId).hasClass("is-hidden");

            // Get the background color of the parent li element
            var color = $(this).closest("li").css('background-color');

            // Close all open fullwidth containers
            $(".fullwidth").addClass("is-hidden");

            // Makes li container full width
            $("li").removeClass("expand");  // removes any previous open containers
            $(this).parent("li").toggleClass("expand");

            $('.open, span, .tooltip').addClass("is-hidden"); // hides non text content
            $(this).parent("li").removeClass("box illuminate"); // removes box effects
            //  $(this).parent("li").addClass("clickable");
            $(this).addClass("clicked");


            // Scroll to the top-left corner of the selected li element
            function scrollToTopLeft(selector) {
                var selectedElement = $(selector);

                if (selectedElement.length > 0) {
                    var offset = selectedElement.offset();

                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    }, 'slow');
                }
            }

            scrollToTopLeft($(this).closest("li"));

            // If the clicked container was not open, open it and set background color
            if (isOpen) {
                $(targetId).css({
                    backgroundColor: color,
                    height: $(window).height() + "px"
                }).removeClass("is-hidden").toggle().fadeIn(1000);
            }
        });


        //h2end


        // Click event for closing the fullwidth container (including close button)
        $(document).on("click", ".fullwidth, .expand, button[data-close]", function (e) {
            // Prevent the event from propagating to parent elements
            e.stopPropagation();

            // Find the closest fullwidth container
            var fullwidthContainer = $(this).closest(".fullwidth");
            var liContainer = $(this);
            // displays mini icon in li box
            $('.open').removeClass("is-hidden");
            // displays span icon in li box
            $('span').removeClass("is-hidden");
            // displays tooltip icon in li box
            $('.tooltip').removeClass("is-hidden");
            // displays box style again
            liContainer.addClass("box");
            liContainer.addClass("illuminate");
            // removes box style and replaces with slim line version
            $(this).parent("li").removeClass("box");
            $(this).parent("li").removeClass("illuminate");
            $(this).removeClass("clicked");


            console.log(fullwidthContainer);
            console.group(liContainer);


            // Fade out the fullwidth container and add the is-hidden class
            fullwidthContainer.fadeOut(1000, function () {
                // Hide the fullwidth container after fading out                

                fullwidthContainer.addClass("is-hidden");
                //  $("li").removeClass("expand");

            });

            $("li").removeClass("expand");
            fullwidthContainer.addClass("is-hidden");
            $('h2.clickable').removeClass("clicked");

        });



    });


});




