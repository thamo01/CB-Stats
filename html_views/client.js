$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

const wsServerPort = 5567;

var wsClient = new WebSocket("ws://localhost:" + wsServerPort);

wsClient.onmessage = function (event) {
    const div = document.createElement("div");
    div.innerText = "Clicked <3 :D";
    $(div).animateCss('fadeInUpBig', () => {
        $(div).animateCss('fadeOutUp', () => {
            $(div).remove();
        });
    });
    document.body.appendChild(div);
}