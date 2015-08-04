function searchArtist(event) {
  event.preventDefault();
  console.log('Búsqueda %s', $('.artist_search').val())
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + $('.artist_search').val());
  
  console.log('searching artist...');
  $('.artist_search').val('');

  function handleArtists(artist_list) {
    
    console.log("artist list %j", artist_list);

    $('.artists_list').empty();
    artist_list.artists.items.forEach(function listOfArtists(artist) {
      
      var html = '<li>' + artist.name + '</li>';
      
      if (artist.images.length > 0) {
        var img = '<img src=' + artist.images[0].url + ' class="artist_image">'
      } else {
        var img = ''
      };

      
      $('.artists_list').append(html).append(img);


    });
  }

  function handleError(err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleArtists);
  request.fail(handleError);
}


$('.search_button').on('click', searchArtist);
$('.artist_search').keyup(function (e) {
  if (e.keyCode == 13) {
    searchArtist(event);
  };
});
