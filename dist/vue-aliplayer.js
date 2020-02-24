(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueAliplayer"] = factory();
	else
		root["VueAliplayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://github.com/qicheng-omega/vue-aliplayer#readme/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(10)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)
__webpack_require__(9)

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(7),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/waittinghsu/SpiderWork/vue-alipayer-prod/src/VueAliplayer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VueAliplayer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09453d1b", Component.options)
  } else {
    hotAPI.reload("data-v-09453d1b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
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
      default: function _default() {
        return [];
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
  data: function data() {
    return {
      playerId: "aliplayer_" + Math.random().toString(36).substr(2),
      scriptTagStatus: 0,
      isReload: false,
      instance: null
    };
  },
  created: function created() {
    if (window.Aliplayer !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      this.initAliplayer();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      this.insertScriptTag();
    }
  },
  mounted: function mounted() {
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
    insertScriptTag: function insertScriptTag() {
      var _this = this;
      var playerScriptTag = document.getElementById("playerScriptTag");
      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (playerScriptTag === null) {
        playerScriptTag = document.createElement("script");
        playerScriptTag.type = "text/javascript";
        playerScriptTag.src = this.aliplayerSdkPath;
        playerScriptTag.id = "playerScriptTag";
        var s = document.getElementsByTagName("head")[0];
        s.appendChild(playerScriptTag);
      }
      if (playerScriptTag.loaded) {
        _this.scriptTagStatus++;
      } else {
        playerScriptTag.addEventListener("load", function () {
          _this.scriptTagStatus++;
          playerScriptTag.loaded = true;
          _this.initAliplayer();
        });
      }
      _this.initAliplayer();
    },
    initAliplayer: function initAliplayer() {
      var _this4 = this;

      var _this = this;
      var _this2 = this;
      var _this3 = this;
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (_this.scriptTagStatus === 2 && (_this.instance === null || _this.reloadPlayer)) {
        _this.instance && _this.instance.dispose();

        document.querySelector("#" + _this.playerId).innerHTML = "";

        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 Aliplayer
        _this.$nextTick(function () {
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
          _this.instance.on("ready", function () {
            _this4.$emit("ready", _this.instance);
          });

          _this.instance.on("play", function () {
            _this4.$emit("play", _this.instance);
          });

          _this.instance.on("pause", function () {
            _this4.$emit("pause", _this.instance);
          });

          _this.instance.on("ended", function () {
            _this4.$emit("ended", _this.instance);
          });

          _this.instance.on("liveStreamStop", function () {
            _this4.$emit("liveStreamStop", _this.instance);
          });

          _this.instance.on("m3u8Retry", function () {
            _this4.$emit("m3u8Retry", _this.instance);
          });

          _this.instance.on("hideBar", function () {
            _this4.$emit("hideBar", _this.instance);
          });

          _this.instance.on("waiting", function () {
            _this4.$emit("waiting", _this.instance);
          });

          _this.instance.on("snapshoted", function () {
            _this4.$emit("snapshoted", _this.instance);
          });

          _this.instance.on("timeupdate", function () {
            _this2.$emit("timeupdate", _this.instance);
          });

          _this.instance.on("requestFullScreen", function () {
            _this2.$emit("requestFullScreen", _this.instance);
          });

          _this.instance.on("cancelFullScreen", function () {
            _this2.$emit("cancelFullScreen", _this.instance);
          });

          _this.instance.on("error", function () {
            _this2.$emit("error", _this.instance);
          });

          _this.instance.on("startSeek", function () {
            _this2.$emit("startSeek", _this.instance);
          });

          _this.instance.on("completeSeek", function () {
            _this2.$emit("completeSeek", _this.instance);
          });
        });
      }
    },

    /**
     * 播放视频
     */
    play: function play() {
      this.instance.play();
    },
    /**
     * 暂停视频
     */
    pause: function pause() {
      this.instance.pause();
    },
    /**
     * 重播视频
     */
    replay: function replay() {
      this.instance.replay();
    },
    /**
     * 跳转到某个时刻进行播放
     * @argument time 的单位为秒
     */
    seek: function seek(time) {
      this.instance.seek(time);
    },
    /**
     * 获取当前时间 单位秒
     */
    getCurrentTime: function getCurrentTime() {
      return this.instance.getCurrentTime();
    },
    /**
     *获取视频总时长，返回的单位为秒
     * @returns 返回的单位为秒
     */
    getDuration: function getDuration() {
      return this.instance.getDuration();
    },
    /**
    获取当前的音量，返回值为0-1的实数ios和部分android会失效
     */
    getVolume: function getVolume() {
      return this.instance.getVolume();
    },
    /**
    设置音量，vol为0-1的实数，ios和部分android会失效
     */
    setVolume: function setVolume(vol) {
      this.instance.setVolume(vol);
    },
    /**
     *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
     *@argument url 视频地址
     *@argument time 跳转到多少秒
     */
    loadByUrl: function loadByUrl(url, time) {
      this.instance.loadByUrl(url, time);
    },
    /**
     * 设置播放速度
     *@argument speed 速度
     */
    setSpeed: function setSpeed(speed) {
      this.instance.setSpeed(speed);
    },
    /**
     * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
     *@argument w 播放器宽度
     *@argument h 播放器高度
     */
    setPlayerSize: function setPlayerSize(w, h) {
      this.instance.setPlayerSize(w, h);
    },
    /**
     * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
     *@argument vid 视频id
     *@argument playauth 播放凭证
     */
    reloaduserPlayInfoAndVidRequestMts: function reloaduserPlayInfoAndVidRequestMts(vid, playauth) {
      this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
    },
    reloadPlayer: function reloadPlayer() {
      this.isReload = true;
      this.initAliplayer();
      this.isReload = false;
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*@import url(//g.alicdn.com/de/prismplayer/2.5.0/skins/default/aliplayer-min.css);*/\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.prism-player .prism-big-play-btn {\n  /*background: url(img/play.png) no-repeat;*/\n  background-size: contain;\n  width: 63px;\n  height: 63px;\n}\n.prism-player .prism-big-play-btn:hover {\n  cursor: pointer;\n  border-style: solid;\n  border-width: 2px;\n  border-radius: 63px;\n  border-color: #00c1de;\n}\n.prism-player .prism-play-btn {\n  width: 32px;\n  height: 32px;\n  /*background: url(img/smallplay.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-play-btn:hover {\n  /*background: url(img/smallplayhover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n  color: #00c1de;\n}\n.prism-player .prism-live-display {\n  width: 56px;\n  height: 19px;\n  /*background: url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -186px -2px no-repeat;*/\n}\n.prism-player .prism-play-btn.playing {\n  /*background: url(img/smallpause.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-play-btn.playing:hover {\n  /*background: url(img/smallpausehover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-fullscreen-btn {\n  width: 32px;\n  height: 32px;\n  /*background: url(img/fullscreen.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-fullscreen-btn:hover {\n  /*background: url(img/fullscreenhover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-fullscreen-btn.fullscreen {\n  /*background: url(img/smallscreen.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-fullscreen-btn.fullscreen:hover {\n  /*background: url(img/smallscreenhover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-volume {\n  position: relative;\n}\n.prism-player .prism-volume .volume-control-icon,\n.prism-player .prism-volume .volume-icon {\n  width: 32px;\n  height: 32px;\n  /*background: url(img/volume.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-volume .volume-control-icon:hover,\n.prism-player .prism-volume .volume-icon:hover {\n  /*background: url(img/volumehover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-volume .volume-control-icon.mute,\n.prism-player .prism-volume .volume-icon.mute {\n  /*background: url(img/volumemute.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-volume .volume-control-icon.mute:hover,\n.prism-player .prism-volume .volume-icon.mute:hover {\n  /*background: url(img/volumemutehover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-volume .volume-control {\n  position: absolute;\n  bottom: 38px;\n  background: rgba(0, 0, 0, 0.5);\n  left: -4px;\n  height: 130px;\n  width: 36px;\n  display: none;\n}\n.prism-player .prism-volume .volume-control:hover {\n  cursor: pointer;\n}\n.prism-player .prism-volume .volume-control .volume-control-icon {\n  position: absolute;\n  bottom: 0;\n  left: 8px;\n  width: 26px;\n  height: 26px;\n}\n.prism-player .prism-volume .volume-range {\n  width: 2px;\n  height: 76px;\n  background: rgba(0, 0, 0, 0.6);\n  position: absolute;\n  left: 50%;\n  bottom: 26px;\n  border-radius: 1px;\n}\n.prism-player .prism-volume .volume-value {\n  width: 100%;\n  height: 0%;\n  background: #00c1de;\n  position: absolute;\n  border-radius: 1px;\n  bottom: 0;\n}\n.prism-player .prism-volume .volume-cursor {\n  position: absolute;\n  left: -4px;\n  bottom: 0;\n  background: #fff;\n  width: 10px;\n  height: 10px;\n  border-radius: 10px;\n}\n.prism-player .prism-volume .volume-cursor:hover {\n  background: #00c1de;\n}\n.prism-player .prism-volume .hover .volume-range {\n  width: 4px;\n}\n.prism-player .prism-volume .hover .volume-cursor {\n  left: -5px;\n  width: 14px;\n  height: 14px;\n  border-radius: 14px;\n}\n.prism-player .prism-animation {\n  width: 64px;\n  height: 64px;\n  border-radius: 64px;\n  opacity: 0;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -ms-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n.prism-player .prism-play-animation {\n  /*background: url(img/playanimation.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-pause-animation {\n  /*background: url(img/pauseanimation.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .play-apply-animation {\n  -moz-animation: prismplayanimation 1s 1;\n  -webkit-animation: prismplayanimation 1s 1;\n  -o-animation: prismplayanimation 1s 1;\n}\n@keyframes prismplayanimation {\n0% {\n    width: 32px;\n    height: 32px;\n    border-radius: 32px;\n    opacity: 0;\n}\n50% {\n    width: 32px;\n    height: 32px;\n    border-radius: 32px;\n    opacity: 1;\n}\n100% {\n    width: 76px;\n    height: 76px;\n    border-radius: 76px;\n    opacity: 0;\n}\n}\n.prism-player {\n  background-color: #000;\n  position: relative;\n}\n.prism-player .prism-ErrorMessage,\n.prism-player .prism-cover {\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.prism-player a {\n  text-decoration: none;\n}\n.prism-player .x5-full-screen {\n  object-fit: fill;\n  object-position: 50% 50%;\n}\n.prism-player .x5-top-left {\n  object-fit: contain;\n  object-position: 0 0;\n}\n.prism-player .prism-ErrorMessage {\n  z-index: 99;\n  display: none;\n}\n.prism-player .prism-ErrorMessage .prism-error-content {\n  margin-top: 20px;\n  padding: 0 5px;\n}\n.prism-player .prism-ErrorMessage .prism-error-content p {\n  text-align: center;\n  font-size: 12px;\n  color: #fff;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n  border-bottom: 1.5px;\n  border-bottom-color: rgba(255, 255, 255, 0.15);\n  border-bottom-style: dotted;\n  text-align: center;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation a {\n  width: 72px;\n  height: 32px;\n  line-height: 32px;\n  vertical-align: top;\n  display: inline-block;\n  margin-left: 10px;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh {\n  color: #21c5e0;\n  border: 1px solid #21c5e0;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:hover {\n  color: #05d3f5;\n  border-color: #05d3f5;\n  cursor: pointer;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:active {\n  color: #026a7b;\n  border-color: #026a7b;\n}\n.prism-player .prism-ErrorMessage .prism-error-operation .prism-button-orange:visited {\n  color: #05d3f5;\n}\n.prism-player .prism-ErrorMessage .prism-detect-info {\n  color: #fff;\n  font-size: 10px;\n}\n.prism-player .prism-ErrorMessage .prism-detect-info p {\n  padding: 0 5px;\n  word-break: break-all;\n  margin: 0 0 4px;\n}\n.prism-player .prism-ErrorMessage .prism-detect-info span.info-label {\n  display: inline-block;\n  font-weight: 700;\n}\n.prism-player .prism-ErrorMessage .prism-detect-info span.info-content {\n  color: gray;\n}\n.prism-player .prism-big-play-btn {\n  z-index: 1000;\n}\n.prism-player .prism-controlbar {\n  width: 100%;\n  height: 48px;\n  position: relative;\n  z-index: 1;\n  font-size: 14px;\n}\n.prism-player .prism-controlbar .prism-controlbar-bg {\n  background: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  height: 44px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n}\n.prism-player .prism-time-display {\n  height: 44px;\n  line-height: 44px;\n  color: #a4aab3;\n  font-size: 12px;\n}\n.prism-player .prism-time-display .current-time {\n  color: #fff;\n}\n.prism-player .prism-live-time-display {\n  height: 44px;\n  line-height: 44px;\n  color: #a4aab3;\n  font-size: 12px;\n}\n.prism-player .prism-live-time-display span {\n  display: inline;\n}\n.prism-player .prism-live-time-display .live-text {\n  margin-left: 5px;\n  color: #efeff4;\n}\n.prism-player .prism-live-time-display .current-time {\n  color: #fff;\n}\n.prism-player .prism-liveshift-progress,\n.prism-player .prism-progress {\n  width: 100%;\n  height: 4px;\n  background: rgba(195, 197, 198, 0.5);\n  box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.06);\n  position: relative;\n  cursor: pointer;\n}\n.prism-player .prism-liveshift-progress .prism-progress-time,\n.prism-player .prism-progress .prism-progress-time {\n  position: absolute;\n  top: -25px;\n  background: rgba(0, 0, 0, 0.8);\n  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);\n  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);\n  color: #fff;\n  font-size: 14px;\n  border-radius: 7.5px;\n  padding: 0 6px;\n  text-align: center;\n}\n.prism-player .prism-liveshift-progress .prism-progress-loaded,\n.prism-player .prism-progress .prism-progress-loaded {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 100%;\n  background: #c3c5c6;\n}\n.prism-player .prism-liveshift-progress .prism-progress-played,\n.prism-player .prism-progress .prism-progress-played {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 0;\n  height: 100%;\n  background-color: #00c1de;\n}\n.prism-player .prism-liveshift-progress .prism-progress-cursor,\n.prism-player .prism-progress .prism-progress-cursor {\n  position: absolute;\n  top: -5px;\n  border: 10px solid #00c1de;\n  border-radius: 10px;\n  overflow: hidden;\n  box-sizing: content-box;\n  background: #00c1de;\n  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px 0, rgba(0, 0, 0, 0.1) 1px 1px 1px 0, rgba(0, 0, 0, 0.05) 0 -1px 1px 0 inset;\n  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px 0, rgba(0, 0, 0, 0.1) 1px 1px 1px 0,\n  rgba(0, 0, 0, 0.05) 0 -1px 1px 0 inset;\n  display: none;\n}\n.prism-player .prism-liveshift-progress .prism-progress-cursor:hover,\n.prism-player .prism-progress .prism-progress-cursor:hover {\n  background: #00c1de;\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 1px 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05);\n  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 1px 1px 1px 0 rgba(0, 0, 0, 0.1),\n  inset 0 -1px 1px 0 rgba(0, 0, 0, 0.05);\n}\n.prism-player .prism-progress {\n  cursor: pointer;\n}\n.prism-player .prism-progress:hover {\n  height: 10px;\n}\n.prism-player .prism-liveshift-progress .prism-enable-liveshift {\n  cursor: pointer;\n  position: absolute;\n  background: #fff;\n  height: 5px;\n}\n.prism-player .prism-liveshift-progress .prism-enable-liveshift:hover {\n  height: 10px;\n}\n.prism-player .prism-liveshift-progress .prism-liveshift-seperator {\n  width: 2px;\n  height: 15px;\n  background: #fff;\n  position: absolute;\n  right: 0;\n  top: -5px;\n}\n.prism-player .prism-loading {\n  width: 55px;\n  height: 55px;\n  margin-top: -27px !important;\n  margin-left: -27px !important;\n}\n.prism-player .prism-loading .circle {\n  background-color: rgba(0, 0, 0, 0);\n  border: 5px solid;\n  border-color: rgba(0, 193, 222, 0.2) rgba(0, 193, 222, 0.5) rgba(0, 193, 222, 0.7) rgba(0, 193, 222, 0.1);\n  opacity: 0.9;\n  border-radius: 50px;\n  width: 45px;\n  height: 45px;\n  margin: 0 auto;\n  -moz-animation: spinoffPulse 0.9s infinite linear;\n  -webkit-animation: spinoffPulse 0.9s infinite linear;\n}\n.prism-player .prism-hide {\n  display: none;\n}\n.prism-player .prism-snapshot-btn {\n  width: 32px;\n  height: 32px;\n  /*background: url(img/snapshot.png) no-repeat;*/\n  background-size: contain;\n}\n.prism-player .prism-snapshot-btn:hover {\n  /*background: url(img/snapshothover.png) no-repeat;*/\n  background-size: contain;\n  cursor: pointer;\n}\n.prism-player .prism-snapshot-btn:active {\n  displa: block;\n}\n.prism-player .prism-info-display {\n  width: 100%;\n  color: #fff;\n  text-align: center;\n  top: 50%;\n  position: absolute;\n  z-index: 900;\n  height: 44px;\n  line-height: 28px;\n  font-size: 16px;\n  padding: 10px 12px;\n}\n.prism-player .prism-info-display span {\n  color: #00c1de;\n}\n.prism-player .prism-info-left-bottom {\n  width: auto !important;\n  top: auto !important;\n  bottom: 40px;\n  left: 52% !important;\n  text-align: left;\n}\n.prism-player .prism-auto-stream-selector {\n  position: absolute;\n  bottom: 50%;\n  width: 100%;\n  margin: auto;\n  color: #efeff4;\n  display: none;\n}\n.prism-player .prism-auto-stream-selector p.tip-text {\n  text-align: center;\n}\n.prism-player .prism-auto-stream-selector .operators {\n  width: 100px;\n  margin: auto;\n}\n.prism-player .prism-button-cancel {\n  font-size: 16px;\n  border: 1px solid;\n  padding: 2px 5px;\n  color: #fffa8;\n  margin-left: 5px;\n  background: 0 0;\n}\n.prism-player .prism-button-ok {\n  font-size: 16px;\n  border: 1px solid #fff;\n  padding: 2px 5px;\n  color: #fff;\n  background: 0 0;\n}\n.prism-player .prism-button-cancel:hover,\n.prism-player .prism-button-ok:hover {\n  color: #f5f5f5;\n}\n:-webkit-full-screen {\n  width: 100% !important;\n  height: 100% !important;\n}\n:-moz-full-screen {\n  width: 100% !important;\n  height: 100% !important;\n}\n:-ms-full-screen {\n  width: 100% !important;\n  height: 100% !important;\n}\n:-ms-fullscreen {\n  width: 100% !important;\n  height: 100% !important;\n}\n:-webkit-full-screen {\n  width: 100% !important;\n  height: 100% !important;\n}\n:fullscreen {\n  width: 100% !important;\n  height: 100% !important;\n}\nbody.prism-full-window {\n  padding: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: auto;\n}\n.prism-fullscreen {\n  position: fixed;\n  overflow: hidden;\n  z-index: 99999;\n  left: 0 !important;\n  top: 0 !important;\n  bottom: 0 !important;\n  right: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n.prism-button {\n  cursor: pointer;\n  text-align: center;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);\n  border-radius: 0.5em;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n}\n.prism-button-orange {\n  color: #a56117;\n  border: 1px solid #a56117;\n}\n.prism-button-orange:active,\n.prism-button-orange:hover {\n  color: #d67400;\n  border-color: #d67400;\n}\n.prism-button-orange:visited {\n  color: #d67400;\n}\n.prism-center {\n  position: absolute;\n  left: 50%;\n  -ms-transform: translateX(-50%);\n      transform: translateX(-50%);\n}\n.prism-width90 {\n  width: 90%;\n}\n.prism-stream-selector {\n  font-size: 16px;\n  position: relative;\n  line-height: 32px;\n}\n.prism-stream-selector .current-stream-selector {\n  text-align: center;\n  width: 70px;\n  display: none;\n  color: #efeff4;\n}\n.prism-stream-selector .current-stream-selector:hover {\n  cursor: pointer;\n  color: #00c1de;\n}\n.prism-stream-selector .stream-selector-tip {\n  color: #fff;\n  text-align: center;\n  padding: 2px 5px;\n  display: none;\n  position: absolute;\n  bottom: 61.5px;\n  white-space: nowrap;\n  left: 43%;\n  font-size: 18px;\n}\n.prism-stream-selector .stream-selector-list {\n  position: absolute;\n  bottom: 38px;\n  background: rgba(0, 0, 0, 0.8);\n  border-radius: 4px;\n  color: #efeff4;\n  padding: 5px 5px 0;\n  width: 70px;\n  display: none;\n}\n.prism-stream-selector .stream-selector-list li {\n  list-style-type: none;\n  text-align: center;\n  white-space: nowrap;\n  padding: 0 2px;\n  line-height: 24px;\n}\n.prism-stream-selector .stream-selector-list li span.current,\n.prism-stream-selector .stream-selector-list li.current {\n  color: #00c1de;\n}\n.prism-stream-selector .stream-selector-list li:hover {\n  cursor: pointer;\n  color: #00c1de;\n}\n.prism-speed-selector {\n  font-size: 16px;\n  position: relative;\n  line-height: 32px;\n}\n.prism-speed-selector .current-speed-selector {\n  color: #efeff4;\n  text-align: center;\n  width: 60px;\n}\n.prism-speed-selector .current-speed-selector:hover {\n  cursor: pointer;\n  color: #00c1de;\n}\n.prism-speed-selector .speed-selector-list {\n  position: absolute;\n  bottom: 38px;\n  border-radius: 4px;\n  background: rgba(0, 0, 0, 0.8);\n  color: #efeff4;\n  padding: 5px 5px 0;\n  display: none;\n}\n.prism-speed-selector .speed-selector-list li {\n  list-style-type: none;\n  text-align: center;\n  white-space: nowrap;\n  padding: 0 2px;\n  line-height: 24px;\n}\n.prism-speed-selector .speed-selector-list li span.current,\n.prism-speed-selector .speed-selector-list li.current {\n  color: #00c1de;\n}\n.prism-speed-selector .speed-selector-list li:hover {\n  cursor: pointer;\n  color: #00c1de;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prism-player",
    style: (_vm.playStyle),
    attrs: {
      "id": _vm.playerId
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09453d1b", module.exports)
  }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3c01df0a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?-autoprefixer!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-09453d1b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/postcss-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueAliplayer.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?-autoprefixer!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-09453d1b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/postcss-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueAliplayer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("22cff408", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?-autoprefixer!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-09453d1b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/postcss-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./VueAliplayer.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?-autoprefixer!../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-09453d1b\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/postcss-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./VueAliplayer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
});