
// Click function
$(document).on("click", "h1, h2, .clickable", function () {
    const targetId = $(this).data("target");
    const boxId = $(this).data("link");
    const isOpen = $(targetId).hasClass("is-hidden");
    const active = $('li').hasClass("active");
    const parentLi = $(this).parent("li"); // ?
    const color = parentLi.css('background-color');
    const fullwidthContainer = $(this).closest(".fullwidth"); // ?


    console.log(parentLi) // array
    console.log(targetId) // id #quickview-
    console.log(isOpen) // true
    console.log(active) // false / true
    console.log(this) // <h2 data-target="#quickview-6">I'm a crafter</h2>
    console.log(fullwidthContainer) // array
    console.log(boxId) // id #box-


    // Closes open containers
    if (active === true) {
        $(".expand.active").removeClass("expand active").addClass("box inactive"); // keep this  ADDS INITIAL

        $(".fullwidth.active").addClass("is-hidden").removeClass("active");
    }


    // Opens new container
    if (isOpen) {
        $(targetId).css({
            backgroundColor: color,
            height: $(window).height() + "px"
        }).removeClass("is-hidden").addClass("active"); // activates the fullwidth box  
        $(boxId).addClass("expand active P4").removeClass("box inactive"); // keep this  ADDS INITIAL
    }

    // Scrolls into position / view

    function scrollToTopLeft(selector) {
        const selectedElement = $(selector);
        if (selectedElement.length > 0) {
            const offset = selectedElement.offset();
            $('html, body').animate({
                scrollTop: offset.top,
                scrollLeft: offset.left
            }, 'slow');
        }
    }

    scrollToTopLeft(parentLi);
});



