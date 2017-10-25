var disneys = ["Goofy", "Mickey", "Donald", "Daisy", "Minnie", "Mary Poppins", "Cinderella", "Gus Gus"];

function loadButtons() {

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
        searchTerm + "&limit=8&offset=0&rating=G&lang=en";

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
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);


            $("#disneyGifs").prepend(gifDiv);
        }
    });
});

$("#addDisney").on("click", function () {
    event.preventDefault();
    var input = $("#disney-input").val();

    if (!disneys.includes(input)) {
        addButton(input);
    }
    document.getElementById("disney-input").value = "";
});

