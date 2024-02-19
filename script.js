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
    // Initialisation des éléments draggable avec un helper clone
    $(".draggable").draggable({
        helper: "clone",
        revert: "invalid",
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
            var clone = ui.helper.clone();
            $(this).append(clone.css({
                position: 'relative',
                top: '0px',
                left: '0px'
            }).draggable({
                revert: "invalid"
            }));
            ui.draggable.hide(); // Masquer l'élément original
            clone.dblclick(function() {
                $(this).remove();
                ui.draggable.show();
                sortItemsContainer();
            });
        }
    });

    // Fonction pour trier les éléments dans #itemsContainer par ordre alphabétique
    function sortItemsContainer() {
        var items = $("#itemsContainer .draggable").detach().get();
        items.sort(function(a, b) {
            var textA = $(a).attr("alt").toUpperCase();
            var textB = $(b).attr("alt").toUpperCase();
            return textA.localeCompare(textB);
        });
        $.each(items, function(i, item) {
            $("#itemsContainer").append(item);
        });
    }

    // S'assure que les éléments sont initialement triés
    sortItemsContainer();
});


   // Editer le texte après le patch
document.addEventListener("DOMContentLoaded", function() {
    var editablePatchInfo = document.getElementById("editablePatchInfo");

    editablePatchInfo.addEventListener("input", function() {
        if (this.innerText.length > 5) {
            // Si le texte dépasse 5 caractères, le réduire à 5 caractères
            this.innerText = this.innerText.substr(0, 5);
            // Déplacer le curseur à la fin du texte
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(this.childNodes[0], this.innerText.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
});
