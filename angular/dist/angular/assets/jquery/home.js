function myTest() {
    alert('Welcome to custom js');
  }
  
  // Funcion para que cargue toda la logica d ela aplicacion en js
  $(function() {
  
  (function($) {
  
      $.fn.extend({
        slimScroll: function(options) {
      
          var defaults = {
      
            // width in pixels of the visible scroll area
            width : 'auto',
      
            // height in pixels of the visible scroll area
            height : '250px',
      
            // width in pixels of the scrollbar and rail
            size : '7px',
      
            // scrollbar color, accepts any hex/color value
            color: '#000',
      
            // scrollbar position - left/right
            position : 'right',
      
            // distance in pixels between the side edge and the scrollbar
            distance : '1px',
      
            // default scroll position on load - top / bottom / $('selector')
            start : 'top',
      
            // sets scrollbar opacity
            opacity : .4,
      
            // enables always-on mode for the scrollbar
            alwaysVisible : false,
      
            // check if we should hide the scrollbar when user is hovering over
            disableFadeOut : false,
      
            // sets visibility of the rail
            railVisible : false,
      
            // sets rail color
            railColor : '#333',
      
            // sets rail opacity
            railOpacity : .2,
      
            // whether  we should use jQuery UI Draggable to enable bar dragging
            railDraggable : true,
      
            // defautlt CSS class of the slimscroll rail
            railClass : 'slimScrollRail',
      
            // defautlt CSS class of the slimscroll bar
            barClass : 'slimScrollBar',
      
            // defautlt CSS class of the slimscroll wrapper
            wrapperClass : 'slimScrollDiv',
      
            // check if mousewheel should scroll the window if we reach top/bottom
            allowPageScroll : false,
      
            // scroll amount applied to each mouse wheel step
            wheelStep : 20,
      
            // scroll amount applied when user is using gestures
            touchScrollStep : 200,
      
            // sets border radius
            borderRadius: '7px',
      
            // sets border radius of the rail
            railBorderRadius : '7px'
          };
      
          var o = $.extend(defaults, options);
      
          // do it for every element that matches selector
          this.each(function(){
      
          var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
            barHeight, percentScroll, lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false;
      
            // used in event handlers and for better minification
            var me = $(this);
      
            // ensure we are not binding it again
            if (me.parent().hasClass(o.wrapperClass))
            {
                // start from last bar position
                var offset = me.scrollTop();
      
                // find bar and rail
                bar = me.siblings('.' + o.barClass);
                rail = me.siblings('.' + o.railClass);
      
                getBarHeight();
      
                // check if we should scroll existing instance
                if ($.isPlainObject(options))
                {
                  // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
                  if ( 'height' in options && options.height == 'auto' ) {
                    me.parent().css('height', 'auto');
                    me.css('height', 'auto');
                    var height = me.parent().parent().height();
                    me.parent().css('height', height);
                    me.css('height', height);
                  } else if ('height' in options) {
                    var h = options.height;
                    me.parent().css('height', h);
                    me.css('height', h);
                  }
      
                  if ('scrollTo' in options)
                  {
                    // jump to a static point
                    offset = parseInt(o.scrollTo);
                  }
                  else if ('scrollBy' in options)
                  {
                    // jump by value pixels
                    offset += parseInt(o.scrollBy);
                  }
                  else if ('destroy' in options)
                  {
                    // remove slimscroll elements
                    bar.remove();
                    rail.remove();
                    me.unwrap();
                    return;
                  }
      
                  // scroll content by the given offset
                  scrollContent(offset, false, true);
                }
      
                return;
            }
            else if ($.isPlainObject(options))
            {
                if ('destroy' in options)
                {
                  return;
                }
            }
      
            // optionally set height to the parent's height
            o.height = (o.height == 'auto') ? me.parent().height() : o.height;
      
            // wrap content
            var wrapper = $(divS)
              .addClass(o.wrapperClass)
              .css({
                position: 'relative',
                overflow: 'hidden',
                width: o.width,
                height: o.height
              });
      
            // update style for the div
            me.css({
              overflow: 'hidden',
              width: o.width,
              height: o.height
            });
      
            // create scrollbar rail
            var rail = $(divS)
              .addClass(o.railClass)
              .css({
                width: o.size,
                height: '100%',
                position: 'absolute',
                top: 0,
                display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
                'border-radius': o.railBorderRadius,
                background: o.railColor,
                opacity: o.railOpacity,
                zIndex: 90
              });
      
            // create scrollbar
            var bar = $(divS)
              .addClass(o.barClass)
              .css({
                background: o.color,
                width: o.size,
                position: 'absolute',
                top: 0,
                opacity: o.opacity,
                display: o.alwaysVisible ? 'block' : 'none',
                'border-radius' : o.borderRadius,
                BorderRadius: o.borderRadius,
                MozBorderRadius: o.borderRadius,
                WebkitBorderRadius: o.borderRadius,
                zIndex: 99
              });
      
            // set position
            var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
            rail.css(posCss);
            bar.css(posCss);
      
            // wrap it
            me.wrap(wrapper);
      
            // append to parent div
            me.parent().append(bar);
            me.parent().append(rail);
      
            // make it draggable and no longer dependent on the jqueryUI
            if (o.railDraggable){
              bar.bind("mousedown", function(e) {
                var $doc = $(document);
                isDragg = true;
                t = parseFloat(bar.css('top'));
                pageY = e.pageY;
      
                $doc.bind("mousemove.slimscroll", function(e){
                  currTop = t + e.pageY - pageY;
                  bar.css('top', currTop);
                  scrollContent(0, bar.position().top, false);// scroll content
                });
      
                $doc.bind("mouseup.slimscroll", function(e) {
                  isDragg = false;hideBar();
                  $doc.unbind('.slimscroll');
                });
                return false;
              }).bind("selectstart.slimscroll", function(e){
                e.stopPropagation();
                e.preventDefault();
                return false;
              });
            }
      
            // on rail over
            rail.hover(function(){
              showBar();
            }, function(){
              hideBar();
            });
      
            // on bar over
            bar.hover(function(){
              isOverBar = true;
            }, function(){
              isOverBar = false;
            });
      
            // show on parent mouseover
            me.hover(function(){
              isOverPanel = true;
              showBar();
              hideBar();
            }, function(){
              isOverPanel = false;
              hideBar();
            });
      
            // support for mobile
            me.bind('touchstart', function(e,b){
              if (e.originalEvent.touches.length)
              {
                // record where touch started
                touchDif = e.originalEvent.touches[0].pageY;
              }
            });
      
            me.bind('touchmove', function(e){
              // prevent scrolling the page if necessary
              if(!releaseScroll)
              {
                e.originalEvent.preventDefault();
              }
              if (e.originalEvent.touches.length)
              {
                // see how far user swiped
                var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
                // scroll content
                scrollContent(diff, true);
                touchDif = e.originalEvent.touches[0].pageY;
              }
            });
      
            // set up initial height
            getBarHeight();
      
            // check start position
            if (o.start === 'bottom')
            {
              // scroll content to bottom
              bar.css({ top: me.outerHeight() - bar.outerHeight() });
              scrollContent(0, true);
            }
            else if (o.start !== 'top')
            {
              // assume jQuery selector
              scrollContent($(o.start).position().top, null, true);
      
              // make sure bar stays hidden
              if (!o.alwaysVisible) { bar.hide(); }
            }
      
            // attach scroll events
            attachWheel(this);
      
            function _onWheel(e)
            {
              // use mouse wheel only when mouse is over
              if (!isOverPanel) { return; }
      
              var e = e || window.event;
      
              var delta = 0;
              if (e.wheelDelta) { delta = -e.wheelDelta/120; }
              if (e.detail) { delta = e.detail / 3; }
      
              var target = e.target || e.srcTarget || e.srcElement;
              if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
                // scroll content
                scrollContent(delta, true);
              }
      
              // stop window scroll
              if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
              if (!releaseScroll) { e.returnValue = false; }
            }
      
            function scrollContent(y, isWheel, isJump)
            {
              releaseScroll = false;
              var delta = y;
              var maxTop = me.outerHeight() - bar.outerHeight();
      
              if (isWheel)
              {
                // move bar with mouse wheel
                delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();
      
                // move bar, make sure it doesn't go out
                delta = Math.min(Math.max(delta, 0), maxTop);
      
                // if scrolling down, make sure a fractional change to the
                // scroll position isn't rounded away when the scrollbar's CSS is set
                // this flooring of delta would happened automatically when
                // bar.css is set below, but we floor here for clarity
                delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
      
                // scroll the scrollbar
                bar.css({ top: delta + 'px' });
              }
      
              // calculate actual scroll amount
              percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
              delta = percentScroll * (me[0].scrollHeight - me.outerHeight());
      
              if (isJump)
              {
                delta = y;
                var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
                offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                bar.css({ top: offsetTop + 'px' });
              }
      
              // scroll content
              me.scrollTop(delta);
      
              // fire scrolling event
              me.trigger('slimscrolling', ~~delta);
      
              // ensure bar is visible
              showBar();
      
              // trigger hide when scroll is stopped
              hideBar();
            }
      
            function attachWheel(target)
            {
              if (window.addEventListener)
              {
                target.addEventListener('DOMMouseScroll', _onWheel, false );
                target.addEventListener('mousewheel', _onWheel, false );
              }
              else
              {
                document.attachEvent("onmousewheel", _onWheel)
              }
            }
      
            function getBarHeight()
            {
              // calculate scrollbar height and make sure it is not too small
              barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
              bar.css({ height: barHeight + 'px' });
      
              // hide scrollbar if content is not long enough
              var display = barHeight == me.outerHeight() ? 'none' : 'block';
              bar.css({ display: display });
            }
      
            function showBar()
            {
              // recalculate bar height
              getBarHeight();
              clearTimeout(queueHide);
      
              // when bar reached top or bottom
              if (percentScroll == ~~percentScroll)
              {
                //release wheel
                releaseScroll = o.allowPageScroll;
      
                // publish approporiate event
                if (lastScroll != percentScroll)
                {
                    var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                    me.trigger('slimscroll', msg);
                }
              }
              else
              {
                releaseScroll = false;
              }
              lastScroll = percentScroll;
      
              // show only when required
              if(barHeight >= me.outerHeight()) {
                //allow window scroll
                releaseScroll = true;
                return;
              }
              bar.stop(true,true).fadeIn('fast');
              if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }
            }
      
            function hideBar()
            {
              // only hide when options allow it
              if (!o.alwaysVisible)
              {
                queueHide = setTimeout(function(){
                  if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
                  {
                    bar.fadeOut('slow');
                    rail.fadeOut('slow');
                  }
                }, 1000);
              }
            }
      
          });
      
          // maintain chainability
          return this;
        }
      });
      
      $.fn.extend({
        slimscroll: $.fn.slimScroll
      });
      
      })(jQuery);
      
        !function(t,e){"use strict";"function"==typeof define&&define.amd?define([],function(){return t.Waves=e.call(t),t.Waves}):"object"==typeof exports?module.exports=e.call(t):t.Waves=e.call(t)}("object"==typeof global?global:this,function(){"use strict";function t(t){return null!==t&&t===t.window}function e(e){return t(e)?e:9===e.nodeType&&e.defaultView}function n(t){var e=typeof t;return"function"===e||"object"===e&&!!t}function o(t){return n(t)&&t.nodeType>0}function a(t){var e=f.call(t);return"[object String]"===e?d(t):n(t)&&/^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(e)&&t.hasOwnProperty("length")?t:o(t)?[t]:[]}function i(t){var n,o,a={top:0,left:0},i=t&&t.ownerDocument;return n=i.documentElement,void 0!==t.getBoundingClientRect&&(a=t.getBoundingClientRect()),o=e(i),{top:a.top+o.pageYOffset-n.clientTop,left:a.left+o.pageXOffset-n.clientLeft}}function r(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function s(t,e,n){if(n){n.classList.remove("waves-rippling");var o=n.getAttribute("data-x"),a=n.getAttribute("data-y"),i=n.getAttribute("data-scale"),s=n.getAttribute("data-translate"),u=350-(Date.now()-Number(n.getAttribute("data-hold")));u<0&&(u=0),"mousemove"===t.type&&(u=150);var c="mousemove"===t.type?2500:v.duration;setTimeout(function(){var t={top:a+"px",left:o+"px",opacity:"0","-webkit-transition-duration":c+"ms","-moz-transition-duration":c+"ms","-o-transition-duration":c+"ms","transition-duration":c+"ms","-webkit-transform":i+" "+s,"-moz-transform":i+" "+s,"-ms-transform":i+" "+s,"-o-transform":i+" "+s,transform:i+" "+s};n.setAttribute("style",r(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},c)},u)}}function u(t){if(!1===h.allowEvent(t))return null;for(var e=null,n=t.target||t.srcElement;n.parentElement;){if(!(n instanceof SVGElement)&&n.classList.contains("waves-effect")){e=n;break}n=n.parentElement}return e}function c(t){var e=u(t);if(null!==e){if(e.disabled||e.getAttribute("disabled")||e.classList.contains("disabled"))return;if(h.registerEvent(t),"touchstart"===t.type&&v.delay){var n=!1,o=setTimeout(function(){o=null,v.show(t,e)},v.delay),a=function(a){o&&(clearTimeout(o),o=null,v.show(t,e)),n||(n=!0,v.hide(a,e)),r()},i=function(t){o&&(clearTimeout(o),o=null),a(t),r()};e.addEventListener("touchmove",i,!1),e.addEventListener("touchend",a,!1),e.addEventListener("touchcancel",a,!1);var r=function(){e.removeEventListener("touchmove",i),e.removeEventListener("touchend",a),e.removeEventListener("touchcancel",a)}}else v.show(t,e),m&&(e.addEventListener("touchend",v.hide,!1),e.addEventListener("touchcancel",v.hide,!1)),e.addEventListener("mouseup",v.hide,!1),e.addEventListener("mouseleave",v.hide,!1)}}var l=l||{},d=document.querySelectorAll.bind(document),f=Object.prototype.toString,m="ontouchstart"in window,v={duration:750,delay:200,show:function(t,e,n){if(2===t.button)return!1;e=e||this;var o=document.createElement("div");o.className="waves-ripple waves-rippling",e.appendChild(o);var a=i(e),s=0,u=0;"touches"in t&&t.touches.length?(s=t.touches[0].pageY-a.top,u=t.touches[0].pageX-a.left):(s=t.pageY-a.top,u=t.pageX-a.left),u=u>=0?u:0,s=s>=0?s:0;var c="scale("+e.clientWidth/100*3+")",l="translate(0,0)";n&&(l="translate("+n.x+"px, "+n.y+"px)"),o.setAttribute("data-hold",Date.now()),o.setAttribute("data-x",u),o.setAttribute("data-y",s),o.setAttribute("data-scale",c),o.setAttribute("data-translate",l);var d={top:s+"px",left:u+"px"};o.classList.add("waves-notransition"),o.setAttribute("style",r(d)),o.classList.remove("waves-notransition"),d["-webkit-transform"]=c+" "+l,d["-moz-transform"]=c+" "+l,d["-ms-transform"]=c+" "+l,d["-o-transform"]=c+" "+l,d.transform=c+" "+l,d.opacity="1";var f="mousemove"===t.type?2500:v.duration;d["-webkit-transition-duration"]=f+"ms",d["-moz-transition-duration"]=f+"ms",d["-o-transition-duration"]=f+"ms",d["transition-duration"]=f+"ms",o.setAttribute("style",r(d))},hide:function(t,e){for(var n=(e=e||this).getElementsByClassName("waves-rippling"),o=0,a=n.length;o<a;o++)s(t,e,n[o]);m&&(e.removeEventListener("touchend",v.hide),e.removeEventListener("touchcancel",v.hide)),e.removeEventListener("mouseup",v.hide),e.removeEventListener("mouseleave",v.hide)}},p={input:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");n.className=t.className+" waves-input-wrapper",t.className="waves-button-input",e.replaceChild(n,t),n.appendChild(t);var o=window.getComputedStyle(t,null),a=o.color,i=o.backgroundColor;n.setAttribute("style","color:"+a+";background:"+i),t.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");e.replaceChild(n,t),n.appendChild(t)}}},h={touches:0,allowEvent:function(t){var e=!0;return/^(mousedown|mousemove)$/.test(t.type)&&h.touches&&(e=!1),e},registerEvent:function(t){var e=t.type;"touchstart"===e?h.touches+=1:/^(touchend|touchcancel)$/.test(e)&&setTimeout(function(){h.touches&&(h.touches-=1)},500)}};return l.init=function(t){var e=document.body;"duration"in(t=t||{})&&(v.duration=t.duration),"delay"in t&&(v.delay=t.delay),m&&(e.addEventListener("touchstart",c,!1),e.addEventListener("touchcancel",h.registerEvent,!1),e.addEventListener("touchend",h.registerEvent,!1)),e.addEventListener("mousedown",c,!1)},l.attach=function(t,e){t=a(t),"[object Array]"===f.call(e)&&(e=e.join(" ")),e=e?" "+e:"";for(var n,o,i=0,r=t.length;i<r;i++)o=(n=t[i]).tagName.toLowerCase(),-1!==["input","img"].indexOf(o)&&(p[o](n),n=n.parentElement),-1===n.className.indexOf("waves-effect")&&(n.className+=" waves-effect"+e)},l.ripple=function(t,e){var n=(t=a(t)).length;if(e=e||{},e.wait=e.wait||0,e.position=e.position||null,n)for(var o,r,s,u={},c=0,l={type:"mousedown",button:1};c<n;c++)if(o=t[c],r=e.position||{x:o.clientWidth/2,y:o.clientHeight/2},s=i(o),u.x=s.left+r.x,u.y=s.top+r.y,l.pageX=u.x,l.pageY=u.y,v.show(l,o),e.wait>=0&&null!==e.wait){var d={type:"mouseup",button:1};setTimeout(function(t,e){return function(){v.hide(t,e)}}(d,o),e.wait)}},l.calm=function(t){for(var e={type:"mouseup",button:1},n=0,o=(t=a(t)).length;n<o;n++)v.hide(e,t[n])},l.displayEffect=function(t){l.init(t)},l});
      //# sourceMappingURL=waves.min.js.map
      !function(a,b){if("function"==typeof define&&define.amd)define(["jquery"],b);else if("undefined"!=typeof exports)b(require("jquery"));else{var c={exports:{}};b(a.jquery),a.metisMenu=c.exports}}(this,function(a){"use strict";function b(a){return a&&a.__esModule?a:{default:a}}function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d=(b(a),"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a}),e=function(a){function b(){return{bindType:f.end,delegateType:f.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}}}function c(){if(window.QUnit)return!1;var a=document.createElement("mm");for(var b in g)if(void 0!==a.style[b])return{end:g[b]};return!1}function d(b){var c=this,d=!1;return a(this).one(h.TRANSITION_END,function(){d=!0}),setTimeout(function(){d||h.triggerTransitionEnd(c)},b),this}function e(){f=c(),a.fn.emulateTransitionEnd=d,h.supportsTransitionEnd()&&(a.event.special[h.TRANSITION_END]=b())}var f=!1,g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},h={TRANSITION_END:"mmTransitionEnd",triggerTransitionEnd:function(b){a(b).trigger(f.end)},supportsTransitionEnd:function(){return Boolean(f)}};return e(),h}(jQuery);(function(a){var b="metisMenu",f="metisMenu",g="."+f,h=".data-api",i=a.fn[b],j=350,k={toggle:!0,preventDefault:!0,activeClass:"active",collapseClass:"collapse",collapseInClass:"in",collapsingClass:"collapsing",triggerElement:"a",parentTrigger:"li",subMenu:"ul"},l={SHOW:"show"+g,SHOWN:"shown"+g,HIDE:"hide"+g,HIDDEN:"hidden"+g,CLICK_DATA_API:"click"+g+h},m=function(){function b(a,d){c(this,b),this._element=a,this._config=this._getConfig(d),this._transitioning=null,this.init()}return b.prototype.init=function(){var b=this;a(this._element).find(this._config.parentTrigger+"."+this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr("aria-expanded",!0).addClass(this._config.collapseClass+" "+this._config.collapseInClass),a(this._element).find(this._config.parentTrigger).not("."+this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr("aria-expanded",!1).addClass(this._config.collapseClass),a(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).on(l.CLICK_DATA_API,function(c){var d=a(this),e=d.parent(b._config.parentTrigger),f=e.siblings(b._config.parentTrigger).children(b._config.triggerElement),g=e.children(b._config.subMenu);b._config.preventDefault&&c.preventDefault(),"true"!==d.attr("aria-disabled")&&(e.hasClass(b._config.activeClass)?(d.attr("aria-expanded",!1),b._hide(g)):(b._show(g),d.attr("aria-expanded",!0),b._config.toggle&&f.attr("aria-expanded",!1)),b._config.onTransitionStart&&b._config.onTransitionStart(c))})},b.prototype._show=function(b){if(!this._transitioning&&!a(b).hasClass(this._config.collapsingClass)){var c=this,d=a(b),f=a.Event(l.SHOW);if(d.trigger(f),!f.isDefaultPrevented()){d.parent(this._config.parentTrigger).addClass(this._config.activeClass),this._config.toggle&&this._hide(d.parent(this._config.parentTrigger).siblings().children(this._config.subMenu+"."+this._config.collapseInClass).attr("aria-expanded",!1)),d.removeClass(this._config.collapseClass).addClass(this._config.collapsingClass).height(0),this.setTransitioning(!0);var g=function(){d.removeClass(c._config.collapsingClass).addClass(c._config.collapseClass+" "+c._config.collapseInClass).height("").attr("aria-expanded",!0),c.setTransitioning(!1),d.trigger(l.SHOWN)};return e.supportsTransitionEnd()?void d.height(d[0].scrollHeight).one(e.TRANSITION_END,g).emulateTransitionEnd(j):void g()}}},b.prototype._hide=function(b){if(!this._transitioning&&a(b).hasClass(this._config.collapseInClass)){var c=this,d=a(b),f=a.Event(l.HIDE);if(d.trigger(f),!f.isDefaultPrevented()){d.parent(this._config.parentTrigger).removeClass(this._config.activeClass),d.height(d.height())[0].offsetHeight,d.addClass(this._config.collapsingClass).removeClass(this._config.collapseClass).removeClass(this._config.collapseInClass),this.setTransitioning(!0);var g=function(){c._transitioning&&c._config.onTransitionEnd&&c._config.onTransitionEnd(),c.setTransitioning(!1),d.trigger(l.HIDDEN),d.removeClass(c._config.collapsingClass).addClass(c._config.collapseClass).attr("aria-expanded",!1)};return e.supportsTransitionEnd()?void(0==d.height()||"none"==d.css("display")?g():d.height(0).one(e.TRANSITION_END,g).emulateTransitionEnd(j)):void g()}}},b.prototype.setTransitioning=function(a){this._transitioning=a},b.prototype.dispose=function(){a.removeData(this._element,f),a(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).off("click"),this._transitioning=null,this._config=null,this._element=null},b.prototype._getConfig=function(b){return b=a.extend({},k,b)},b._jQueryInterface=function(c){return this.each(function(){var e=a(this),g=e.data(f),h=a.extend({},k,e.data(),"object"===("undefined"==typeof c?"undefined":d(c))&&c);if(!g&&/dispose/.test(c)&&this.dispose(),g||(g=new b(this,h),e.data(f,g)),"string"==typeof c){if(void 0===g[c])throw new Error('No method named "'+c+'"');g[c]()}})},b}();return a.fn[b]=m._jQueryInterface,a.fn[b].Constructor=m,a.fn[b].noConflict=function(){return a.fn[b]=i,m._jQueryInterface},m})(jQuery)});
      //# sourceMappingURL=metisMenu.js.map
      
      
      /*
       Template Name: Agroxa - Responsive Bootstrap 4 Admin Dashboard
       Author: Themesbrand
       Website: www.themesbrand.com
       File: Main js
       */
      
      
      
       !function($) {
          "use strict";
      
          var MainApp = function() {};
      
          MainApp.prototype.initNavbar = function () {
      
              $('.navbar-toggle').on('click', function (event) {
                  $(this).toggleClass('open');
                  $('#navigation').slideToggle(400);
              });
      
              $('.navigation-menu>li').slice(-2).addClass('last-elements');
      
              $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
                  if ($(window).width() < 992) {
                      e.preventDefault();
                      $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
                  }
              });
          },
          MainApp.prototype.initScrollbar = function () {
              $('.slimscroll').slimScroll({
                  height: 'auto',
                  position: 'right',
                  size: "7px",
                  color: '#9ea5ab',
                  wheelStep: 5,
                  touchScrollStep: 50
              });
          }
          // === fo,llowing js will activate the menu in left side bar based on url ====
          MainApp.prototype.initMenuItem = function () {
              $(".navigation-menu a").each(function () {
                  var pageUrl = window.location.href.split(/[?#]/)[0];
                  if (this.href == pageUrl) { 
                      $(this).parent().addClass("active"); // add active to li of the current link
                      $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                      $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
                  }
              });
          },
          MainApp.prototype.initComponents = function () {
              $('[data-toggle="tooltip"]').tooltip();
              $('[data-toggle="popover"]').popover();
          },
      
          MainApp.prototype.initHeaderCharts = function () {
              $('#header-chart-1').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
                  type: 'bar',
                  height: '35',
                  barWidth: '5',
                  barSpacing: '3',
                  barColor: '#1b82ec'
              });
              $('#header-chart-2').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
                  type: 'bar',
                  height: '35',
                  barWidth: '5',
                  barSpacing: '3',
                  barColor: '#f5b225'
              });
          },
      
          MainApp.prototype.init = function () {
              this.initNavbar();
              this.initScrollbar();
              this.initMenuItem();
              this.initComponents();
              this.initHeaderCharts();
              Waves.init();
          },
      
          //init
          $.MainApp = new MainApp, $.MainApp.Constructor = MainApp
      }(window.jQuery),
      
      //initializing
      function ($) {
          "use strict";
          $.MainApp.init();
      }(window.jQuery);
        
    });