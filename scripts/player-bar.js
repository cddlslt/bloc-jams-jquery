$( document ).ready(function() {
  $('button#play-pause').click(function() {
    player.playPause();
    $(this).attr('playState', player.playState);
  });

  $('button#next').click( function() {
    if (player.playState !== 'playing') {return; }

    const CURRENT_SONG_INDEX = album.songs.indexOf(player.currentlyPlaying);
    const NEXT_SONG_INDEX = CURRENT_SONG_INDEX + 1;
    if (NEXT_SONG_INDEX >= album.songs.length) {return; }

    const NEXT_SONG = album.songs[NEXT_SONG_INDEX];
    player.playPause(NEXT_SONG);
  });

  $('button#previous').click( function() {
    if (player.playState !== 'playing') {return; }

    const CURRENT_SONG_INDEX = album.songs.indexOf(player.currentlyPlaying);
    var previousSongIndex = CURRENT_SONG_INDEX - 1;
    if (CURRENT_SONG_INDEX === 0) {
      previousSongIndex = album.songs.length - 1;
     }

    var previousSong = album.songs[previousSongIndex];
    player.playPause(previousSong);
  });

  $('#time-control input').on('input', function (event) {
    player.skipTo(event.target.value);
  });

  $('#volume-control input').on('input', function (event) {
    player.setVolume(event.target.value);
  });

  setInterval( () => {
    const CURRENT_TIME = player.getTime();
    const DURATION = player.getDuration();
    const PERCENT = (CURRENT_TIME / DURATION) * 100;
    $('#time-control .current-time').text(prettyTime(CURRENT_TIME));
    $('#time-control input').val(PERCENT);
    $('#time-control .total-time').text( DURATION );
  }, 1000);
});
