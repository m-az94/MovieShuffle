

$(document).ready(function(){

    var APIKey = "5258a1b12eab1eb6a43101023288eacf";

    // Here we are building the URL we need to query the database
   // var queryURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=" + APIKey;
    var queryURL = "https://api.themoviedb.org/3/genre/movie/list?api_key="+APIKey+"&language=en-US";
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        
        
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response.genres[0]);
        for(var i=0;i<19;i++){
        var newDiv=$("<div>");
        var newButton=$("<button>");
        $(".buttonBox").append(newDiv);
        newDiv.append(newButton);
        newButton.text(response.genres[i].name);
        newButton.attr("id","genres")
        newButton.attr("data-id",response.genres[i].id)
        }

      });


});