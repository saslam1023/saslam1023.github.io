
// Click function
$(document).on("click", "h1, h2, .clickable", function () {
    const targetId = $(this).data("target");
    const boxId = $(this).data("link");
    const isOpen = $(targetId).hasClass("is-hidden");
    const active = $('li').hasClass("active");
    const parentLi = $(this).parent("li"); // ?
    const parentLi2 = $(this).parent("li").parent("li");
    const color = parentLi.css('background-color');
    const color2 = parentLi2.css('background-color');
    const textcolor = parentLi.css('color');
    const fullwidthContainer = $(this).closest(".fullwidth"); // ?
    const exit = $(this).closest(".exit"); // ?

    console.log(targetId)
    console.log(boxId)
    console.log(isOpen)//true
    console.log(active)//true
    console.log(color)//undefined
    console.log(color2)//undefined
    console.log(parentLi)//undefined
    console.log(parentLi2)//undefined

    // Closes open containers
    if (active === true) {
        $(".expand.active").removeClass("expand active").addClass("box inactive"); // keep this  ADDS INITIAL

        $(".fullwidth.active").addClass("is-hidden").removeClass("active");
        $(".exit").removeClass("clickable").addClass("is-hidden");
        $(".miniIcon").removeClass("is-hidden");
    }


    // Opens new container
    if (isOpen) {
        $(targetId).css({
            backgroundColor: color,
            height: $(window).height() + "px"
        }).removeClass("is-hidden").addClass("active"); // activates the fullwidth box  
        $(boxId).addClass("expand active").removeClass("box inactive focusable"); // keep this  ADDS INITIAL
        $(".exit").addClass("clickable").removeClass("is-hidden");
        $(".miniIcon").addClass("is-hidden");

    }


    // Add a click event handler to links within the full-width container
    $(".fullwidth active").on("click", "a", function () {
        // Extract the color of the corresponding h2 text's li box
        var color2 = $(this).closest(".fullwidth active").prev().find("h2").css("color");

        // Apply the extracted color to the full-width container
        $(".fullwidth active").css("background-color", color2);
    });
    console.log(color2)



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

    scrollToTopLeft($(this).closest(".expand"));
});


// Tabbing
// Get all tabbed item elements
const tabItems = document.querySelectorAll('.focusable');

// Add event listener to each tabbed item
tabItems.forEach(tabItem => {
    tabItem.addEventListener('keyup', function (event) {
        // Check if Enter key is pressed (keyCode 13) or (key === 'Enter')
        if (event.key === 'Enter') {
            // Execute your desired event
            console.log('Enter key pressed on:', this.textContent);
            // You can add your event handling code here
        }
    });
});