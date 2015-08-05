//Searching artists

function searchArtist(event) {
  event.preventDefault();
  console.log('Búsqueda %s', $('.artist_search').val())
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query=' + $('.artist_search').val());
  
  console.log('searching artist...');
  $('.artist_search').val('');

  function handleArtists(artistList) {
    
    console.log("artist list %j", artistList);

    $('.artists_list').empty();
    artistList.artists.items.forEach(function listOfArtists(artist) {
      
      var html = '<li class="each_artist" dataId="'+ artist.id +'" dataName="'+ artist.name + '">' + artist.name;
      
      if (artist.images.length > 0) {
        var img = '<img src=' + artist.images[0].url + ' class="artist_image">'
      } else {
        var img = ''
      };

      var albums_button = '<button type="button" class="albums_button btn btn-primary btn-lg" data-toggle="modal" data-target="#albumsModal">Albums</button>';
      var artist_li = html + img + albums_button + '</li>'

      $('.artists_list').append(artist_li);


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

//Searchuing albums of an artist

function searchAlbums(event) {
  event.preventDefault();
  var artistId = $(this).parent().attr("dataId");
  var artistName = $(this).parent().attr("dataName");
  $('.modal-title').empty();
  $('.modal-title').append('Albums of ' + artistName);


  console.log('Buscando los albumes de %s', artistName);

  var request = $.get('https://api.spotify.com/v1/artists/'+ artistId + '/albums');
  function showAlbums(albumsList){
     console.log("artist list of albums %j", albumsList);
     $('.modal-body').empty();
     albumsList.items.forEach(function listOfAlbums(album) {
       
       
       if (album.images.length > 0) {
         var img = '<p class="eachAlbum" dataId="'+ album.id +'" dataName="'+ album.name + '">' + '<img src=' + album.images[0].url + ' class="album_image">'
       } else {
         var img = ''
       };
       var  name = ' ' + album.name + '</p>';

       var tracksButton = '<button type="button" class="tracksButton btn btn-primary btn-lg" data-toggle="modal" data-target="#tracksModal">Tracks</button>';
       var artist_li = img + tracksButton +name 

       $('.modal-body').append(artist_li);


     });

  }

  function handleError(err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(showAlbums);
  request.fail(handleError);
}

$('.results').on('click', '.albums_button', searchAlbums);


//Searching tracks in albums

function searchTracks(event) {
  event.preventDefault();
  var albumId = $(this).parent().attr("dataId");
  var albumName = $(this).parent().attr("dataName");
  $('.modal-title').empty();
  $('.modal-title').append('Tracks of ' + albumName);


  console.log('Buscando los tracks de %s', albumName);

  var request = $.get('https://api.spotify.com/v1/albums/'+ albumId + '/tracks');
  function showTracks(tracksList){
     console.log("Tracks of album %j", tracksList);
     $('.modal-body_tracks').empty();
     tracksList.items.forEach(function listOfTracks(track) {
       

     });

  }

  function handleError(err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(showTracks);
  request.fail(handleError);
}



$('#albumsModal').on('click', '.tracksButton', searchTracks);
//$('#albumsModal').on('click', '.eachAlbum', $("#tracksModal").modal('show'));



$('#openBtn').click(function(){
  $('#myModal').modal({show:true})
});

$('.modal').on('hidden.bs.modal', function( event ) {
  $(this).removeClass( 'fv-modal-stack' );
  $('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) - 1 );
  });

$( '.modal' ).on( 'shown.bs.modal', function ( event ) {
                   
  // keep track of the number of open modals
 
 if ( typeof( $('body').data( 'fv_open_modals' ) ) == 'undefined' )
 {
   $('body').data( 'fv_open_modals', 0 );
 }
                   
                     
// if the z-index of this modal has been set, ignore.
    
  if ( $(this).hasClass( 'fv-modal-stack' ) )
  {
    return;
  }

$(this).addClass( 'fv-modal-stack' );

$('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) + 1 );

$(this).css('z-index', 1040 + (10 * $('body').data( 'fv_open_modals' )));

$( '.modal-backdrop' ).not( '.fv-modal-stack' )
    .css( 'z-index', 1039 + (10 * $('body').data( 'fv_open_modals' )));


$( '.modal-backdrop' ).not( 'fv-modal-stack' )
    .addClass( 'fv-modal-stack' ); 

                 });

        
