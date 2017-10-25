var disneys = ["Goofy", "Mickey", "Donald", "Daisy", "Minnie", "Mary Poppins", "Cinderella", "Gus Gus"];
var storageKey = "myDisneyArray";

function loadButtons() {
    var dtemp = JSON.parse(localStorage.getItem(storageKey));
    if (dtemp != null && dtemp.length > 0) {
        disneys = dtemp;
    }

    for (var i = 0; i < disneys.length; i++) {
        var character = disneys[i];

        addButton(character);
    }
}

function addButton(character) {
    var button = $("<button>");
    button.attr("data-character", character);
    button.addClass("btn btn-info charButton");
    button.append(character);

    var butDiv = $("#disneyButtons");
    butDiv.append(button);
}

loadButtons();

$(document).on("click", ".charButton", function () {
    var character = $(this).attr("data-character");
    console.log(character);

    var searchTerm = "Disney " + character;

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GNVtmwK5sqWbs7PygiD96bVDBQCfqEky&q=" +
        searchTerm + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        $("#disneyGifs").empty();
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.addClass("gif");
            personImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.append(personImage);


            $("#disneyGifs").prepend(gifDiv);
        }
    });
});

$("#addDisney").on("click", function () {
    event.preventDefault();
    var input = $("#disney-input").val();

    if (!disneys.includes(input)) {
        disneys.push(input);
        localStorage.setItem(storageKey, JSON.stringify(disneys));
        addButton(input);
    }
    document.getElementById("disney-input").value = "";
});

$(document).on("click",".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

