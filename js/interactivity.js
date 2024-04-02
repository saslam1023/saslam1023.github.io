
// Click function

// Click function on li.box
$(document).on("click", "li.box", function () {

    // Retrieve the target data from the h1 or h2 within the clicked li.box
    const targetId = $(this).find("h1, h2, .clickable, .inlink").data("target");
    const boxId = $(this).find("h1, h2, .clickable, .inlink").data("link")
    const backgroundColor = $(this).css("background-color");
    const isOpen = $(targetId).hasClass("is-hidden");
    const active = $('li').hasClass("active");
    const parentLi = $(this).parent("li"); // ?
    const parentLi2 = $(this).parent("li").parent("li");
    const boxcol = $(this).parent("li").closest("li");
    const color = parentLi.css('background-color');
    const color2 = parentLi2.css('background-color');
    const boxcol2 = boxcol.css('background-color');

    // Logging
    console.log(`boxcol:` + boxcol) // obj obj
    console.log(`boxcol2:` + boxcol2) // undefined
    console.log(`targetid` + targetId) // quickview 5
    console.log(`boxid:` + boxId) // box 5
    console.log(`isopen:` + isOpen)//true
    console.log(`active:` + active)//false
    console.log(`color;` + color)//undefined
    console.log(`color2:` + color2)//undefined
    console.log(`backgroundcolor;` + backgroundColor)//rgb 220 20 173
    console.log(`parentli:` + parentLi)//obj obj
    console.log(`parentli2:` + parentLi2)//obj obj



    // Closes open containers
    if (active === true) {
        // remove expand active from expand active and add box inactive (to main grid boxes)
        $(".expand.active").removeClass("expand active").addClass("box inactive");
        // hide fullwidth and deactivate
        $(".fullwidth.active").addClass("is-hidden").removeClass("active");
        // hide the exit button
        $(".exit").removeClass("clickable").addClass("is-hidden");
        // display the mini icon back to the grid box view
        $(".miniIcon").removeClass("is-hidden");
    }


    // Opens new container
    if (isOpen) {
        $(targetId).css({
            // set the data target id of #quickview-xx bg colour to color
            backgroundColor: backgroundColor,
            height: $(window).height() + "px"
        }).removeClass("is-hidden").addClass("active"); // activates the fullwidth box  
        $(boxId).addClass("expand active").removeClass("box inactive focusable"); // keep this  ADDS INITIAL
        $(".exit").addClass("clickable").removeClass("is-hidden");
        $(".miniIcon").addClass("is-hidden");
        scrollToTopLeft()

    }

    // Add event handler for .exit links
    $(".exit").on("click", function () {

        // Your logic to handle exit button clicks
        // For example, closing the fullwidth container
        $(this).addClass("is-hidden").removeClass("active");
        // Also remove active class from corresponding box
        $(boxId).removeClass("expand active").addClass("box inactive focusable");
        // Hide the exit button again
        $(this).removeClass("clickable").addClass("is-hidden");
        // Show the mini icon back to the grid box view
        $(".miniIcon").removeClass("is-hidden");
    });


    scrollToTopLeft($(this));
});




// Click INLINK function
$(document).on("click", ".inlink", function () {

    const targetId = $(this).data("target");
    const boxId = $(this).data("link");
    const isOpen = $(targetId).hasClass("is-hidden");
    const active = $('li').hasClass("active");

    const expandParent = $(this).closest(".expand");
    let colorClass = "";
    if (expandParent.length > 0) {
        colorClass = expandParent.attr("class").split(" ").find(cls => ["pink", "gold", "black", "white", "green", "blue"].includes(cls));
    }


    // Closes open containers
    if (active === true) {
        // remove expand active from expand active and add box inactive (to main grid boxes)
        $(".expand.active").removeClass("expand active").addClass("box inactive");
        // hide fullwidth and deactivate
        $(".fullwidth.active").addClass("is-hidden").removeClass("active");
        // hide the exit button
        $(".exit").removeClass("clickable").addClass("is-hidden");
        // display the mini icon back to the grid box view
        $(".miniIcon").removeClass("is-hidden");
    }


    // Opens new container
    if (isOpen) {
        $(targetId).css({
            // set the data target id of #quickview-xx bg colour to color
            backgroundColor: colorClass,
            height: $(window).height() + "px"
        }).removeClass("is-hidden").addClass("active"); // activates the fullwidth box  
        $(boxId).addClass("expand active").removeClass("box inactive focusable"); // keep this  ADDS INITIAL
        $(".exit").addClass("clickable").removeClass("is-hidden");
        $(".miniIcon").addClass("is-hidden");


    }

    // Map class names to corresponding colors
    const colorMap = {
        "pink": "#dc14ad",
        "gold": "#f3a70e",
        "black": "#000000",
        "white": "#ffffff",
        "green": "#67dc14",
        "blue": "#14b4dc"
    };

    // Check if .fullwidth container is active and apply color from corresponding .expand container
    if ($(".fullwidth").hasClass("active")) {
        // Retrieve the color class from the corresponding .expand container
        const expandColorClass = $(".expand.active").attr("class").split(" ").find(cls => Object.keys(colorMap).includes(cls));

        // Set the background color of .fullwidth container based on the color class of .expand container
        const color = colorMap[expandColorClass];
        $(".fullwidth.active").css("background-color", color);
    }



    //    scrollToTopLeft($(this));

    scrollToTopLeft($(".expand.active"));
});




// Scroll to the top-left corner of the selected li element
function scrollToTopLeft(selector) {
    let selectedElement = $(selector);

    if (selectedElement.length > 0) {
        let offset = selectedElement.offset();

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        }, 'slow');
    }
}