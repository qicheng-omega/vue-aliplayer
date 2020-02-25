<template>
  <div id="app">
    <h1>Vue-AliPlayer</h1>
    <h2>A Vue 2.x component of <a href="https://github.com/slacrey/vue-aliplayer" target="_blank">Aliplayer</a></h2>
    <github-badge slug="slacrey/vue-aliplayer" />
    <ali-player :source="aplayer.source" :autoplay="true" :x5_fullscreen="true" :vid="aplayer.vid" :playauth="aplayer.playauth" ref="player"
                @play="playerEmit($event, 'play')"
                @pause="playerEmit($event, 'pause')"
                @replay="playerEmit($event, 'replay')"
                @ended="playerEmit($event, 'ended')"
                @ready="playerEmit($event, 'ready')"
                @liveStreamStop="playerEmit($event, 'liveStreamStop')"
                @waiting="playerEmit($event, 'waiting')"
                @error="playerEmit($event, 'error')"
                @startSeek="playerEmit($event, 'startSeek')"
                @requestFullScreen="playerEmit($event, 'requestFullScreen')"
                @cancelFullScreen="playerEmit($event, 'cancelFullScreen')"
                @completeSeek="playerEmit($event, 'completeSeek')"
    ></ali-player>
    <div style="margin-top:20px;">
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="replay">重播</button>
      <button @click="convert">切换</button>
      <button @click="addition">增音</button>
      <button @click="subtraction">減音</button>
    </div>
    <button @click="tttt = !tttt">減音</button>
  </div>
</template>

<script>
  import VueAliplayer from "../src/VueAliplayer.vue";
  import GitHubBadge from "vue-github-badge";

  export default {
    data() {
      return {
        tttt :false,
        streamMap:{
          flvlld: "http://testplay.30ro.com/testapp/3c1771_1100_lld.flv?auth_key=1582606124-0-0-b6d4d0229ef22736dc5fa375781c4e28",
          lld: "rtmp://testplay.30ro.com/testapp/3c1771_1100_lld?auth_key=1582606124-0-0-6953af574a9b76b7c801484889f261ae",
          rtmpUrl: "rtmp://testplay.30ro.com/testapp/3c1771_1100?auth_key=1582606124-0-0-812aa404fe0b9237effce42e2db45cb1",
          flvUrl: "http://testplay.30ro.com/testapp/3c1771_1100.flv?auth_key=1582606124-0-0-9c93b3de16f63cfb55a2a74d034b5253",
          lhd: "rtmp://testplay.30ro.com/testapp/3c1771_1100_lhd?auth_key=1582606124-0-0-ede2db96a0c8c0fc86f79a65ec25d8b3",
          lud: "rtmp://testplay.30ro.com/testapp/3c1771_1100_lud?auth_key=1582606124-0-0-c07621dc0029f1e1514ea6bdb0fac96a",
          flvlsd: "http://testplay.30ro.com/testapp/3c1771_1100_lsd.flv?auth_key=1582606124-0-0-1d36ae07ebf03a7e2057a034aabc2379",
          lsd: "rtmp://testplay.30ro.com/testapp/3c1771_1100_lsd?auth_key=1582606124-0-0-aaa3fde922e947be2a310e3b25b465d8",
          flvlud: "http://testplay.30ro.com/testapp/3c1771_1100_lud.flv?auth_key=1582606124-0-0-bf5621718f34eaf94b87df1bbd490bdc",
          flvlhd: "http://testplay.30ro.com/testapp/3c1771_1100_lhd.flv?auth_key=1582606124-0-0-1d6f59ce1d40b77263e0b3a53cec2744"
        },
        aplayer: {
          // source: this.streamMap.flvlsd,
          source: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
          vid: "8db6e5c7ff5f4257b41e2487ec61d592",
          playauth:
            "eyJTZWN1cml0eVRva2VuIjoiQ0FJUzN3SjFxNkZ0NUIyeWZTaklxYXIzQm8zVm9lZGlqNWU1YW12OGswY3hPYmREaDdEQXRqejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsck1xRnNFYkZCMlpNcHNwc2M4Sm9GUCtKcExGc3QySjZyOEpqc1ZsMDRWdmxsMnBzdlhKYXNEVkVma3VFNVhFTWlJNS8wMGU2TC8rY2lyWVhEN0JHSmFWaUpsaFE4MEtWdzJqRjFSdkQ4dFhJUTBRazYxOUszemRaOW1nTGlidWkzdnhDa1J2MkhCaWptOHR4cW1qL015UTV4MzFpMXYweStCM3dZSHRPY3FjYThCOU1ZMVdUc3Uxdm9oemFyR1Q2Q3BaK2psTStxQVU2cWxZNG1YcnM5cUhFa0ZOd0JpWFNaMjJsT2RpTndoa2ZLTTNOcmRacGZ6bjc1MUN0L2ZVaXA3OHhtUW1YNGdYY1Z5R0ZOLzducFNVUmJ2M2I0eGxMZXVrQVJtWGpJRFRiS3VTbWhnL2ZIY1dPRGxOZjljY01YSnFBWFF1TUdxQWRQTDVwZ2lhTTFyOUVQYmRnZmhtaTRBSjVsSHA3TWVNR1YrRGVMeVF5aDBFSWFVN2EwNDR4ckRoRzVnS3NNUWFnQUY2Qzl6eHF3VmdsSEFzTTJXdm11cmk1bFFRUHlYMXdndmJ4Mk91d3BRQmF0SEYrdW8wUnNURzllb2tVZmRMS0lpbkxsYlIvKys1MzlXN3BQM0k0T3h3ZjZIV2FjQTZQZVM2ZmpWQnZhd3BWSE5oNHdYR20rYk8xdUdtTXRraEhiMkExOTZUbEtYT0I4ZStEZUZ5Q1VpcVlrb21KaXdhTytGa0cxOW55SlVBUHc9PSIsIkF1dGhJbmZvIjoie1wiQ2FsbGVyXCI6XCJiY0o0ZFJHRFdRTjJnTEFvTk9nbVpwS0FMNEIxSk55YmNxaThOWkZCOERvPVxcclxcblwiLFwiRXhwaXJlVGltZVwiOlwiMjAxNy0xMC0yNVQwNjo1Mzo0N1pcIixcIk1lZGlhSWRcIjpcIjhkYjZlNWM3ZmY1ZjQyNTdiNDFlMjQ4N2VjNjFkNTkyXCIsXCJTaWduYXR1cmVcIjpcIlFHNTcwTXlrQWxzN1pxS1dTd2ppVStseTJrQT1cIn0iLCJWaWRlb01ldGEiOnsiU3RhdHVzIjoiTm9ybWFsIiwiVmlkZW9JZCI6IjhkYjZlNWM3ZmY1ZjQyNTdiNDFlMjQ4N2VjNjFkNTkyIiwiVGl0bGUiOiJXZUNoYXRfMjAxNzEwMTYxNjMzMTkiLCJDb3ZlclVSTCI6Imh0dHA6Ly92b2QubHVvYm9iYi5jb20vc25hcHNob3QvOGRiNmU1YzdmZjVmNDI1N2I0MWUyNDg3ZWM2MWQ1OTIwMDAwMS5qcGciLCJEdXJhdGlvbiI6NDIwLjB9LCJBY2Nlc3NLZXlJZCI6IlNUUy5IaUJNN2FMOEM4VVJoTU13R2Q1OG9odWtUIiwiUGxheURvbWFpbiI6InZvZC5sdW9ib2JiLmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IkRoZVdWNmJEMVBvN2pQbXJ1TFRDc25kQTFCUE5VTmpOb29iRnVEWnRqaDNlIiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxNTY2OTk1NzgxNzM2OTg3fQ=="
        },
        player: null,
        volume: 1
      };
    },
    mounted() {
      this.aplayer.source = this.streamMap.flvlsd;
      console.log('this.source', this.source);
      const player = this.$refs.player;
      player && player.reloadPlayer();
    },
    methods: {
      playerEmit(event, str) {
          console.log('@playerEmit event::', str, event);
      },
      play() {
        const player = this.$refs.player.instance;
        player && player.play();
      },
      pause() {
        const player = this.$refs.player.instance;
        player && player.pause();
      },
      replay() {
        const player = this.$refs.player.instance;
        player && player.replay();
      },
      convert() {
        this.aplayer.source = this.streamMap.flvlhd
        const player = this.$refs.player;
        player && player.reloadPlayer();
      },
      addition() {
        const player = this.$refs.player.instance;
        const vol = this.volume * 100;
        if(vol >= 0 &&  vol <= 99) {
          this.volume = (vol + 10 )/ 100
        }
        console.log(vol, this.volume);
        player && player.setVolume(this.volume);
      },
      subtraction() {
        const player = this.$refs.player.instance;
        const vol = this.volume * 100;
        if(vol >= 1 &&  vol <= 100) {
          this.volume = (vol - 10 )/ 100
        }
        console.log(vol, this.volume);
        player && player.setVolume(this.volume);
      }
    },
    components: {
      "ali-player": VueAliplayer,
      "github-badge": GitHubBadge
    }
  };
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  .dplayer {
    width: 800px;
    margin: 50px auto;
  }

  h1 {
    font-size: 54px;
    color: #42b983;
    margin: 30px 0 10px;
  }

  h2 {
    font-size: 22px;
    color: #555;
  }

  @media (max-width: 768px) {
    .dplayer {
      width: 90%;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 16px;
    }
  }
</style>
