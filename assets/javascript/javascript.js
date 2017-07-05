$(document).ready(function() {

 $(".button").on("click", function() {
    var id = this.id

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        id + "&api_key=dc6zaTOxFJmzC&limit=10"

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //this function saves the image URL to a variable then uploads the images to the screen. 

    .done(function(response) {

      console.log(response);

      for(i=0; i<10; i++) {

        var imageUrl = response.data[i].images.fixed_height.url;
        var imageUrlStill = response.data[i].images.original_still.url;
        var image = $("<img>");


        image.attr("src", imageUrl);
        image.attr("id", "newImage");
        image.attr("data-still", imageUrlStill)
        image.attr("data-animate", imageUrl)
        image.attr("alt", id +" image");
        image.attr("data-state", "animate" )

        $("#images").prepend(image);

      }

      //this allows us to start and stop the gif images.  

      $("#images").on("click", "#newImage", function() {
      
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });


    });
  });
});