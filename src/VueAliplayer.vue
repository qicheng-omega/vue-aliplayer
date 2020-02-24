<template>
  <div class="prism-player" :id="playerId" :style="playStyle"></div>
</template>

<script>
  export default {
    name: "Aliplayer",
    props: {
      playStyle: {
        type: String,
        default: ""
      },
      aliplayerSdkPath: {
        // Aliplayer 代码的路径
        type: String,
        default: "//g.alicdn.com/de/prismplayer/2.6.0/aliplayer-min.js"
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      isLive: {
        type: Boolean,
        default: false
      },
      playsinline: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "320px"
      },
      controlBarVisibility: {
        type: String,
        default: "always"
      },
      useH5Prism: {
        type: Boolean,
        default: false
      },
      useFlashPrism: {
        type: Boolean,
        default: false
      },
      vid: {
        type: String,
        default: ""
      },
      playauth: {
        type: String,
        default: ""
      },
      source: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      format: {
        type: String,
        default: "m3u8"
      },
      skinLayout: {
        type: Array,
        default: function () {
          return []
        }
      },
      x5_video_position: {
        type: String,
        default: "top"
      },
      x5_type: {
        type: String,
        default: "h5"
      },
      x5_fullscreen: {
        type: Boolean,
        default: false
      },
      x5_orientation: {
        type: Number,
        default: 2
      },
      autoPlayDelay: {
        type: Number,
        default: 0
      },
      autoPlayDelayDisplayText: {
        type: String
      }
    },
    data() {
      return {
        playerId: "aliplayer_" + Math.random().toString(36).substr(2),
        scriptTagStatus: 0,
        isReload: false,
        instance: null
      };
    },
    created() {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2;
        this.initAliplayer();
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag();
      }
    },
    mounted() {
      if (window.Aliplayer !== undefined) {
        // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
        this.scriptTagStatus = 2;
        this.initAliplayer();
      } else {
        // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
        this.insertScriptTag();
      }
    },
    methods: {
      insertScriptTag() {
        const _this = this;
        let playerScriptTag = document.getElementById("playerScriptTag");
        // 如果这个tag不存在，则生成相关代码tag以加载代码
        if (playerScriptTag === null) {
          playerScriptTag = document.createElement("script");
          playerScriptTag.type = "text/javascript";
          playerScriptTag.src = this.aliplayerSdkPath;
          playerScriptTag.id = "playerScriptTag";
          let s = document.getElementsByTagName("head")[0];
          s.appendChild(playerScriptTag);
        }
        if (playerScriptTag.loaded) {
          _this.scriptTagStatus++;
        } else {
          playerScriptTag.addEventListener("load", () => {
            _this.scriptTagStatus++;
            playerScriptTag.loaded = true;
            _this.initAliplayer();
          });
        }
        _this.initAliplayer();
      },
      initAliplayer() {
        const _this = this;
        const _this2 = this;
        const _this3 = this;
        // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
        if (
          _this.scriptTagStatus === 2 &&
          (_this.instance === null || _this.reloadPlayer)
        ) {
          _this.instance && _this.instance.dispose();

          document.querySelector("#" + _this.playerId).innerHTML = "";

          // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
          // 所以，我们只能在 nextTick 里面初始化 Aliplayer
          _this.$nextTick(() => {
            _this.instance = window.Aliplayer({
              id: _this.playerId,
              autoplay: _this.autoplay,
              isLive: _this.isLive,
              playsinline: _this.playsinline,
              format: _this.format,
              width: _this.width,
              height: _this.height,
              controlBarVisibility: _this.controlBarVisibility,
              useH5Prism: _this.useH5Prism,
              useFlashPrism: _this.useFlashPrism,
              vid: _this.vid,
              playauth: _this.playauth,
              source: _this.source,
              cover: _this.cover,
              skinLayout: _this.skinLayout,
              x5_video_position: _this.x5_video_position,
              x5_type: _this.x5_type,
              x5_fullscreen: _this.x5_fullscreen,
              x5_orientation: _this.x5_orientation,
              autoPlayDelay: _this.autoPlayDelay,
              autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText
            });

            // 绑定事件，当 AliPlayer 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
            _this.instance.on("ready", () => {
              this.$emit("ready", _this.instance);
            });

            _this.instance.on("play", () => {
              this.$emit("play", _this.instance);
            });

            _this.instance.on("pause", () => {
              this.$emit("pause", _this.instance);
            });

            _this.instance.on("ended", () => {
              this.$emit("ended", _this.instance);
            });

            _this.instance.on("liveStreamStop", () => {
              this.$emit("liveStreamStop", _this.instance);
            });

            _this.instance.on("m3u8Retry", () => {
              this.$emit("m3u8Retry", _this.instance);
            });

            _this.instance.on("hideBar", () => {
              this.$emit("hideBar", _this.instance);
            });

            _this.instance.on("waiting", () => {
              this.$emit("waiting", _this.instance);
            });

            _this.instance.on("snapshoted", () => {
              this.$emit("snapshoted", _this.instance);
            });

            _this.instance.on("timeupdate", () => {
              _this2.$emit("timeupdate", _this.instance);
            });

            _this.instance.on("requestFullScreen", () => {
              _this2.$emit("requestFullScreen", _this.instance);
            });

            _this.instance.on("cancelFullScreen", () => {
              _this2.$emit("cancelFullScreen", _this.instance);
            });

            _this.instance.on("error", () => {
              _this2.$emit("error", _this.instance);
            });

            _this.instance.on("startSeek", () => {
              _this2.$emit("startSeek", _this.instance);
            });

            _this.instance.on("completeSeek", () => {
              _this2.$emit("completeSeek", _this.instance);
            });
          });
        }
      },
      /**
       * 播放视频
       */
      play: function() {
        this.instance.play();
      },
      /**
       * 暂停视频
       */
      pause: function() {
        this.instance.pause();
      },
      /**
       * 重播视频
       */
      replay: function() {
        this.instance.replay();
      },
      /**
       * 跳转到某个时刻进行播放
       * @argument time 的单位为秒
       */
      seek: function(time) {
        this.instance.seek(time);
      },
      /**
       * 获取当前时间 单位秒
       */
      getCurrentTime: function() {
        return this.instance.getCurrentTime();
      },
      /**
       *获取视频总时长，返回的单位为秒
       * @returns 返回的单位为秒
       */
      getDuration: function() {
        return this.instance.getDuration();
      },
      /**
      获取当前的音量，返回值为0-1的实数ios和部分android会失效
       */
      getVolume: function() {
        return this.instance.getVolume();
      },
      /**
      设置音量，vol为0-1的实数，ios和部分android会失效
       */
      setVolume: function(vol) {
        this.instance.setVolume(vol);
      },
      /**
       *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
       *@argument url 视频地址
       *@argument time 跳转到多少秒
       */
      loadByUrl: function(url, time) {
        this.instance.loadByUrl(url, time);
      },
      /**
       * 设置播放速度
       *@argument speed 速度
       */
      setSpeed: function(speed) {
        this.instance.setSpeed(speed);
      },
      /**
       * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
       *@argument w 播放器宽度
       *@argument h 播放器高度
       */
      setPlayerSize: function(w, h) {
        this.instance.setPlayerSize(w, h);
      },
      /**
       * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
       *@argument vid 视频id
       *@argument playauth 播放凭证
       */
      reloaduserPlayInfoAndVidRequestMts: function(vid, playauth) {
        this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
      },
      reloadPlayer: function() {
        this.isReload = true;
        this.initAliplayer();
        this.isReload = false;
      }
    }
  };
</script>

<style>
  /*@import url(//g.alicdn.com/de/prismplayer/2.5.0/skins/default/aliplayer-min.css);*/
</style>

<style>
  .prism-player .prism-big-play-btn {
    /*background: url(img/play.png) no-repeat;*/
    background-size: contain;
    width: 63px;
    height: 63px;
  }
  .prism-player .prism-big-play-btn:hover {
    cursor: pointer;
    border-style: solid;
    border-width: 2px;
    border-radius: 63px;
    border-color: #00c1de;
  }
  .prism-player .prism-play-btn {
    width: 32px;
    height: 32px;
    /*background: url(img/smallplay.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-play-btn:hover {
    /*background: url(img/smallplayhover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
    color: #00c1de;
  }
  .prism-player .prism-live-display {
    width: 56px;
    height: 19px;
    /*background: url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -186px -2px no-repeat;*/
  }
  .prism-player .prism-play-btn.playing {
    /*background: url(img/smallpause.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-play-btn.playing:hover {
    /*background: url(img/smallpausehover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-fullscreen-btn {
    width: 32px;
    height: 32px;
    /*background: url(img/fullscreen.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-fullscreen-btn:hover {
    /*background: url(img/fullscreenhover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-fullscreen-btn.fullscreen {
    /*background: url(img/smallscreen.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-fullscreen-btn.fullscreen:hover {
    /*background: url(img/smallscreenhover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-volume {
    position: relative;
  }
  .prism-player .prism-volume .volume-control-icon,
  .prism-player .prism-volume .volume-icon {
    width: 32px;
    height: 32px;
    /*background: url(img/volume.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-volume .volume-control-icon:hover,
  .prism-player .prism-volume .volume-icon:hover {
    /*background: url(img/volumehover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-volume .volume-control-icon.mute,
  .prism-player .prism-volume .volume-icon.mute {
    /*background: url(img/volumemute.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-volume .volume-control-icon.mute:hover,
  .prism-player .prism-volume .volume-icon.mute:hover {
    /*background: url(img/volumemutehover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-volume .volume-control {
    position: absolute;
    bottom: 38px;
    background: rgba(0, 0, 0, 0.5);
    left: -4px;
    height: 130px;
    width: 36px;
    display: none;
  }
  .prism-player .prism-volume .volume-control:hover {
    cursor: pointer;
  }
  .prism-player .prism-volume .volume-control .volume-control-icon {
    position: absolute;
    bottom: 0;
    left: 8px;
    width: 26px;
    height: 26px;
  }
  .prism-player .prism-volume .volume-range {
    width: 2px;
    height: 76px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 50%;
    bottom: 26px;
    border-radius: 1px;
  }
  .prism-player .prism-volume .volume-value {
    width: 100%;
    height: 0%;
    background: #00c1de;
    position: absolute;
    border-radius: 1px;
    bottom: 0;
  }
  .prism-player .prism-volume .volume-cursor {
    position: absolute;
    left: -4px;
    bottom: 0;
    background: #fff;
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }
  .prism-player .prism-volume .volume-cursor:hover {
    background: #00c1de;
  }
  .prism-player .prism-volume .hover .volume-range {
    width: 4px;
  }
  .prism-player .prism-volume .hover .volume-cursor {
    left: -5px;
    width: 14px;
    height: 14px;
    border-radius: 14px;
  }
  .prism-player .prism-animation {
    width: 64px;
    height: 64px;
    border-radius: 64px;
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .prism-player .prism-play-animation {
    /*background: url(img/playanimation.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-pause-animation {
    /*background: url(img/pauseanimation.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .play-apply-animation {
    -moz-animation: prismplayanimation 1s 1;
    -webkit-animation: prismplayanimation 1s 1;
    -o-animation: prismplayanimation 1s 1;
  }
  @keyframes prismplayanimation {
    0% {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      opacity: 0;
    }
    50% {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      opacity: 1;
    }
    100% {
      width: 76px;
      height: 76px;
      border-radius: 76px;
      opacity: 0;
    }
  }
  .prism-player {
    background-color: #000;
    position: relative;
  }
  .prism-player .prism-ErrorMessage,
  .prism-player .prism-cover {
    width: 100%;
    height: 100%;
    background-color: #000;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;
  }
  .prism-player a {
    text-decoration: none;
  }
  .prism-player .x5-full-screen {
    object-fit: fill;
    object-position: 50% 50%;
  }
  .prism-player .x5-top-left {
    object-fit: contain;
    object-position: 0 0;
  }
  .prism-player .prism-ErrorMessage {
    z-index: 99;
    display: none;
  }
  .prism-player .prism-ErrorMessage .prism-error-content {
    margin-top: 20px;
    padding: 0 5px;
  }
  .prism-player .prism-ErrorMessage .prism-error-content p {
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1.5px;
    border-bottom-color: rgba(255, 255, 255, 0.15);
    border-bottom-style: dotted;
    text-align: center;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation a {
    width: 72px;
    height: 32px;
    line-height: 32px;
    vertical-align: top;
    display: inline-block;
    margin-left: 10px;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh {
    color: #21c5e0;
    border: 1px solid #21c5e0;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:hover {
    color: #05d3f5;
    border-color: #05d3f5;
    cursor: pointer;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:active {
    color: #026a7b;
    border-color: #026a7b;
  }
  .prism-player .prism-ErrorMessage .prism-error-operation .prism-button-orange:visited {
    color: #05d3f5;
  }
  .prism-player .prism-ErrorMessage .prism-detect-info {
    color: #fff;
    font-size: 10px;
  }
  .prism-player .prism-ErrorMessage .prism-detect-info p {
    padding: 0 5px;
    word-break: break-all;
    margin: 0 0 4px;
  }
  .prism-player .prism-ErrorMessage .prism-detect-info span.info-label {
    display: inline-block;
    font-weight: 700;
  }
  .prism-player .prism-ErrorMessage .prism-detect-info span.info-content {
    color: gray;
  }
  .prism-player .prism-big-play-btn {
    z-index: 1000;
  }
  .prism-player .prism-controlbar {
    width: 100%;
    height: 48px;
    position: relative;
    z-index: 1;
    font-size: 14px;
  }
  .prism-player .prism-controlbar .prism-controlbar-bg {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 44px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .prism-player .prism-time-display {
    height: 44px;
    line-height: 44px;
    color: #a4aab3;
    font-size: 12px;
  }
  .prism-player .prism-time-display .current-time {
    color: #fff;
  }
  .prism-player .prism-live-time-display {
    height: 44px;
    line-height: 44px;
    color: #a4aab3;
    font-size: 12px;
  }
  .prism-player .prism-live-time-display span {
    display: inline;
  }
  .prism-player .prism-live-time-display .live-text {
    margin-left: 5px;
    color: #efeff4;
  }
  .prism-player .prism-live-time-display .current-time {
    color: #fff;
  }
  .prism-player .prism-liveshift-progress,
  .prism-player .prism-progress {
    width: 100%;
    height: 4px;
    background: rgba(195, 197, 198, 0.5);
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.06);
    position: relative;
    cursor: pointer;
  }
  .prism-player .prism-liveshift-progress .prism-progress-time,
  .prism-player .prism-progress .prism-progress-time {
    position: absolute;
    top: -25px;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    color: #fff;
    font-size: 14px;
    border-radius: 7.5px;
    padding: 0 6px;
    text-align: center;
  }
  .prism-player .prism-liveshift-progress .prism-progress-loaded,
  .prism-player .prism-progress .prism-progress-loaded {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #c3c5c6;
  }
  .prism-player .prism-liveshift-progress .prism-progress-played,
  .prism-player .prism-progress .prism-progress-played {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #00c1de;
  }
  .prism-player .prism-liveshift-progress .prism-progress-cursor,
  .prism-player .prism-progress .prism-progress-cursor {
    position: absolute;
    top: -5px;
    border: 10px solid #00c1de;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    background: #00c1de;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px 0, rgba(0, 0, 0, 0.1) 1px 1px 1px 0, rgba(0, 0, 0, 0.05) 0 -1px 1px 0 inset;
    -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px 0, rgba(0, 0, 0, 0.1) 1px 1px 1px 0,
    rgba(0, 0, 0, 0.05) 0 -1px 1px 0 inset;
    display: none;
  }
  .prism-player .prism-liveshift-progress .prism-progress-cursor:hover,
  .prism-player .prism-progress .prism-progress-cursor:hover {
    background: #00c1de;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 1px 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 1px 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05);
  }
  .prism-player .prism-progress {
    cursor: pointer;
  }
  .prism-player .prism-progress:hover {
    height: 10px;
  }
  .prism-player .prism-liveshift-progress .prism-enable-liveshift {
    cursor: pointer;
    position: absolute;
    background: #fff;
    height: 5px;
  }
  .prism-player .prism-liveshift-progress .prism-enable-liveshift:hover {
    height: 10px;
  }
  .prism-player .prism-liveshift-progress .prism-liveshift-seperator {
    width: 2px;
    height: 15px;
    background: #fff;
    position: absolute;
    right: 0;
    top: -5px;
  }
  .prism-player .prism-loading {
    width: 55px;
    height: 55px;
    margin-top: -27px !important;
    margin-left: -27px !important;
  }
  .prism-player .prism-loading .circle {
    background-color: rgba(0, 0, 0, 0);
    border: 5px solid;
    border-color: rgba(0, 193, 222, 0.2) rgba(0, 193, 222, 0.5) rgba(0, 193, 222, 0.7) rgba(0, 193, 222, 0.1);
    opacity: 0.9;
    border-radius: 50px;
    width: 45px;
    height: 45px;
    margin: 0 auto;
    -moz-animation: spinoffPulse 0.9s infinite linear;
    -webkit-animation: spinoffPulse 0.9s infinite linear;
  }
  .prism-player .prism-hide {
    display: none;
  }
  .prism-player .prism-snapshot-btn {
    width: 32px;
    height: 32px;
    /*background: url(img/snapshot.png) no-repeat;*/
    background-size: contain;
  }
  .prism-player .prism-snapshot-btn:hover {
    /*background: url(img/snapshothover.png) no-repeat;*/
    background-size: contain;
    cursor: pointer;
  }
  .prism-player .prism-snapshot-btn:active {
    displa: block;
  }
  .prism-player .prism-info-display {
    width: 100%;
    color: #fff;
    text-align: center;
    top: 50%;
    position: absolute;
    z-index: 900;
    height: 44px;
    line-height: 28px;
    font-size: 16px;
    padding: 10px 12px;
  }
  .prism-player .prism-info-display span {
    color: #00c1de;
  }
  .prism-player .prism-info-left-bottom {
    width: auto !important;
    top: auto !important;
    bottom: 40px;
    left: 52% !important;
    text-align: left;
  }
  .prism-player .prism-auto-stream-selector {
    position: absolute;
    bottom: 50%;
    width: 100%;
    margin: auto;
    color: #efeff4;
    display: none;
  }
  .prism-player .prism-auto-stream-selector p.tip-text {
    text-align: center;
  }
  .prism-player .prism-auto-stream-selector .operators {
    width: 100px;
    margin: auto;
  }
  .prism-player .prism-button-cancel {
    font-size: 16px;
    border: 1px solid;
    padding: 2px 5px;
    color: #fffa8;
    margin-left: 5px;
    background: 0 0;
  }
  .prism-player .prism-button-ok {
    font-size: 16px;
    border: 1px solid #fff;
    padding: 2px 5px;
    color: #fff;
    background: 0 0;
  }
  .prism-player .prism-button-cancel:hover,
  .prism-player .prism-button-ok:hover {
    color: #f5f5f5;
  }
  @-moz-keyframes spinoffPulse {
    0% {
      -moz-transform: rotate(0);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spinoffPulse {
    0% {
      -webkit-transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  :-webkit-full-screen {
    width: 100% !important;
    height: 100% !important;
  }
  :-moz-full-screen {
    width: 100% !important;
    height: 100% !important;
  }
  :-ms-full-screen {
    width: 100% !important;
    height: 100% !important;
  }
  :-ms-fullscreen {
    width: 100% !important;
    height: 100% !important;
  }
  :fullscreen {
    width: 100% !important;
    height: 100% !important;
  }
  body.prism-full-window {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-y: auto;
  }
  .prism-fullscreen {
    position: fixed;
    overflow: hidden;
    z-index: 99999;
    left: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  .prism-button {
    cursor: pointer;
    text-align: center;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 0.5em;
    -moz-border-radius: 0.5em;
    border-radius: 0.5em;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  .prism-button-orange {
    color: #a56117;
    border: 1px solid #a56117;
  }
  .prism-button-orange:active,
  .prism-button-orange:hover {
    color: #d67400;
    border-color: #d67400;
  }
  .prism-button-orange:visited {
    color: #d67400;
  }
  .prism-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .prism-width90 {
    width: 90%;
  }
  .prism-stream-selector {
    font-size: 16px;
    position: relative;
    line-height: 32px;
  }
  .prism-stream-selector .current-stream-selector {
    text-align: center;
    width: 70px;
    display: none;
    color: #efeff4;
  }
  .prism-stream-selector .current-stream-selector:hover {
    cursor: pointer;
    color: #00c1de;
  }
  .prism-stream-selector .stream-selector-tip {
    color: #fff;
    text-align: center;
    padding: 2px 5px;
    display: none;
    position: absolute;
    bottom: 61.5px;
    white-space: nowrap;
    left: 43%;
    font-size: 18px;
  }
  .prism-stream-selector .stream-selector-list {
    position: absolute;
    bottom: 38px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: #efeff4;
    padding: 5px 5px 0;
    width: 70px;
    display: none;
  }
  .prism-stream-selector .stream-selector-list li {
    list-style-type: none;
    text-align: center;
    white-space: nowrap;
    padding: 0 2px;
    line-height: 24px;
  }
  .prism-stream-selector .stream-selector-list li span.current,
  .prism-stream-selector .stream-selector-list li.current {
    color: #00c1de;
  }
  .prism-stream-selector .stream-selector-list li:hover {
    cursor: pointer;
    color: #00c1de;
  }
  .prism-speed-selector {
    font-size: 16px;
    position: relative;
    line-height: 32px;
  }
  .prism-speed-selector .current-speed-selector {
    color: #efeff4;
    text-align: center;
    width: 60px;
  }
  .prism-speed-selector .current-speed-selector:hover {
    cursor: pointer;
    color: #00c1de;
  }
  .prism-speed-selector .speed-selector-list {
    position: absolute;
    bottom: 38px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: #efeff4;
    padding: 5px 5px 0;
    display: none;
  }
  .prism-speed-selector .speed-selector-list li {
    list-style-type: none;
    text-align: center;
    white-space: nowrap;
    padding: 0 2px;
    line-height: 24px;
  }
  .prism-speed-selector .speed-selector-list li span.current,
  .prism-speed-selector .speed-selector-list li.current {
    color: #00c1de;
  }
  .prism-speed-selector .speed-selector-list li:hover {
    cursor: pointer;
    color: #00c1de;
  }
</style>
