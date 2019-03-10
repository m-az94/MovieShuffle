var APIKey = "5258a1b12eab1eb6a43101023288eacf";
var youtubeId ="";
var link ="";
var resultId="";
$(document).ready(function(){
        
        $("#nowPlaying").on("click",function(event){
            event.preventDefault();
           $(".buttonBox").empty();
           $(".movieInfo").empty();
           
            // Here we are building the URL we need to query the database
           var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key="+APIKey+"&language=en-US&page=1";
          
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
            url: queryURL,
            method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                //console.log(response);
                // Log the resulting object
                //console.log(response.results[0].original_language);
                addButtonsWithMovieInfo(response);
            });
        });

            $(document).on("click",".nowPlayingButton",function(event){
               // console.log(event);
                playYoutube(event);
               
            
            });
        


        $("#searchButton").on("click",function(event){
            event.preventDefault();
            $(".movieInfo").empty();
            $(".buttonBox").empty();

            var title = $("#inputMovie").val();
           
            var queryURL = "https://api.themoviedb.org/3/search/movie?api_key="+APIKey+"&language=en-US&query="+title+"&page=1&include_adult=false";

            $.ajax({
                url: queryURL,
                method: "GET"
                })
                //We store all of the retrieved data inside of an object called "response"
                .then(function(response) {
                    //Log the resulting object
                    //console.log(response.results[0].original_language);
                    addButtonsWithMovieInfo(response);
    
                });
                $("#inputMovie").val("");

        });
        
      // searchYoutube("jurassic+galaxy");
        

       


    
});


function searchYoutube(search)
{
   //var resultId="";
   var APIKey = "AIzaSyBtp6rXtBjreYY-3-sZ3LntzY6ptXDnhA8";
   var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q="+search+"+trailer&type=video&key=" + APIKey;
   console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }) 
      .then(function(response) {        
        
        resultId = response.items[0].id.videoId.toString();
       // console.log(resultId.toString());
        //console.log(resultY);
         
      });
      //return resultId;

}


function playYoutube(event) {

    var target = event.currentTarget.id;
    var movieName = event.currentTarget.value.trim();
    var infoNumber= target.substring(10);
    var dataId = $("#"+target).attr("data-id");
    
    var queryURL= "https://api.themoviedb.org/3/movie/"+dataId+"/videos?api_key="+APIKey+"&language=en-US";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        
        if(response.results.length===0)
        {
             searchYoutube(movieName);
            //console.log(resultId);
             link= "https://www.youtube.com/embed/"+resultId+"?autoplay=1";
             $("#youtube").attr("src",link);
             //console.log("from youtube API");
        }else{
            youtubeId = response.results[0].key; 
             link = "https://www.youtube.com/embed/"+youtubeId+"?autoplay=1";
             $("#youtube").attr("src",link);
        }
        });

        $(".overview").hide();
        // for(var i=0;i<10;i++)
        // {
        //    $(".movieInfo"+i).hide();
        // }
        
        $(".movieInfo"+infoNumber).show();
        
        
        
}



function addButtonsWithMovieInfo(response) {

    var count =0;
    for(var i=0;i<10+count;i++)
    {
            if(response.results[i].original_language==="en")   
            {
            var year =$("<div>");    
            var newDiv=$("<div>");
            var infoTitle= $("<div>");
            var infoDiv= $("<div>");
            var poster = $("<img>");
            var newButton=$("<button>");
            $(".buttonBox").append(newDiv);
            newDiv.append(newButton);
            newButton.text(response.results[i].original_title);
            newButton.attr("value",response.results[i].original_title.trim());
            newButton.attr("id","nowPlaying"+i);
            newButton.addClass("col-md-12 btn btn-outline-primary nowPlayingButton");
            newButton.attr("data-id",response.results[i].id);
            
            //These lines post a poster under movieInfo class
            $(".movieInfo").append(poster);
            poster.attr("src","https://image.tmdb.org/t/p/w185"+response.results[i].poster_path);
            poster.addClass("movieInfo"+i+" overview");
            //These lines post a title under poster in movieInfo class
            $(".movieInfo").append(infoTitle);
            infoTitle.text(response.results[i].original_title+" Storyline: ");
            infoTitle.addClass("movieInfo"+i+" overview");
            //These lines post a movie overview under movie title in movieInfo class
            $(".movieInfo").append(infoDiv);
            infoDiv.text(response.results[i].overview);
            infoDiv.addClass("movieInfo"+i+" info overview");
            $(".movieInfo"+i).hide();
            }else{
                count++;
            }
    }



}




/* <script src="https://www.gstatic.com/firebasejs/5.8.6/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjOxb1aI7qoKCf---a-nkywc2oOXxov44",
    authDomain: "movieshuffle-576b5.firebaseapp.com",
    databaseURL: "https://movieshuffle-576b5.firebaseio.com",
    projectId: "movieshuffle-576b5",
    storageBucket: "movieshuffle-576b5.appspot.com",
    messagingSenderId: "358540179940"
  };
  firebase.initializeApp(config);
</script> */