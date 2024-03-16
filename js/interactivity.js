
// Click function
$(document).on("click", "h1, h2, .clickable", function () {

    const targetId = $(this).data("target");
    const boxId = $(this).data("link");
    const isOpen = $(targetId).hasClass("is-hidden");
    const active = $('li').hasClass("active");
    const parentLi = $(this).parent("li"); // ?
    const parentLi2 = $(this).parent("li").parent("li");
    const boxcol = $(this).parent("li").closest("li");
    const color = parentLi.css('background-color');
    const color2 = parentLi2.css('background-color');
    const boxcol2 = boxcol.css('background-color');

    console.log(`boxcol:` + boxcol)
    console.log(`boxcol2:` + boxcol2)
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
            backgroundColor: color,
            height: $(window).height() + "px"
        }).removeClass("is-hidden").addClass("active"); // activates the fullwidth box  
        $(boxId).addClass("expand active").removeClass("box inactive focusable"); // keep this  ADDS INITIAL
        $(".exit").addClass("clickable").removeClass("is-hidden");
        $(".miniIcon").addClass("is-hidden");
        scrollToTopLeft()

    }

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

    scrollToTopLeft($(this).parent("li"));
});

