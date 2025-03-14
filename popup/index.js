(() => {
    "use strict";
    var e;
    !function(e) {
        e.DEBUG = "canvas-quiz-loader-debug", e.PING = "canvas-quiz-loader-ping", e.PONG = "canvas-quiz-loader-pong"
    }(e || (e = {}));
    var t = function(e, t, n, o) {
        return new(n || (n = Promise))((function(c, r) {
            function i(e) {
                try {
                    s(o.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(o.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? c(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(i, a)
            }
            s((o = o.apply(e, t || [])).next())
        }))
    };
    const n = document.querySelector(".dropdown");
    n.addEventListener("click", (e => {
        n.classList.toggle("open")
    })), document.addEventListener("click", (e => {
        n.contains(e.target) || n.classList.remove("open")
    })), document.getElementById("download-debug").addEventListener("click", (() => t(void 0, void 0, void 0, (function*() {
        const t = yield browser.tabs.query({
            active: !0,
            currentWindow: !0
        });
        !function(e, t) {
            const n = new Blob([t], {
                    type: "text/plain"
                }),
                o = document.createElement("a");
            o.href = URL.createObjectURL(n), o.download = "logs.txt", o.click(), URL.revokeObjectURL(o.href)
        }(0, yield browser.tabs.sendMessage(t[0].id, {
            type: e.DEBUG
        }))
    })))), function() {
        return t(this, void 0, void 0, (function*() {
            try {
                const t = yield browser.tabs.query({
                    active: !0,
                    currentWindow: !0
                });
                return (yield browser.tabs.sendMessage(t[0].id, {
                    type: e.PING
                })) === e.PONG
            } catch (e) {
                return !1
            }
        }))
    }().then((e => {
        console.log(e), e && n.classList.remove("hidden")
    }))
})();