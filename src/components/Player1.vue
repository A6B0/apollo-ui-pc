<template>
  <video
    id="my-player1"
    class="video-js"
    controls
    preload="auto"
    width="420"
    height="345"
    data-setup='{}'>
    <source src='rtmp://101.201.119.21:1935/hls/test1' type='rtmp/flv'/>
  </video>
</template>

<script>
  import videojs from "video.js"
  import 'video.js/dist/video-js.css'
  export default {
    name: 'Player',
    mounted: function () {
      var options = {};

      var player = videojs('my-player1', options, function onPlayerReady() {
        videojs.log('Your player is ready!');
        // In this context, `this` is the player that was created by Video.js.
        this.play();
        // How about an event listener?
        this.on('ended', function() {
          videojs.log('Awww...over so soon?!');
        });
      });
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

