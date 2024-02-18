console.log('Page loaded.');

// Fonction de recherche
function searchItems() {
    var input, filter, container, img, i, txtValue;
    input = document.getElementById('searchBar');
    filter = input.value.toUpperCase();
    container = document.getElementById('itemsContainer');
    img = container.getElementsByTagName('img');

    // Boucle à travers les images et cache celles qui ne correspondent pas à la recherche
    for (i = 0; i < img.length; i++) {
        txtValue = img[i].alt || img[i].getAttribute('data-name');
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            img[i].style.display = "";
        } else {
            img[i].style.display = "none";
        }
    }
}

$(document).ready(function() {
    $(".draggable").draggable({
        revert: "invalid",
        helper: "clone",
        opacity: 0.7,
        start: function(event, ui) {
            $(this).css('opacity', '0.5');
        },
        stop: function(event, ui) {
            $(this).css('opacity', '1');
        }
    });

    $(".droppable-cell").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            // Here, you handle the drop into the table cells
            // Assuming you want to clone the draggable and append it to the cell
            var dropped = ui.helper.clone(false)
                .removeClass('ui-draggable-dragging')
                .css({position: 'relative', left: '0', top: '0'})
                .appendTo(this);
            dropped.draggable({
                revert: "invalid",
                opacity: 0.7
            });
        }
    });

    $("#itemsContainer").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            // Here, you handle the case where an item is dragged back to the original container
            // Reset the item's display and position if necessary
            $(ui.draggable).show().css({position: 'static'});
        }
    });

    $("body").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            // Here, you handle the case where an item is dragged outside of the table
            // You could remove the item or return it to its original position
            ui.draggable.remove(); // Or whatever logic you need
        }
    });
});
