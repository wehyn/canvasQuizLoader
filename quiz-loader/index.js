(() => {
    "use strict";
    var e;

    function t(e, t) {
        return Object.fromEntries(Object.entries(e).filter((([e, n]) => t(n, e))))
    }

    function n(e) {
        if (!(e instanceof Error)) return e;
        const t = {};
        return Object.getOwnPropertyNames(e).forEach((n => {
            t[n] = e[n]
        })), t
    } ! function (e) {
        e.DEBUG = "canvas-quiz-loader-debug", e.PING = "canvas-quiz-loader-ping", e.PONG = "canvas-quiz-loader-pong"
    }(e || (e = {}));
    const o = {
        log: "log",
        debug: "debug",
        info: "info",
        warn: "warn",
        error: "error"
    },
        r = console,
        s = {};
    Object.keys(o).forEach((e => {
        s[e] = r[e]
    }));
    const i = "Datadog Browser SDK:",
        a = {
            debug: s.debug.bind(r, i),
            log: s.log.bind(r, i),
            info: s.info.bind(r, i),
            warn: s.warn.bind(r, i),
            error: s.error.bind(r, i)
        },
        c = "https://docs.datadoghq.com",
        u = `${c}/real_user_monitoring/browser/troubleshooting`,
        l = "More details:";

    function d(e, t) {
        return (...n) => {
            try {
                return e(...n)
            } catch (e) {
                a.error(t, e)
            }
        }
    }
    let f, p = !1;

    function g(e) {
        p = e
    }

    function m(e) {
        return function () {
            return y(e, this, arguments)
        }
    }

    function y(e, t, n) {
        try {
            return e.apply(t, n)
        } catch (e) {
            ! function (e) {
                if (h(e), f) try {
                    f(e)
                } catch (e) {
                    h(e)
                }
            }(e)
        }
    }

    function h(...e) {
        p && a.error("[MONITOR]", ...e)
    }

    function b() {
        if ("object" == typeof globalThis) return globalThis;
        Object.defineProperty(Object.prototype, "_dd_temp_", {
            get() {
                return this
            },
            configurable: !0
        });
        let e = _dd_temp_;
        return delete Object.prototype._dd_temp_, "object" != typeof e && (e = "object" == typeof self ? self : "object" == typeof window ? window : {}), e
    }
    const v = 1024,
        w = 1024 * v,
        S = /[^\u0000-\u007F]/;

    function _(e) {
        return S.test(e) ? void 0 !== window.TextEncoder ? (new TextEncoder).encode(e).length : new Blob([e]).size : e.length
    }

    function E(e, t) {
        const n = b();
        let o;
        return n.Zone && "function" == typeof n.Zone.__symbol__ && (o = e[n.Zone.__symbol__(t)]), o || (o = e[t]), o
    }

    function k(e, t) {
        return E(b(), "setTimeout")(m(e), t)
    }

    function C(e) {
        E(b(), "clearTimeout")(e)
    }

    function x(e, t) {
        return E(b(), "setInterval")(m(e), t)
    }

    function T(e) {
        E(b(), "clearInterval")(e)
    }

    function L(e, t, n) {
        const o = !n || void 0 === n.leading || n.leading,
            r = !n || void 0 === n.trailing || n.trailing;
        let s, i, a = !1;
        return {
            throttled: (...n) => {
                a ? s = n : (o ? e(...n) : s = n, a = !0, i = k((() => {
                    r && s && e(...s), a = !1, s = void 0
                }), t))
            },
            cancel: () => {
                C(i), a = !1, s = void 0
            }
        }
    }

    function O() { }

    function $(e, t, n) {
        if ("object" != typeof e || null === e) return JSON.stringify(e);
        const o = R(Object.prototype),
            r = R(Array.prototype),
            s = R(Object.getPrototypeOf(e)),
            i = R(e);
        try {
            return JSON.stringify(e, t, n)
        } catch (e) {
            return "<error: unable to serialize object>"
        } finally {
            o(), r(), s(), i()
        }
    }

    function R(e) {
        const t = e,
            n = t.toJSON;
        return n ? (delete t.toJSON, () => {
            t.toJSON = n
        }) : O
    }

    function A(e, t) {
        return Object.keys(e).some((n => e[n] === t))
    }

    function I(e) {
        return 0 === Object.keys(e).length
    }
    const q = 3 * v,
        N = 16 * v,
        P = 200;

    function M(e) {
        let t = 0;
        const {
            throttled: n,
            cancel: o
        } = L((n => {
            t = _($(n)), e()
        }), P), r = () => {
            o(), t = 0
        };
        return {
            updateCustomerData: e => {
                I(e) ? r() : n(e)
            },
            resetCustomerData: r,
            getBytesCount: () => t,
            stop: () => {
                o()
            }
        }
    }

    function U(e) {
        return null === e ? "null" : Array.isArray(e) ? "array" : typeof e
    }

    function B(e, t, n = function () {
        if ("undefined" != typeof WeakSet) {
            const e = new WeakSet;
            return {
                hasAlreadyBeenSeen(t) {
                    const n = e.has(t);
                    return n || e.add(t), n
                }
            }
        }
        const e = [];
        return {
            hasAlreadyBeenSeen(t) {
                const n = e.indexOf(t) >= 0;
                return n || e.push(t), n
            }
        }
    }()) {
        if (void 0 === t) return e;
        if ("object" != typeof t || null === t) return t;
        if (t instanceof Date) return new Date(t.getTime());
        if (t instanceof RegExp) {
            const e = t.flags || [t.global ? "g" : "", t.ignoreCase ? "i" : "", t.multiline ? "m" : "", t.sticky ? "y" : "", t.unicode ? "u" : ""].join("");
            return new RegExp(t.source, e)
        }
        if (n.hasAlreadyBeenSeen(t)) return;
        if (Array.isArray(t)) {
            const o = Array.isArray(e) ? e : [];
            for (let e = 0; e < t.length; ++e) o[e] = B(o[e], t[e], n);
            return o
        }
        const o = "object" === U(e) ? e : {};
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = B(o[e], t[e], n));
        return o
    }

    function D(e) {
        return B(void 0, e)
    }

    function j(...e) {
        let t;
        for (const n of e) null != n && (t = B(t, n));
        return t
    }
    const F = 220 * v,
        G = "$",
        H = 3;

    function z(e, t = F) {
        const n = R(Object.prototype),
            o = R(Array.prototype),
            r = [],
            s = new WeakMap,
            i = W(e, G, void 0, r, s),
            a = JSON.stringify(i);
        let c = a ? a.length : 0;
        if (!(c > t)) {
            for (; r.length > 0 && c < t;) {
                const n = r.shift();
                let o = 0;
                if (Array.isArray(n.source))
                    for (let i = 0; i < n.source.length; i++) {
                        const a = W(n.source[i], n.path, i, r, s);
                        if (c += void 0 !== a ? JSON.stringify(a).length : 4, c += o, o = 1, c > t) {
                            K(t, "truncated", e);
                            break
                        }
                        n.target[i] = a
                    } else
                    for (const i in n.source)
                        if (Object.prototype.hasOwnProperty.call(n.source, i)) {
                            const a = W(n.source[i], n.path, i, r, s);
                            if (void 0 !== a && (c += JSON.stringify(a).length + o + i.length + H, o = 1), c > t) {
                                K(t, "truncated", e);
                                break
                            }
                            n.target[i] = a
                        }
            }
            return n(), o(), i
        }
        K(t, "discarded", e)
    }

    function W(e, t, n, o, r) {
        const s = function (e) {
            const t = e;
            if (t && "function" == typeof t.toJSON) try {
                return t.toJSON()
            } catch (e) { }
            return e
        }(e);
        if (!s || "object" != typeof s) return "bigint" == typeof (i = s) ? `[BigInt] ${i.toString()}` : "function" == typeof i ? `[Function] ${i.name || "unknown"}` : "symbol" == typeof i ? `[Symbol] ${i.description || i.toString()}` : i;
        var i;
        const a = J(s);
        if ("[Object]" !== a && "[Array]" !== a && "[Error]" !== a) return a;
        const c = e;
        if (r.has(c)) return `[Reference seen at ${r.get(c)}]`;
        const u = void 0 !== n ? `${t}.${n}` : t,
            l = Array.isArray(s) ? [] : {};
        return r.set(c, u), o.push({
            source: s,
            target: l,
            path: u
        }), l
    }

    function J(e) {
        try {
            if (e instanceof Event) return {
                type: (t = e).type,
                isTrusted: t.isTrusted,
                currentTarget: t.currentTarget ? J(t.currentTarget) : null,
                target: t.target ? J(t.target) : null
            };
            if (e instanceof RegExp) return `[RegExp] ${e.toString()}`;
            const n = Object.prototype.toString.call(e).match(/\[object (.*)\]/);
            if (n && n[1]) return `[${n[1]}]`
        } catch (e) { }
        var t;
        return "[Unserializable]"
    }

    function K(e, t, n) {
        a.warn(`The data provided has been ${t} as it is over the limit of ${e} characters:`, n)
    }
    class V {
        constructor(e) {
            this.onFirstSubscribe = e, this.observers = []
        }
        subscribe(e) {
            return this.observers.push(e), 1 === this.observers.length && this.onFirstSubscribe && (this.onLastUnsubscribe = this.onFirstSubscribe(this) || void 0), {
                unsubscribe: () => {
                    this.observers = this.observers.filter((t => e !== t)), !this.observers.length && this.onLastUnsubscribe && this.onLastUnsubscribe()
                }
            }
        }
        notify(e) {
            this.observers.forEach((t => t(e)))
        }
    }

    function Y(...e) {
        return new V((t => {
            const n = e.map((e => e.subscribe((e => t.notify(e)))));
            return () => n.forEach((e => e.unsubscribe()))
        }))
    }

    function Q(e) {
        let t = {};
        const n = new V,
            o = {
                getContext: () => D(t),
                setContext: r => {
                    "object" === U(r) ? (t = z(r), null == e || e.updateCustomerData(t)) : o.clearContext(), n.notify()
                },
                setContextProperty: (o, r) => {
                    t[o] = z(r), null == e || e.updateCustomerData(t), n.notify()
                },
                removeContextProperty: o => {
                    delete t[o], null == e || e.updateCustomerData(t), n.notify()
                },
                clearContext: () => {
                    t = {}, null == e || e.resetCustomerData(), n.notify()
                },
                changeObservable: n
            };
        return o
    }
    const X = {
        GRANTED: "granted",
        NOT_GRANTED: "not-granted"
    };

    function Z(e, t, n, o, r) {
        return ee(e, t, [n], o, r)
    }

    function ee(e, t, n, o, {
        once: r,
        capture: s,
        passive: i
    } = {}) {
        const a = m((t => {
            (t.isTrusted || t.__ddIsTrusted || e.allowUntrustedEvents) && (r && d(), o(t))
        })),
            c = i ? {
                capture: s,
                passive: i
            } : s,
            u = window.EventTarget && t instanceof EventTarget ? window.EventTarget.prototype : t,
            l = E(u, "addEventListener");

        function d() {
            const e = E(u, "removeEventListener");
            n.forEach((n => e.call(t, n, a, c)))
        }
        return n.forEach((e => l.call(t, e, a, c))), {
            stop: d
        }
    }
    const te = [];

    function ne(e, t, n, o) {
        const r = function (e, t) {
            return `_dd_c_${e}_${t}`
        }(n, o);

        function s() {
            const e = localStorage.getItem(r);
            return null !== e ? JSON.parse(e) : {}
        }
        te.push(Z(e, window, "storage", (({
            key: e
        }) => {
            r === e && t.setContext(s())
        }))), t.changeObservable.subscribe((function () {
            localStorage.setItem(r, JSON.stringify(t.getContext()))
        })), t.setContext(j(s(), t.getContext()))
    }
    const oe = "?";

    function re(e) {
        const t = [];
        let n = pe(e, "stack");
        const o = String(e);
        return n && n.startsWith(o) && (n = n.slice(o.length)), n && n.split("\n").forEach((e => {
            const n = function (e) {
                const t = ae.exec(e);
                if (!t) return;
                const n = t[2] && 0 === t[2].indexOf("native"),
                    o = t[2] && 0 === t[2].indexOf("eval"),
                    r = ce.exec(t[2]);
                return o && r && (t[2] = r[1], t[3] = r[2], t[4] = r[3]), {
                    args: n ? [t[2]] : [],
                    column: t[4] ? +t[4] : void 0,
                    func: t[1] || oe,
                    line: t[3] ? +t[3] : void 0,
                    url: n ? void 0 : t[2]
                }
            }(e) || function (e) {
                const t = ue.exec(e);
                if (t) return {
                    args: [],
                    column: t[3] ? +t[3] : void 0,
                    func: oe,
                    line: t[2] ? +t[2] : void 0,
                    url: t[1]
                }
            }(e) || function (e) {
                const t = le.exec(e);
                if (t) return {
                    args: [],
                    column: t[4] ? +t[4] : void 0,
                    func: t[1] || oe,
                    line: +t[3],
                    url: t[2]
                }
            }(e) || function (e) {
                const t = de.exec(e);
                if (!t) return;
                const n = t[3] && t[3].indexOf(" > eval") > -1,
                    o = fe.exec(t[3]);
                return n && o && (t[3] = o[1], t[4] = o[2], t[5] = void 0), {
                    args: t[2] ? t[2].split(",") : [],
                    column: t[5] ? +t[5] : void 0,
                    func: t[1] || oe,
                    line: t[4] ? +t[4] : void 0,
                    url: t[3]
                }
            }(e);
            n && (!n.func && n.line && (n.func = oe), t.push(n))
        })), {
            message: pe(e, "message"),
            name: pe(e, "name"),
            stack: t
        }
    }
    const se = "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)",
        ie = "(?::(\\d+))",
        ae = new RegExp(`^\\s*at (.*?) ?\\(${se}${ie}?${ie}?\\)?\\s*$`, "i"),
        ce = new RegExp(`\\((\\S*)${ie}${ie}\\)`),
        ue = new RegExp(`^\\s*at ?${se}${ie}?${ie}??\\s*$`, "i"),
        le = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
        de = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
        fe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

    function pe(e, t) {
        if ("object" != typeof e || !e || !(t in e)) return;
        const n = e[t];
        return "string" == typeof n ? n : void 0
    }
    const ge = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;

    function me() {
        const e = new Error;
        let t;
        return y((() => {
            const n = re(e);
            n.stack = n.stack.slice(2), t = ye(n)
        })), t
    }

    function ye(e) {
        let t = he(e);
        return e.stack.forEach((e => {
            const n = "?" === e.func ? "<anonymous>" : e.func,
                o = e.args && e.args.length > 0 ? `(${e.args.join(", ")})` : "",
                r = e.line ? `:${e.line}` : "",
                s = e.line && e.column ? `:${e.column}` : "";
            t += `\n  at ${n}${o} @ ${e.url}${r}${s}`
        })), t
    }

    function he(e) {
        return `${e.name || "Error"}: ${e.message}`
    }
    const be = "No stack, consider using an instance of Error";

    function ve({
        stackTrace: e,
        originalError: t,
        handlingStack: n,
        startClocks: o,
        nonErrorPrefix: r,
        source: s,
        handling: i
    }) {
        const a = Se(t),
            c = function (e, t, n, o) {
                return (null == e ? void 0 : e.message) && (null == e ? void 0 : e.name) ? e.message : t ? "Empty message" : `${n} ${$(z(o))}`
            }(e, a, r, t),
            u = function (e, t) {
                return void 0 !== t && (!!e || t.stack.length > 0 && (t.stack.length > 1 || void 0 !== t.stack[0].url))
            }(a, e) ? ye(e) : be,
            l = a ? _e(t, s) : void 0;
        return {
            startClocks: o,
            source: s,
            handling: i,
            handlingStack: n,
            originalError: t,
            type: e ? e.name : void 0,
            message: c,
            stack: u,
            causes: l,
            fingerprint: we(t)
        }
    }

    function we(e) {
        return Se(e) && "dd_fingerprint" in e ? String(e.dd_fingerprint) : void 0
    }

    function Se(e) {
        return e instanceof Error || "[object Error]" === Object.prototype.toString.call(e)
    }

    function _e(e, t) {
        let n = e;
        const o = [];
        for (; Se(null == n ? void 0 : n.cause) && o.length < 10;) {
            const e = re(n.cause);
            o.push({
                message: n.cause.message,
                source: t,
                type: null == e ? void 0 : e.name,
                stack: e && ye(e)
            }), n = n.cause
        }
        return o.length ? o : void 0
    }
    var Ee;
    ! function (e) {
        e.WRITABLE_RESOURCE_GRAPHQL = "writable_resource_graphql", e.REMOTE_CONFIGURATION = "remote_configuration", e.ACTION_NAME_MASKING = "action_name_masking", e.CONSISTENT_TRACE_SAMPLING = "consistent_trace_sampling", e.DELAY_VIEWPORT_COLLECTION = "delay_viewport_collection"
    }(Ee || (Ee = {}));
    const ke = new Set;
    const Ce = "dd0g-gov.com",
        xe = "datadoghq.com",
        Te = "pci.browser-intake-datadoghq.com",
        Le = ["ddsource", "ddtags"],
        Oe = 1e3,
        $e = 60 * Oe,
        Re = 60 * $e,
        Ae = 24 * Re * 365;

    function Ie() {
        return (new Date).getTime()
    }

    function qe() {
        return Ie()
    }

    function Ne() {
        return performance.now()
    }

    function Pe() {
        return {
            relative: Ne(),
            timeStamp: qe()
        }
    }
    let Me;

    function Ue() {
        return void 0 === Me && (Me = performance.timing.navigationStart), Me
    }

    function Be(e, t) {
        const n = window.__ddBrowserSdkExtensionCallback;
        n && n({
            type: e,
            payload: t
        })
    }

    function De(e) {
        return 0 !== e && 100 * Math.random() <= e
    }

    function je() {
        var e;
        const t = window.navigator;
        return {
            status: t.onLine ? "connected" : "not_connected",
            interfaces: t.connection && t.connection.type ? [t.connection.type] : void 0,
            effective_type: null === (e = t.connection) || void 0 === e ? void 0 : e.effectiveType
        }
    }

    function Fe(e, t) {
        const n = e.indexOf(t);
        n >= 0 && e.splice(n, 1)
    }
    const Ge = 500;

    function He() {
        const e = [];
        return {
            add: t => {
                e.push(t) > Ge && e.splice(0, 1)
            },
            remove: t => {
                Fe(e, t)
            },
            drain: t => {
                e.forEach((e => e(t))), e.length = 0
            }
        }
    }
    const ze = {
        log: "log",
        configuration: "configuration",
        usage: "usage"
    },
        We = ["https://www.datadoghq-browser-agent.com", "https://www.datad0g-browser-agent.com", "https://d3uc069fcn7uxw.cloudfront.net", "https://d20xtzwzcl0ceb.cloudfront.net", "http://localhost", "<anonymous>"],
        Je = ["ddog-gov.com"];
    let Ke = He(),
        Ve = e => {
            Ke.add((() => Ve(e)))
        };

    function Ye(e, t) {
        h(o.debug, e, t), Ve({
            type: ze.log,
            message: e,
            status: "debug",
            ...t
        })
    }

    function Qe(e, t) {
        Ve({
            type: ze.log,
            status: "error",
            ...Xe(e),
            ...t
        })
    }

    function Xe(e) {
        if (Se(e)) {
            const t = re(e);
            return {
                error: {
                    kind: t.name,
                    stack: ye(Ze(t))
                },
                message: t.message
            }
        }
        return {
            error: {
                stack: be
            },
            message: `Uncaught ${$(e)}`
        }
    }

    function Ze(e) {
        return e.stack = e.stack.filter((e => !e.url || We.some((t => e.url.startsWith(t))))), e
    }

    function et(e) {
        const t = {
            ...e
        };
        return ["id", "name", "email"].forEach((e => {
            e in t && (t[e] = String(t[e]))
        })), t
    }

    function tt(e, t) {
        t.silentMultipleInit || a.error(`${e} is already initialized.`)
    }
    const nt = {
        AGENT: "agent",
        CONSOLE: "console",
        CUSTOM: "custom",
        LOGGER: "logger",
        NETWORK: "network",
        SOURCE: "source",
        REPORT: "report"
    };

    function ot(e, t, n) {
        const o = n.getHandler(),
            r = Array.isArray(o) ? o : [o];
        return st[e] >= st[n.getLevel()] && r.includes(t)
    }
    const rt = {
        ok: "ok",
        debug: "debug",
        info: "info",
        notice: "notice",
        warn: "warn",
        error: "error",
        critical: "critical",
        alert: "alert",
        emerg: "emerg"
    },
        st = {
            [rt.ok]: 0,
            [rt.debug]: 1,
            [rt.info]: 2,
            [rt.notice]: 4,
            [rt.warn]: 5,
            [rt.error]: 6,
            [rt.critical]: 7,
            [rt.alert]: 8,
            [rt.emerg]: 9
        };

    function it(e, {
        includeMessage: t = !1
    } = {}) {
        return {
            stack: e.stack,
            kind: e.type,
            message: t ? e.message : void 0,
            causes: e.causes,
            fingerprint: e.fingerprint,
            handling: e.handling
        }
    }
    const at = "console",
        ct = "http",
        ut = Object.keys(rt);
    class lt {
        constructor(e, t, n, o = ct, r = rt.debug, s = {}) {
            this.handleLogStrategy = e, this.handlerType = o, this.level = r, this.contextManager = Q(t), this.contextManager.setContext(s), n && this.contextManager.setContextProperty("logger", {
                name: n
            })
        }
        logImplementation(e, t, n = rt.info, o, r) {
            const s = z(t);
            let i;
            i = null != o ? j({
                error: it(ve({
                    stackTrace: Se(o) ? re(o) : void 0,
                    originalError: o,
                    nonErrorPrefix: "Provided",
                    source: nt.LOGGER,
                    handling: "handled",
                    startClocks: Pe()
                }), {
                    includeMessage: !0
                })
            }, s) : s, this.handleLogStrategy({
                message: z(e),
                context: i,
                status: n
            }, this, r)
        }
        log(e, t, n = rt.info, o) {
            let r;
            ot(n, ct, this) && (r = me()), this.logImplementation(e, t, n, o, r)
        }
        setContext(e) {
            this.contextManager.setContext(e)
        }
        getContext() {
            return this.contextManager.getContext()
        }
        setContextProperty(e, t) {
            this.contextManager.setContextProperty(e, t)
        }
        removeContextProperty(e) {
            this.contextManager.removeContextProperty(e)
        }
        clearContext() {
            this.contextManager.clearContext()
        }
        setHandler(e) {
            this.handlerType = e
        }
        getHandler() {
            return this.handlerType
        }
        setLevel(e) {
            this.level = e
        }
        getLevel() {
            return this.level
        }
    }

    function dt(e) {
        return function (t, n, o) {
            let r;
            ot(e, ct, this) && (r = me()), this.logImplementation(t, n, e, o, r)
        }
    }

    function ft() {
        const e = b().DatadogEventBridge;
        if (e) return {
            getCapabilities() {
                var t;
                return JSON.parse((null === (t = e.getCapabilities) || void 0 === t ? void 0 : t.call(e)) || "[]")
            },
            getPrivacyLevel() {
                var t;
                return null === (t = e.getPrivacyLevel) || void 0 === t ? void 0 : t.call(e)
            },
            getAllowedWebViewHosts: () => JSON.parse(e.getAllowedWebViewHosts()),
            send(t, n, o) {
                const r = o ? {
                    id: o
                } : void 0;
                e.send(JSON.stringify({
                    eventType: t,
                    event: n,
                    view: r
                }))
            }
        }
    }

    function pt(e) {
        var t;
        void 0 === e && (e = null === (t = b().location) || void 0 === t ? void 0 : t.hostname);
        const n = ft();
        return !!n && n.getAllowedWebViewHosts().some((t => e === t || e.endsWith(`.${t}`)))
    }

    function gt(e, t, n, {
        computeHandlingStack: o
    } = {}) {
        let r = e[t];
        if ("function" != typeof r) {
            if (!(t in e) || !t.startsWith("on")) return {
                stop: O
            };
            r = O
        }
        let s = !1;
        const i = function () {
            if (s) return r.apply(this, arguments);
            const e = Array.from(arguments);
            let t;
            y(n, null, [{
                target: this,
                parameters: e,
                onPostCall: e => {
                    t = e
                },
                handlingStack: o ? me() : void 0
            }]);
            const i = r.apply(this, e);
            return t && y(t, null, [i]), i
        };
        return e[t] = i, {
            stop: () => {
                s = !0, e[t] === i && (e[t] = r)
            }
        }
    }

    function mt(e) {
        return function (e, t) {
            const n = function () {
                if (void 0 === ht) try {
                    const e = new yt("http://test/path");
                    ht = "http://test/path" === e.href
                } catch (e) {
                    ht = !1
                }
                return ht ? yt : void 0
            }();
            if (n) try {
                return void 0 !== t ? new n(e, t) : new n(e)
            } catch (n) {
                throw new Error(`Failed to construct URL: ${String(n)} ${$({ url: e, base: t })}`)
            }
            if (void 0 === t && !/:/.test(e)) throw new Error(`Invalid URL: '${e}'`);
            let o = document;
            const r = o.createElement("a");
            if (void 0 !== t) {
                o = document.implementation.createHTMLDocument("");
                const e = o.createElement("base");
                e.href = t, o.head.appendChild(e), o.body.appendChild(r)
            }
            return r.href = e, r
        }(e, location.href).href
    } (function (e, t, n, o) {
        var r, s = arguments.length,
            i = s < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, n, o);
        else
            for (var a = e.length - 1; a >= 0; a--)(r = e[a]) && (i = (s < 3 ? r(i) : s > 3 ? r(t, n, i) : r(t, n)) || i);
        s > 3 && i && Object.defineProperty(t, n, i)
    })([function (e, t, n) {
        const o = n.value;
        n.value = function (...e) {
            return (f ? m(o) : o).apply(this, e)
        }
    }], lt.prototype, "logImplementation", null), lt.prototype.ok = dt(rt.ok), lt.prototype.debug = dt(rt.debug), lt.prototype.info = dt(rt.info), lt.prototype.notice = dt(rt.notice), lt.prototype.warn = dt(rt.warn), lt.prototype.error = dt(rt.error), lt.prototype.critical = dt(rt.critical), lt.prototype.alert = dt(rt.alert), lt.prototype.emerg = dt(rt.emerg);
    const yt = URL;
    let ht, bt;

    function vt() {
        return bt || (bt = new V((e => {
            if (!window.fetch) return;
            const {
                stop: t
            } = gt(window, "fetch", (t => function ({
                parameters: e,
                onPostCall: t,
                handlingStack: n
            }, o) {
                const [r, s] = e;
                let i = s && s.method;
                void 0 === i && r instanceof Request && (i = r.method);
                const a = void 0 !== i ? String(i).toUpperCase() : "GET",
                    c = r instanceof Request ? r.url : mt(String(r)),
                    u = {
                        state: "start",
                        init: s,
                        input: r,
                        method: a,
                        startClocks: Pe(),
                        url: c,
                        handlingStack: n
                    };
                o.notify(u), e[0] = u.input, e[1] = u.init, t((e => function (e, t, n) {
                    const o = n;

                    function r(t) {
                        o.state = "resolve", Object.assign(o, t), e.notify(o)
                    }
                    t.then(m((e => {
                        r({
                            response: e,
                            responseType: e.type,
                            status: e.status,
                            isAborted: !1
                        })
                    })), m((e => {
                        var t, n;
                        r({
                            status: 0,
                            isAborted: (null === (n = null === (t = o.init) || void 0 === t ? void 0 : t.signal) || void 0 === n ? void 0 : n.aborted) || e instanceof DOMException && e.code === DOMException.ABORT_ERR,
                            error: e
                        })
                    })))
                }(o, e, u)))
            }(t, e)), {
                computeHandlingStack: !0
            });
            return t
        }))), bt
    }

    function wt(e) {
        return e ? (parseInt(e, 10) ^ 16 * Math.random() >> parseInt(e, 10) / 4).toString(16) : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, wt)
    }
    const St = /([\w-]+)\s*=\s*([^;]+)/g;

    function _t(e, t, n = "") {
        const o = e.charCodeAt(t - 1),
            r = o >= 55296 && o <= 56319 ? t + 1 : t;
        return e.length <= r ? e : `${e.slice(0, r)}${n}`
    }
    let Et, kt, Ct;

    function xt(e, t, n = 0, o) {
        const r = new Date;
        r.setTime(r.getTime() + n);
        const s = `expires=${r.toUTCString()}`,
            i = o && o.crossSite ? "none" : "strict",
            a = o && o.domain ? `;domain=${o.domain}` : "",
            c = o && o.secure ? ";secure" : "",
            u = o && o.partitioned ? ";partitioned" : "";
        document.cookie = `${e}=${t};${s};path=/;samesite=${i}${a}${c}${u}`
    }

    function Tt(e) {
        return function (e, t) {
            for (St.lastIndex = 0; ;) {
                const n = St.exec(e);
                if (!n) break;
                if (n[1] === t) return n[2]
            }
        }(document.cookie, e)
    }

    function Lt(e) {
        return kt || (kt = function (e) {
            const t = new Map;
            for (St.lastIndex = 0; ;) {
                const n = St.exec(e);
                if (!n) break;
                t.set(n[1], n[2])
            }
            return t
        }(document.cookie)), kt.get(e)
    }

    function Ot(e, t) {
        xt(e, "", 0, t)
    }
    const $t = "_dd_s";

    function Rt(e) {
        return Object.values(e)
    }
    const At = 4 * Re,
        It = 15 * $e,
        qt = Ae,
        Nt = {
            COOKIE: "cookie",
            LOCAL_STORAGE: "local-storage"
        },
        Pt = /^([a-zA-Z]+)=([a-z0-9-]+)$/,
        Mt = "&",
        Ut = "1";

    function Bt(e, t) {
        const n = {
            isExpired: Ut
        };
        return t.trackAnonymousUser && ((null == e ? void 0 : e.anonymousId) ? n.anonymousId = null == e ? void 0 : e.anonymousId : n.anonymousId = Math.floor(Math.random() * Math.pow(36, 10)).toString(36).padStart(10, "0")), n
    }

    function Dt(e) {
        return I(e)
    }

    function jt(e) {
        return !Dt(e)
    }

    function Ft(e) {
        return void 0 !== e.isExpired || !((void 0 === (t = e).created || Ie() - Number(t.created) < At) && (void 0 === t.expire || Ie() < Number(t.expire)));
        var t
    }

    function Gt(e) {
        e.expire = String(Ie() + It)
    }

    function Ht(e) {
        return (t = e, Object.entries(t)).map((([e, t]) => "anonymousId" === e ? `aid=${t}` : `${e}=${t}`)).join(Mt);
        var t
    }

    function zt(e) {
        const t = {};
        return function (e) {
            return !!e && (-1 !== e.indexOf(Mt) || Pt.test(e))
        }(e) && e.split(Mt).forEach((e => {
            const n = Pt.exec(e);
            if (null !== n) {
                const [, e, o] = n;
                "aid" === e ? t.anonymousId = o : t[e] = o
            }
        })), t
    }
    const Wt = "_dd",
        Jt = "_dd_r",
        Kt = "_dd_l",
        Vt = "rum",
        Yt = "logs";

    function Qt(e) {
        const t = function (e) {
            const t = {};
            return t.secure = !!e.useSecureSessionCookie || !!e.usePartitionedCrossSiteSessionCookie, t.crossSite = !!e.usePartitionedCrossSiteSessionCookie, t.partitioned = !!e.usePartitionedCrossSiteSessionCookie, e.trackSessionAcrossSubdomains && (t.domain = function () {
                if (void 0 === Ct) {
                    const e = `dd_site_test_${wt()}`,
                        t = "test",
                        n = window.location.hostname.split(".");
                    let o = n.pop();
                    for (; n.length && !Tt(e);) o = `${n.pop()}.${o}`, xt(e, t, Oe, {
                        domain: o
                    });
                    Ot(e, {
                        domain: o
                    }), Ct = o
                }
                return Ct
            }()), t
        }(e);
        return function (e) {
            if (void 0 === document.cookie || null === document.cookie) return !1;
            try {
                const t = `dd_cookie_test_${wt()}`,
                    n = "test";
                xt(t, n, $e, e);
                const o = Tt(t) === n;
                return Ot(t, e), o
            } catch (e) {
                return a.error(e), !1
            }
        }(t) ? {
            type: Nt.COOKIE,
            cookieOptions: t
        } : void 0
    }

    function Xt() {
        return zt(Tt($t))
    }
    const Zt = "_dd_test_";

    function en() {
        try {
            const e = wt(),
                t = `${Zt}${e}`;
            localStorage.setItem(t, e);
            const n = localStorage.getItem(t);
            return localStorage.removeItem(t), e === n ? {
                type: Nt.LOCAL_STORAGE
            } : void 0
        } catch (e) {
            return
        }
    }

    function tn(e) {
        localStorage.setItem($t, Ht(e))
    }

    function nn() {
        return zt(localStorage.getItem($t))
    }
    const on = 10,
        rn = 100,
        sn = [];
    let an;

    function cn(e, t, n = 0) {
        var o;
        const {
            isLockEnabled: r,
            persistSession: s,
            expireSession: i
        } = t, a = e => s({
            ...e,
            lock: u
        }), c = () => {
            const e = t.retrieveSession(),
                n = e.lock;
            return e.lock && delete e.lock, {
                session: e,
                lock: n
            }
        };
        if (an || (an = e), e !== an) return void sn.push(e);
        if (r && n >= rn) return void ln(t);
        let u, l = c();
        if (r) {
            if (l.lock) return void un(e, t, n);
            if (u = wt(), a(l.session), l = c(), l.lock !== u) return void un(e, t, n)
        }
        let d = e.process(l.session);
        if (r && (l = c(), l.lock !== u)) un(e, t, n);
        else {
            if (d && (Ft(d) ? i(d) : (Gt(d), r ? a(d) : s(d))), r && (!d || !Ft(d))) {
                if (l = c(), l.lock !== u) return void un(e, t, n);
                s(l.session), d = l.session
            }
            null === (o = e.after) || void 0 === o || o.call(e, d || l.session), ln(t)
        }
    }

    function un(e, t, n) {
        k((() => {
            cn(e, t, n + 1)
        }), on)
    }

    function ln(e) {
        an = void 0;
        const t = sn.shift();
        t && cn(t, e)
    }
    const dn = Oe;

    function fn(e) {
        switch (e.sessionPersistence) {
            case Nt.COOKIE:
                return Qt(e);
            case Nt.LOCAL_STORAGE:
                return en();
            case void 0: {
                let t = Qt(e);
                return !t && e.allowFallbackToLocalStorage && (t = en()), t
            }
            default:
                a.error(`Invalid session persistence '${String(e.sessionPersistence)}'`)
        }
    }

    function pn(e, t, n, o) {
        const r = new V,
            s = new V,
            i = new V,
            a = e.type === Nt.COOKIE ? function (e, t) {
                const n = {
                    isLockEnabled: 0 === (null != Et ? Et : Et = function (e = window) {
                        var t;
                        const n = e.navigator.userAgent;
                        return e.chrome || /HeadlessChrome/.test(n) ? 0 : 0 === (null === (t = e.navigator.vendor) || void 0 === t ? void 0 : t.indexOf("Apple")) || /safari/i.test(n) && !/chrome|android/i.test(n) ? 1 : 2
                    }()),
                    persistSession: (o = t, e => {
                        xt($t, Ht(e), It, o)
                    }),
                    retrieveSession: Xt,
                    expireSession: n => function (e, t, n) {
                        const o = Bt(t, n);
                        xt($t, Ht(o), n.trackAnonymousUser ? qt : At, e)
                    }(t, n, e)
                };
                var o;
                return function (e) {
                    if (!Lt($t)) {
                        const t = Lt(Wt),
                            n = Lt(Jt),
                            o = Lt(Kt),
                            r = {};
                        t && (r.id = t), o && /^[01]$/.test(o) && (r[Yt] = o), n && /^[012]$/.test(n) && (r[Vt] = n), jt(r) && (Gt(r), e.persistSession(r))
                    }
                }(n), n
            }(t, e.cookieOptions) : function (e) {
                return {
                    isLockEnabled: !1,
                    persistSession: tn,
                    retrieveSession: nn,
                    expireSession: t => function (e, t) {
                        tn(Bt(e, t))
                    }(t, e)
                }
            }(t),
            {
                expireSession: c
            } = a,
            u = x((function () {
                cn({
                    process: e => Ft(e) ? Bt(e, t) : void 0,
                    after: p
                }, a)
            }), dn);
        let l;
        g();
        const {
            throttled: d,
            cancel: f
        } = L((() => {
            cn({
                process: e => {
                    if (Dt(e)) return;
                    const t = p(e);
                    return function (e) {
                        if (Dt(e)) return !1;
                        const {
                            trackingType: t,
                            isTracked: r
                        } = o(e[n]);
                        e[n] = t, delete e.isExpired, r && !e.id && (e.id = wt(), e.created = String(Ie()))
                    }(t), t
                },
                after: e => {
                    jt(e) && !m() && function (e) {
                        l = e, r.notify()
                    }(e), l = e
                }
            }, a)
        }), dn);

        function p(e) {
            return Ft(e) && (e = Bt(e, t)), m() && (function (e) {
                return l.id !== e.id || l[n] !== e[n]
            }(e) ? (l = Bt(l, t), s.notify()) : (i.notify({
                previousState: l,
                newState: e
            }), l = e)), e
        }

        function g() {
            cn({
                process: e => {
                    if (Dt(e)) return Bt(e, t)
                },
                after: e => {
                    l = e
                }
            }, a)
        }

        function m() {
            return void 0 !== l[n]
        }
        return {
            expandOrRenewSession: d,
            expandSession: function () {
                cn({
                    process: e => m() ? p(e) : void 0
                }, a)
            },
            getSession: () => l,
            renewObservable: r,
            expireObservable: s,
            sessionStateUpdateObservable: i,
            restartSession: g,
            expire: () => {
                f(), c(l), p(Bt(l, t))
            },
            stop: () => {
                T(u)
            },
            updateSessionState: function (e) {
                cn({
                    process: t => ({
                        ...t,
                        ...e
                    }),
                    after: p
                }, a)
            }
        }
    }

    function gn(e, t, n) {
        const o = function (e, t) {
            const n = `/api/v2/${t}`,
                o = e.proxy;
            if ("string" == typeof o) {
                const e = mt(o);
                return t => `${e}?ddforward=${encodeURIComponent(`${n}?${t}`)}`
            }
            if ("function" == typeof o) return e => o({
                path: n,
                parameters: e
            });
            const r = function (e, t) {
                const {
                    site: n = xe,
                    internalAnalyticsSubdomain: o
                } = t;
                if ("logs" === e && t.usePciIntake && n === xe) return Te;
                if (o && n === xe) return `${o}.${xe}`;
                if (n === Ce) return `http-intake.logs.${n}`;
                const r = n.split("."),
                    s = r.pop();
                return `browser-intake-${r.join("-")}.${s}`
            }(t, e);
            return e => `https://${r}${n}?${e}`
        }(e, t);
        return {
            build(r, s) {
                const i = function ({
                    clientToken: e,
                    internalAnalyticsSubdomain: t
                }, n, o, r, {
                    retry: s,
                    encoding: i
                }) {
                    const a = ["sdk_version:6.0.0", `api:${r}`].concat(o);
                    s && a.push(`retry_count:${s.count}`, `retry_after:${s.lastFailureStatus}`);
                    const c = ["ddsource=browser", `ddtags=${encodeURIComponent(a.join(","))}`, `dd-api-key=${e}`, `dd-evp-origin-version=${encodeURIComponent("6.0.0")}`, "dd-evp-origin=browser", `dd-request-id=${wt()}`];
                    return i && c.push(`dd-evp-encoding=${i}`), "rum" === n && c.push(`batch_time=${qe()}`), t && c.reverse(), c.join("&")
                }(e, t, n, r, s);
                return o(i)
            },
            urlPrefix: o(""),
            trackType: t
        }
    }
    const mn = 200;

    function yn(e, t) {
        const n = mn - e.length - 1;
        return (t.length > n || function (e) {
            return !! function () {
                try {
                    return new RegExp("[\\p{Ll}]", "u"), !0
                } catch (e) {
                    return !1
                }
            }() && new RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u").test(e)
        }(t)) && a.warn(`${e} value doesn't meet tag requirements and will be sanitized. ${l} ${c}/getting_started/tagging/#defining-tags`), `${e}:${t.replace(/,/g, "_")}`
    }

    function hn(e) {
        const t = e.site || xe,
            n = function (e) {
                const {
                    env: t,
                    service: n,
                    version: o,
                    datacenter: r
                } = e, s = [];
                return t && s.push(yn("env", t)), n && s.push(yn("service", n)), o && s.push(yn("version", o)), r && s.push(yn("datacenter", r)), s
            }(e),
            o = function (e, t) {
                return {
                    logsEndpointBuilder: gn(e, "logs", t),
                    rumEndpointBuilder: gn(e, "rum", t),
                    sessionReplayEndpointBuilder: gn(e, "replay", t)
                }
            }(e, n),
            r = function (e, t) {
                if (!e.replica) return;
                const n = {
                    ...e,
                    site: xe,
                    clientToken: e.replica.clientToken
                },
                    o = {
                        logsEndpointBuilder: gn(n, "logs", t),
                        rumEndpointBuilder: gn(n, "rum", t)
                    };
                return {
                    applicationId: e.replica.applicationId,
                    ...o
                }
            }(e, n);
        return {
            replica: r,
            site: t,
            ...o
        }
    }

    function bn(e, t) {
        return null == e || "string" == typeof e || (a.error(`${t} must be defined as a string`), !1)
    }

    function vn(e, t) {
        return !!(void 0 === e || (n = e, function (e) {
            return "number" == typeof e
        }(n) && n >= 0 && n <= 100)) || (a.error(`${t} Sample Rate should be a number between 0 and 100`), !1);
        var n
    }
    const wn = {
        intervention: "intervention",
        deprecation: "deprecation",
        cspViolation: "csp_violation"
    };

    function Sn(e) {
        return {
            startClocks: Pe(),
            source: nt.REPORT,
            handling: "unhandled",
            ...e
        }
    }

    function _n(e, t, n, o, r) {
        return n ? ye({
            name: e,
            message: t,
            stack: [{
                func: "?",
                url: n,
                line: null != o ? o : void 0,
                column: null != r ? r : void 0
            }]
        }) : void 0
    }
    const En = 32 * v;

    function kn(e, t, n) {
        return void 0 === e ? [] : "all" === e || Array.isArray(e) && e.every((e => t.includes(e))) ? "all" === e ? t : function (e) {
            const t = new Set;
            return e.forEach((e => t.add(e))), Array.from(t)
        }(e) : void a.error(`${n} should be "all" or an array with allowed values "${t.join('", "')}"`)
    }

    function Cn(e, t, n) {
        const r = He();
        let s, i;
        const u = t.observable.subscribe(f);

        function f() {
            if (!i || !s || !t.isGranted()) return;
            u.unsubscribe();
            const e = n(s, i);
            r.drain(e)
        }
        return {
            init(e) {
                if (!e) return void a.error("Missing configuration");
                if (n = e.enableExperimentalFeatures, Array.isArray(n) && n.filter((e => A(Ee, e))).forEach((e => {
                    ke.add(e)
                })), pt() && (e = function (e) {
                    return {
                        ...e,
                        clientToken: "empty"
                    }
                }(e)), s = e, i) return void tt("DD_LOGS", e);
                var n;
                const r = function (e) {
                    !0 === e.usePciIntake && e.site && "datadoghq.com" !== e.site && a.warn("PCI compliance for Logs is only available for Datadog organizations in the US1 site. Default intake will be used.");
                    const t = function (e) {
                        var t, n, o, r, s, i;
                        if (e && e.clientToken) {
                            if ((!(u = e.site) || "string" != typeof u || /(datadog|ddog|datad0g|dd0g)/.test(u) || (a.error(`Site should be a valid Datadog site. ${l} ${c}/getting_started/site/.`), 0)) && vn(e.sessionSampleRate, "Session") && vn(e.telemetrySampleRate, "Telemetry") && vn(e.telemetryConfigurationSampleRate, "Telemetry Configuration") && vn(e.telemetryUsageSampleRate, "Telemetry Usage") && bn(e.version, "Version") && bn(e.env, "Env") && bn(e.service, "Service")) {
                                var u;
                                if (void 0 === e.trackingConsent || A(X, e.trackingConsent)) return {
                                    beforeSend: e.beforeSend && d(e.beforeSend, "beforeSend threw an error:"),
                                    sessionStoreStrategyType: fn(e),
                                    sessionSampleRate: null !== (t = e.sessionSampleRate) && void 0 !== t ? t : 100,
                                    telemetrySampleRate: null !== (n = e.telemetrySampleRate) && void 0 !== n ? n : 20,
                                    telemetryConfigurationSampleRate: null !== (o = e.telemetryConfigurationSampleRate) && void 0 !== o ? o : 5,
                                    telemetryUsageSampleRate: null !== (r = e.telemetryUsageSampleRate) && void 0 !== r ? r : 5,
                                    service: e.service || void 0,
                                    silentMultipleInit: !!e.silentMultipleInit,
                                    allowUntrustedEvents: !!e.allowUntrustedEvents,
                                    trackingConsent: null !== (s = e.trackingConsent) && void 0 !== s ? s : X.GRANTED,
                                    trackAnonymousUser: null === (i = e.trackAnonymousUser) || void 0 === i || i,
                                    storeContextsAcrossPages: !!e.storeContextsAcrossPages,
                                    batchBytesLimit: 16 * v,
                                    eventRateLimiterThreshold: 3e3,
                                    maxTelemetryEventsPerPage: 15,
                                    flushTimeout: 30 * Oe,
                                    batchMessagesLimit: 50,
                                    messageBytesLimit: 256 * v,
                                    ...hn(e)
                                };
                                a.error('Tracking Consent should be either "granted" or "not-granted"')
                            }
                        } else a.error("Client Token is not configured, we will not send any data.")
                    }(e),
                        n = kn(e.forwardConsoleLogs, Rt(o), "Forward Console Logs"),
                        r = kn(e.forwardReports, Rt(wn), "Forward Reports");
                    if (t && n && r) return e.forwardErrorsToLogs && !n.includes(o.error) && n.push(o.error), {
                        forwardErrorsToLogs: !1 !== e.forwardErrorsToLogs,
                        forwardConsoleLogs: n,
                        forwardReports: r,
                        requestErrorResponseLengthLimit: En,
                        ...t
                    }
                }(e);
                r && (i = r, vt().subscribe(O), t.tryToInit(r.trackingConsent), f())
            },
            get initConfiguration() {
                return s
            },
            getInternalContext: O,
            handleLog(t, n, o, s = e(), i = qe()) {
                r.add((e => e.handleLog(t, n, o, s, i)))
            }
        }
    }
    const xn = "logs",
        Tn = {
            HIDDEN: "visibility_hidden",
            UNLOADING: "before_unload",
            PAGEHIDE: "page_hide",
            FROZEN: "page_frozen"
        },
        Ln = "datadog-synthetics-public-id",
        On = "datadog-synthetics-result-id",
        $n = "datadog-synthetics-injects-rum";

    function Rn() {
        return Boolean(window._DATADOG_SYNTHETICS_INJECTS_RUM || Lt($n))
    }

    function An() {
        const e = window._DATADOG_SYNTHETICS_PUBLIC_ID || Lt(Ln);
        return "string" == typeof e ? e : void 0
    }

    function In() {
        const e = window._DATADOG_SYNTHETICS_RESULT_ID || Lt(On);
        return "string" == typeof e ? e : void 0
    }
    const qn = 1 / 0,
        Nn = $e;
    const Pn = $e,
        Mn = At;
    let Un = [];

    function Bn(e, t, n, o) {
        const r = new V,
            s = new V,
            i = pn(e.sessionStoreStrategyType, e, t, n);
        Un.push((() => i.stop()));
        const a = function ({
            expireDelay: e,
            maxEntries: t
        }) {
            let n = [];
            const o = x((() => function () {
                const t = Ne() - e;
                for (; n.length > 0 && n[n.length - 1].endTime < t;) n.pop()
            }()), Nn);
            return {
                add: function (e, o) {
                    const r = {
                        value: e,
                        startTime: o,
                        endTime: qn,
                        remove: () => {
                            Fe(n, r)
                        },
                        close: e => {
                            r.endTime = e
                        }
                    };
                    return t && n.length >= t && n.pop(), n.unshift(r), r
                },
                find: function (e = qn, t = {
                    returnInactive: !1
                }) {
                    for (const o of n)
                        if (o.startTime <= e) {
                            if (t.returnInactive || e <= o.endTime) return o.value;
                            break
                        }
                },
                closeActive: function (e) {
                    const t = n[0];
                    t && t.endTime === qn && t.close(e)
                },
                findAll: function (e = qn, t = 0) {
                    const o = e + t;
                    return n.filter((t => t.startTime <= o && e <= t.endTime)).map((e => e.value))
                },
                reset: function () {
                    n = []
                },
                stop: function () {
                    T(o)
                }
            }
        }({
            expireDelay: Mn
        });

        function c() {
            return {
                id: i.getSession().id,
                trackingType: i.getSession()[t],
                isReplayForced: !!i.getSession().forcedReplay,
                anonymousId: i.getSession().anonymousId
            }
        }
        return Un.push((() => a.stop())), i.renewObservable.subscribe((() => {
            a.add(c(), Ne()), r.notify()
        })), i.expireObservable.subscribe((() => {
            s.notify(), a.closeActive(Ne())
        })), i.expandOrRenewSession(), a.add(c(), [0, Ue()][0]), o.observable.subscribe((() => {
            o.isGranted() ? i.expandOrRenewSession() : i.expire()
        })),
            function (e, t) {
                const {
                    stop: n
                } = ee(e, window, ["click", "touchstart", "keydown", "scroll"], (() => {
                    o.isGranted() && i.expandOrRenewSession()
                }), {
                    capture: !0,
                    passive: !0
                });
                Un.push(n)
            }(e),
            function (e, t) {
                const n = () => {
                    "visible" === document.visibilityState && i.expandSession()
                },
                    {
                        stop: o
                    } = Z(e, document, "visibilitychange", n);
                Un.push(o);
                const r = x(n, Pn);
                Un.push((() => {
                    T(r)
                }))
            }(e),
            function (e, t) {
                const {
                    stop: n
                } = Z(e, window, "resume", (() => i.restartSession()), {
                    capture: !0
                });
                Un.push(n)
            }(e), {
            findSession: (e, t) => a.find(e, t),
            renewObservable: r,
            expireObservable: s,
            sessionStateUpdateObservable: i.sessionStateUpdateObservable,
            expire: i.expire,
            updateSessionState: i.updateSessionState
        }
    }

    function Dn(e) {
        return De(e.sessionSampleRate) ? "1" : "0"
    }
    let jn = !1;

    function Fn(e) {
        const t = window;
        if (Rn()) {
            const e = n(t.DD_RUM_SYNTHETICS);
            return e || jn || (jn = !0, Ye("Logs sent before RUM is injected by the synthetics worker", {
                testId: An(),
                resultId: In()
            })), e
        }
        return n(t.DD_RUM);

        function n(t) {
            if (t && t.getInternalContext) return t.getInternalContext(e)
        }
    }

    function Gn(e, t, n, o, r) {
        const s = ut.concat(["custom"]),
            i = {};
        s.forEach((e => {
            i[e] = function (e, t, n) {
                let o = 0,
                    r = !1;
                return {
                    isLimitReached() {
                        if (0 === o && k((() => {
                            o = 0
                        }), $e), o += 1, o <= t || r) return r = !1, !1;
                        if (o === t + 1) {
                            r = !0;
                            try {
                                n({
                                    message: `Reached max number of ${e}s by minute: ${t}`,
                                    source: nt.AGENT,
                                    startClocks: Pe()
                                })
                            } finally {
                                r = !1
                            }
                        }
                        return !0
                    }
                }
            }(e, t.eventRateLimiterThreshold, r)
        })), n.subscribe(0, (({
            rawLogsEvent: r,
            messageContext: s,
            savedCommonContext: a,
            domainContext: c
        }) => {
            var u, l;
            const d = r.date - Ue(),
                f = e.findTrackedSession(d);
            if (!e.findTrackedSession(d, {
                returnInactive: !0
            })) return;
            const p = a || o();
            f && f.anonymousId && !p.user.anonymous_id && (p.user.anonymous_id = f.anonymousId);
            const g = j({
                service: t.service,
                session_id: f ? f.id : void 0,
                session: f ? {
                    id: f.id
                } : void 0,
                usr: I(p.user) ? void 0 : p.user,
                view: p.view
            }, p.context, Fn(d), r, s);
            !1 === (null === (u = t.beforeSend) || void 0 === u ? void 0 : u.call(t, g, c)) || g.origin !== nt.AGENT && (null !== (l = i[g.status]) && void 0 !== l ? l : i.custom).isLimitReached() || n.notify(1, g)
        }))
    }
    let Hn = {};
    const zn = {
        [o.log]: rt.info,
        [o.debug]: rt.debug,
        [o.info]: rt.info,
        [o.warn]: rt.warn,
        [o.error]: rt.error
    };
    let Wn;
    const Jn = new WeakMap;

    function Kn({
        target: e,
        parameters: [t, n]
    }) {
        Jn.set(e, {
            state: "open",
            method: String(t).toUpperCase(),
            url: mt(String(n))
        })
    }

    function Vn({
        target: e
    }) {
        const t = Jn.get(e);
        t && (t.isAborted = !0)
    }

    function Yn(e) {
        return e >= 500
    }

    function Qn(e, t) {
        if (!e.forwardErrorsToLogs) return {
            stop: O
        };
        const n = function (e) {
            return Wn || (Wn = function (e) {
                return new V((t => {
                    const {
                        stop: n
                    } = gt(XMLHttpRequest.prototype, "open", Kn), {
                        stop: o
                    } = gt(XMLHttpRequest.prototype, "send", (n => {
                        ! function ({
                            target: e,
                            handlingStack: t
                        }, n, o) {
                            const r = Jn.get(e);
                            if (!r) return;
                            const s = r;
                            s.state = "start", s.startClocks = Pe(), s.isAborted = !1, s.xhr = e, s.handlingStack = t;
                            let i = !1;
                            const {
                                stop: a
                            } = gt(e, "onreadystatechange", (() => {
                                e.readyState === XMLHttpRequest.DONE && c()
                            })), c = () => {
                                if (u(), a(), i) return;
                                i = !0;
                                const t = r;
                                var n, c;
                                t.state = "complete", t.duration = (n = s.startClocks.timeStamp, qe() - n), t.status = e.status, o.notify((c = t, {
                                    ...c
                                }))
                            }, {
                                stop: u
                            } = Z(n, e, "loadend", c);
                            o.notify(s)
                        }(n, e, t)
                    }), {
                        computeHandlingStack: !0
                    }), {
                        stop: r
                    } = gt(XMLHttpRequest.prototype, "abort", Vn);
                    return () => {
                        n(), o(), r()
                    }
                }))
            }(e)), Wn
        }(e).subscribe((e => {
            "complete" === e.state && r("xhr", e)
        })),
            o = vt().subscribe((e => {
                "resolve" === e.state && r("fetch", e)
            }));

        function r(n, o) {
            var r;

            function s(e) {
                const r = {
                    isAborted: o.isAborted,
                    handlingStack: o.handlingStack
                };
                t.notify(0, {
                    rawLogsEvent: {
                        message: `${Zn(n)} error ${o.method} ${o.url}`,
                        date: o.startClocks.timeStamp,
                        error: {
                            stack: e || "Failed to load",
                            handling: void 0
                        },
                        http: {
                            method: o.method,
                            status_code: o.status,
                            url: o.url
                        },
                        status: rt.error,
                        origin: nt.NETWORK
                    },
                    domainContext: r
                })
            }
            r = o.url, Le.every((e => r.includes(e))) || ! function (e) {
                return 0 === e.status && "opaque" !== e.responseType
            }(o) && !Yn(o.status) || ("xhr" in o ? function (e, t, n) {
                "string" == typeof e.response ? n(Xn(e.response, t)) : n(e.response)
            }(o.xhr, e, s) : o.response ? function (e, t, n) {
                const o = function (e) {
                    try {
                        return e.clone()
                    } catch (e) {
                        return
                    }
                }(e);
                o && o.body ? window.TextDecoder ? function (e, t, n) {
                    ! function (e, t, n) {
                        const o = e.getReader(),
                            r = [];
                        let s = 0;

                        function i() {
                            let e, i;
                            if (o.cancel().catch(O), n.collectStreamBody) {
                                let t;
                                if (1 === r.length) t = r[0];
                                else {
                                    t = new Uint8Array(s);
                                    let e = 0;
                                    r.forEach((n => {
                                        t.set(n, e), e += n.length
                                    }))
                                }
                                e = t.slice(0, n.bytesLimit), i = t.length > n.bytesLimit
                            }
                            t(void 0, e, i)
                        } ! function e() {
                            o.read().then(m((t => {
                                t.done ? i() : (n.collectStreamBody && r.push(t.value), s += t.value.length, s > n.bytesLimit ? i() : e())
                            })), m((e => t(e))))
                        }()
                    }(e, ((e, t, o) => {
                        if (e) n(e);
                        else {
                            let e = (new TextDecoder).decode(t);
                            o && (e += "..."), n(void 0, e)
                        }
                    }), {
                        bytesLimit: t,
                        collectStreamBody: !0
                    })
                }(o.body, t.requestErrorResponseLengthLimit, ((e, t) => {
                    n(e ? `Unable to retrieve response: ${e}` : t)
                })) : o.text().then(m((e => n(Xn(e, t)))), m((e => n(`Unable to retrieve response: ${e}`)))) : n()
            }(o.response, e, s) : o.error && function (e, t, n) {
                n(Xn(ye(re(e)), t))
            }(o.error, e, s))
        }
        return {
            stop: () => {
                n.unsubscribe(), o.unsubscribe()
            }
        }
    }

    function Xn(e, t) {
        return e.length > t.requestErrorResponseLengthLimit ? `${e.substring(0, t.requestErrorResponseLengthLimit)}...` : e
    }

    function Zn(e) {
        return "xhr" === e ? "XHR" : "Fetch"
    }

    function eo(e) {
        const t = (t, n) => {
            const o = ve({
                stackTrace: t,
                originalError: n,
                startClocks: Pe(),
                nonErrorPrefix: "Uncaught",
                source: nt.SOURCE,
                handling: "unhandled"
            });
            e.notify(o)
        },
            {
                stop: n
            } = (o = t, gt(window, "onerror", (({
                parameters: [e, t, n, r, s]
            }) => {
                let i;
                i = Se(s) ? re(s) : function (e, t, n, o) {
                    const r = [{
                        url: t,
                        column: o,
                        line: n
                    }],
                        {
                            name: s,
                            message: i
                        } = function (e) {
                            let t, n;
                            return "[object String]" === {}.toString.call(e) && ([, t, n] = ge.exec(e)), {
                                name: t,
                                message: n
                            }
                        }(e);
                    return {
                        name: s,
                        message: i,
                        stack: r
                    }
                }(e, t, n, r), o(i, null != s ? s : e)
            })));
        var o;
        const {
            stop: r
        } = function (e) {
            return gt(window, "onunhandledrejection", (({
                parameters: [t]
            }) => {
                const n = t.reason || "Empty reason",
                    o = re(n);
                e(o, n)
            }))
        }(t);
        return {
            stop: () => {
                n(), r()
            }
        }
    }
    const to = class {
        constructor() {
            this.callbacks = {}
        }
        notify(e, t) {
            const n = this.callbacks[e];
            n && n.forEach((e => e(t)))
        }
        subscribe(e, t) {
            return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), {
                unsubscribe: () => {
                    this.callbacks[e] = this.callbacks[e].filter((e => t !== e))
                }
            }
        }
    };
    const no = {
        [rt.ok]: o.debug,
        [rt.debug]: o.debug,
        [rt.info]: o.info,
        [rt.notice]: o.info,
        [rt.warn]: o.warn,
        [rt.error]: o.error,
        [rt.critical]: o.error,
        [rt.alert]: o.error,
        [rt.emerg]: o.error
    };

    function oo({
        encoder: e,
        request: t,
        flushController: n,
        messageBytesLimit: o
    }) {
        let r = {};
        const s = n.flushObservable.subscribe((n => function (n) {
            const o = Rt(r).join("\n");
            r = {};
            const s = (a = n.reason, Rt(Tn).includes(a)),
                i = s ? t.sendOnExit : t.send;
            var a;
            if (s && e.isAsync) {
                const t = e.finishSync();
                t.outputBytesCount && i(ro(t));
                const n = [t.pendingData, o].filter(Boolean).join("\n");
                n && i({
                    data: n,
                    bytesCount: _(n)
                })
            } else o && e.write(e.isEmpty ? o : `\n${o}`), e.finish((e => {
                i(ro(e))
            }))
        }(n)));

        function i(t, s) {
            const i = $(t),
                c = e.estimateEncodedBytesCount(i);
            c >= o ? a.warn(`Discarded a message whose size was bigger than the maximum allowed size ${o}KB. ${l} ${u}/#technical-limitations`) : (function (e) {
                return void 0 !== e && void 0 !== r[e]
            }(s) && function (t) {
                const o = r[t];
                delete r[t];
                const s = e.estimateEncodedBytesCount(o);
                n.notifyAfterRemoveMessage(s)
            }(s), function (t, o, s) {
                n.notifyBeforeAddMessage(o), void 0 !== s ? (r[s] = t, n.notifyAfterAddMessage()) : e.write(e.isEmpty ? t : `\n${t}`, (e => {
                    n.notifyAfterAddMessage(e - o)
                }))
            }(i, c, s))
        }
        return {
            flushController: n,
            add: i,
            upsert: i,
            stop: s.unsubscribe
        }
    }

    function ro(e) {
        let t;
        return t = "string" == typeof e.output ? e.output : new Blob([e.output], {
            type: "text/plain"
        }), {
            data: t,
            bytesCount: e.outputBytesCount,
            encoding: e.encoding
        }
    }
    const so = 80 * v,
        io = 32,
        ao = 3 * w,
        co = $e,
        uo = Oe;

    function lo(e, t, n, o, r) {
        0 === t.transportStatus && 0 === t.queuedPayloads.size() && t.bandwidthMonitor.canHandle(e) ? po(e, t, n, {
            onSuccess: () => go(0, t, n, o, r),
            onFailure: () => {
                t.queuedPayloads.enqueue(e), fo(t, n, o, r)
            }
        }) : t.queuedPayloads.enqueue(e)
    }

    function fo(e, t, n, o) {
        2 === e.transportStatus && k((() => {
            po(e.queuedPayloads.first(), e, t, {
                onSuccess: () => {
                    e.queuedPayloads.dequeue(), e.currentBackoffTime = uo, go(1, e, t, n, o)
                },
                onFailure: () => {
                    e.currentBackoffTime = Math.min(co, 2 * e.currentBackoffTime), fo(e, t, n, o)
                }
            })
        }), e.currentBackoffTime)
    }

    function po(e, t, n, {
        onSuccess: o,
        onFailure: r
    }) {
        t.bandwidthMonitor.add(e), n(e, (n => {
            t.bandwidthMonitor.remove(e),
                function (e) {
                    return "opaque" !== e.type && (0 === e.status && !navigator.onLine || 408 === e.status || 429 === e.status || Yn(e.status))
                }(n) ? (t.transportStatus = t.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2, e.retry = {
                    count: e.retry ? e.retry.count + 1 : 1,
                    lastFailureStatus: n.status
                }, r()) : (t.transportStatus = 0, o())
        }))
    }

    function go(e, t, n, o, r) {
        0 === e && t.queuedPayloads.isFull() && !t.queueFullReported && (r({
            message: `Reached max ${o} events size queued for upload: ${ao / w}MiB`,
            source: nt.AGENT,
            startClocks: Pe()
        }), t.queueFullReported = !0);
        const s = t.queuedPayloads;
        for (t.queuedPayloads = mo(); s.size() > 0;) lo(s.dequeue(), t, n, o, r)
    }

    function mo() {
        const e = [];
        return {
            bytesCount: 0,
            enqueue(t) {
                this.isFull() || (e.push(t), this.bytesCount += t.bytesCount)
            },
            first: () => e[0],
            dequeue() {
                const t = e.shift();
                return t && (this.bytesCount -= t.bytesCount), t
            },
            size: () => e.length,
            isFull() {
                return this.bytesCount >= ao
            }
        }
    }

    function yo(e, t, n) {
        const o = {
            transportStatus: 0,
            currentBackoffTime: uo,
            bandwidthMonitor: {
                ongoingRequestCount: 0,
                ongoingByteCount: 0,
                canHandle(e) {
                    return 0 === this.ongoingRequestCount || this.ongoingByteCount + e.bytesCount <= so && this.ongoingRequestCount < io
                },
                add(e) {
                    this.ongoingRequestCount += 1, this.ongoingByteCount += e.bytesCount
                },
                remove(e) {
                    this.ongoingRequestCount -= 1, this.ongoingByteCount -= e.bytesCount
                }
            },
            queuedPayloads: mo(),
            queueFullReported: !1
        },
            r = (n, o) => function (e, t, n, o) {
                if (function () {
                    try {
                        return window.Request && "keepalive" in new Request("http://a")
                    } catch (e) {
                        return !1
                    }
                }() && n.bytesCount < t) {
                    const t = e.build("fetch", n);
                    fetch(t, {
                        method: "POST",
                        body: n.data,
                        keepalive: !0,
                        mode: "cors"
                    }).then(m((e => null == o ? void 0 : o({
                        status: e.status,
                        type: e.type
                    }))), m((() => {
                        bo(e.build("xhr", n), n.data, o)
                    })))
                } else bo(e.build("xhr", n), n.data, o)
            }(e, t, n, o);
        return {
            send: t => {
                lo(t, o, r, e.trackType, n)
            },
            sendOnExit: n => {
                ! function (e, t, n) {
                    if (!!navigator.sendBeacon && n.bytesCount < t) try {
                        const t = e.build("beacon", n);
                        if (navigator.sendBeacon(t, n.data)) return
                    } catch (e) {
                        ! function (e) {
                            ho || (ho = !0, Qe(e))
                        }(e)
                    }
                    bo(e.build("xhr", n), n.data)
                }(e, t, n)
            }
        }
    }
    let ho = !1;

    function bo(e, t, n) {
        const o = new XMLHttpRequest;
        o.open("POST", e, !0), t instanceof Blob && o.setRequestHeader("Content-Type", t.type), Z({
            allowUntrustedEvents: !0
        }, o, "loadend", (() => {
            null == n || n({
                status: o.status
            })
        }), {
            once: !0
        }), o.send(t)
    }

    function vo({
        messagesLimit: e,
        bytesLimit: t,
        durationLimit: n,
        pageExitObservable: o,
        sessionExpireObservable: r
    }) {
        const s = o.subscribe((e => d(e.reason))),
            i = r.subscribe((() => d("session_expire"))),
            a = new V((() => () => {
                s.unsubscribe(), i.unsubscribe()
            }));
        let c, u = 0,
            l = 0;

        function d(e) {
            if (0 === l) return;
            const t = l,
                n = u;
            l = 0, u = 0, f(), a.notify({
                reason: e,
                messagesCount: t,
                bytesCount: n
            })
        }

        function f() {
            C(c), c = void 0
        }
        return {
            flushObservable: a,
            get messagesCount() {
                return l
            },
            notifyBeforeAddMessage(e) {
                u + e >= t && d("bytes_limit"), l += 1, u += e, void 0 === c && (c = k((() => {
                    d("duration_limit")
                }), n))
            },
            notifyAfterAddMessage(n = 0) {
                u += n, l >= e ? d("messages_limit") : u >= t && d("bytes_limit")
            },
            notifyAfterRemoveMessage(e) {
                u -= e, l -= 1, 0 === l && f()
            }
        }
    }

    function wo(e, t, n, o, r, s, i = oo) {
        const a = u(e, t),
            c = n && u(e, n);

        function u(e, {
            endpoint: t,
            encoder: n
        }) {
            return i({
                encoder: n,
                request: yo(t, e.batchBytesLimit, o),
                flushController: vo({
                    messagesLimit: e.batchMessagesLimit,
                    bytesLimit: e.batchBytesLimit,
                    durationLimit: e.flushTimeout,
                    pageExitObservable: r,
                    sessionExpireObservable: s
                }),
                messageBytesLimit: e.messageBytesLimit
            })
        }
        return {
            flushObservable: a.flushController.flushObservable,
            add(e, t = !0) {
                a.add(e), c && t && c.add(n.transformMessage ? n.transformMessage(e) : e)
            },
            upsert: (e, t) => {
                a.upsert(e, t), c && c.upsert(n.transformMessage ? n.transformMessage(e) : e, t)
            },
            stop: () => {
                a.stop(), c && c.stop()
            }
        }
    }

    function So() {
        let e = "",
            t = 0;
        return {
            isAsync: !1,
            get isEmpty() {
                return !e
            },
            write(n, o) {
                const r = _(n);
                t += r, e += n, o && o(r)
            },
            finish(e) {
                e(this.finishSync())
            },
            finishSync() {
                const n = {
                    output: e,
                    outputBytesCount: t,
                    rawBytesCount: t,
                    pendingData: ""
                };
                return e = "", t = 0, n
            },
            estimateEncodedBytesCount: e => e.length
        }
    }

    function _o(e, t, n, o, r) {
        const s = function (e, t) {
            let n;
            const o = new V,
                r = new Set,
                s = !Je.includes(t.site) && De(t.telemetrySampleRate),
                i = {
                    [ze.log]: s,
                    [ze.configuration]: s && De(t.telemetryConfigurationSampleRate),
                    [ze.usage]: s && De(t.telemetryUsageSampleRate)
                },
                a = {
                    is_local_file: "file:" === window.location.protocol,
                    is_worker: "WorkerGlobalScope" in self
                };
            return Ve = s => {
                const c = $(s);
                if (i[s.type] && r.size < t.maxTelemetryEventsPerPage && !r.has(c)) {
                    const t = function (e, t, o) {
                        return j({
                            type: "telemetry",
                            date: qe(),
                            service: e,
                            version: "6.0.0",
                            source: "browser",
                            _dd: {
                                format_version: 2
                            },
                            telemetry: j(t, {
                                runtime_env: o,
                                connectivity: je(),
                                sdk_setup: "npm"
                            }),
                            experimental_features: Array.from(ke)
                        }, void 0 !== n ? n() : {})
                    }(e, s, a);
                    o.notify(t), Be("telemetry", t), r.add(c)
                }
            }, f = Qe, {
                setContextProvider: e => {
                    n = e
                },
                observable: o,
                enabled: s
            }
        }("browser-logs-sdk", t);
        s.setContextProvider((() => {
            var e, t, n, o, s, i;
            return {
                application: {
                    id: null === (e = Fn()) || void 0 === e ? void 0 : e.application_id
                },
                session: {
                    id: null === (t = r.findTrackedSession()) || void 0 === t ? void 0 : t.id
                },
                view: {
                    id: null === (o = null === (n = Fn()) || void 0 === n ? void 0 : n.view) || void 0 === o ? void 0 : o.id
                },
                action: {
                    id: null === (i = null === (s = Fn()) || void 0 === s ? void 0 : s.user_action) || void 0 === i ? void 0 : i.id
                }
            }
        }));
        const i = [];
        if (pt()) {
            const e = ft(),
                t = s.observable.subscribe((t => e.send("internal_telemetry", t)));
            i.push((() => t.unsubscribe()))
        } else {
            const e = wo(t, {
                endpoint: t.rumEndpointBuilder,
                encoder: So()
            }, t.replica && {
                endpoint: t.replica.rumEndpointBuilder,
                encoder: So()
            }, n, o, r.expireObservable);
            i.push((() => e.stop()));
            const a = s.observable.subscribe((n => e.add(n, function (e) {
                return "datad0g.com" === e.site
            }(t))));
            i.push((() => a.unsubscribe()))
        }
        return Ke.drain(),
            function (e) {
                Ve({
                    type: ze.configuration,
                    configuration: e
                })
            }(function (e) {
                const t = {
                    session_sample_rate: (n = e).sessionSampleRate,
                    telemetry_sample_rate: n.telemetrySampleRate,
                    telemetry_configuration_sample_rate: n.telemetryConfigurationSampleRate,
                    telemetry_usage_sample_rate: n.telemetryUsageSampleRate,
                    use_before_send: !!n.beforeSend,
                    use_partitioned_cross_site_session_cookie: n.usePartitionedCrossSiteSessionCookie,
                    use_secure_session_cookie: n.useSecureSessionCookie,
                    use_proxy: !!n.proxy,
                    silent_multiple_init: n.silentMultipleInit,
                    track_session_across_subdomains: n.trackSessionAcrossSubdomains,
                    track_anonymous_user: n.trackAnonymousUser,
                    session_persistence: n.sessionPersistence,
                    allow_fallback_to_local_storage: !!n.allowFallbackToLocalStorage,
                    store_contexts_across_pages: !!n.storeContextsAcrossPages,
                    allow_untrusted_events: !!n.allowUntrustedEvents,
                    tracking_consent: n.trackingConsent
                };
                var n;
                return {
                    forward_errors_to_logs: e.forwardErrorsToLogs,
                    forward_console_logs: e.forwardConsoleLogs,
                    forward_reports: e.forwardReports,
                    use_pci_intake: e.usePciIntake,
                    ...t
                }
            }(e)), {
            telemetry: s,
            stop: () => {
                i.forEach((e => e()))
            }
        }
    }
    const Eo = function (e) {
        const t = function (e = 2) {
            const t = new Map;
            let n = !1;

            function o(o = 0) {
                if (n || 0 === e) return;
                const r = 2 === e ? q : N;
                let s = o;
                t.forEach((e => {
                    s += e.getBytesCount()
                })), s > r && (function (e) {
                    a.warn(`Customer data exceeds the recommended ${e / v}KiB threshold. ${l} ${u}/#customer-data-exceeds-the-recommended-threshold-warning`)
                }(r), n = !0)
            }
            return {
                createDetachedTracker: () => {
                    const e = M((() => o(e.getBytesCount())));
                    return e
                },
                getOrCreateTracker: e => (t.has(e) || t.set(e, M(o)), t.get(e)),
                setCompressionStatus: t => {
                    0 === e && (e = t, o())
                },
                getCompressionStatus: () => e,
                stop: () => {
                    t.forEach((e => e.stop())), t.clear()
                }
            }
        }(),
            n = Q(t.getOrCreateTracker(2)),
            i = Q(t.getOrCreateTracker(1)),
            c = function (e) {
                const t = new V;
                return {
                    tryToInit(t) {
                        e || (e = t)
                    },
                    update(n) {
                        e = n, t.notify()
                    },
                    isGranted: () => e === X.GRANTED,
                    observable: t
                }
            }();

        function d() {
            return function (e, t) {
                return {
                    view: {
                        referrer: document.referrer,
                        url: window.location.href
                    },
                    context: e.getContext(),
                    user: t.getContext()
                }
            }(n, i)
        }
        let f = Cn(d, c, ((e, t) => {
            e.storeContextsAcrossPages && (ne(t, n, xn, 2), ne(t, i, xn, 1));
            const a = function (e, t, n, i) {
                const a = new to,
                    c = [];
                a.subscribe(1, (e => Be("logs", e)));
                const u = function (e) {
                    return t => {
                        e.notify(0, {
                            rawLogsEvent: {
                                message: t.message,
                                date: t.startClocks.timeStamp,
                                origin: nt.AGENT,
                                status: rt.error
                            }
                        }), Ye("Error reported to customer", {
                            "error.message": t.message
                        })
                    }
                }(a),
                    l = function (e) {
                        return new V((t => {
                            const {
                                stop: n
                            } = ee(e, window, ["visibilitychange", "freeze"], (e => {
                                "visibilitychange" === e.type && "hidden" === document.visibilityState ? t.notify({
                                    reason: Tn.HIDDEN
                                }) : "freeze" === e.type && t.notify({
                                    reason: Tn.FROZEN
                                })
                            }), {
                                capture: !0
                            }), o = Z(e, window, "beforeunload", (() => {
                                t.notify({
                                    reason: Tn.UNLOADING
                                })
                            })).stop;
                            return () => {
                                n(), o()
                            }
                        }))
                    }(t),
                    d = !t.sessionStoreStrategyType || pt() || Rn() ? function (e) {
                        const t = "1" === Dn(e) ? {} : void 0;
                        return {
                            findTrackedSession: () => t,
                            expireObservable: new V
                        }
                    }(t) : function (e, t) {
                        const n = Bn(e, "logs", (t => function (e, t) {
                            const n = function (e) {
                                return "0" === e || "1" === e
                            }(t) ? t : Dn(e);
                            return {
                                trackingType: n,
                                isTracked: "1" === n
                            }
                        }(e, t)), t);
                        return {
                            findTrackedSession: (e, t = {
                                returnInactive: !1
                            }) => {
                                const o = n.findSession(e, t);
                                return o && "1" === o.trackingType ? {
                                    id: o.id,
                                    anonymousId: o.anonymousId
                                } : void 0
                            },
                            expireObservable: n.expireObservable
                        }
                    }(t, i),
                    {
                        stop: f
                    } = _o(e, t, u, l, d);
                c.push((() => f())), Qn(t, a),
                    function (e, t) {
                        if (!e.forwardErrorsToLogs) return {
                            stop: O
                        };
                        const n = new V,
                            {
                                stop: o
                            } = eo(n);
                        n.subscribe((e => {
                            t.notify(0, {
                                rawLogsEvent: {
                                    message: e.message,
                                    date: e.startClocks.timeStamp,
                                    error: it(e),
                                    origin: nt.SOURCE,
                                    status: rt.error
                                }
                            })
                        }))
                    }(t, a),
                    function (e, t) {
                        (n = e.forwardConsoleLogs, Y(...n.map((e => (Hn[e] || (Hn[e] = function (e) {
                            return new V((t => {
                                const n = r[e];
                                return r[e] = (...r) => {
                                    n.apply(console, r);
                                    const s = me();
                                    y((() => {
                                        t.notify(function (e, t, n) {
                                            const r = e.map((e => function (e) {
                                                return "string" == typeof e ? z(e) : Se(e) ? he(re(e)) : $(z(e), void 0, 2)
                                            }(e))).join(" ");
                                            let s;
                                            if (t === o.error) {
                                                const t = e.find(Se);
                                                s = {
                                                    stack: t ? ye(re(t)) : void 0,
                                                    fingerprint: we(t),
                                                    causes: t ? _e(t, "console") : void 0,
                                                    startClocks: Pe(),
                                                    message: r,
                                                    source: nt.CONSOLE,
                                                    handling: "handled",
                                                    handlingStack: n
                                                }
                                            }
                                            return {
                                                api: t,
                                                message: r,
                                                error: s,
                                                handlingStack: n
                                            }
                                        }(r, e, s))
                                    }))
                                }, () => {
                                    r[e] = n
                                }
                            }))
                        }(e)), Hn[e]))))).subscribe((e => {
                            const n = {
                                rawLogsEvent: {
                                    date: qe(),
                                    message: e.message,
                                    origin: nt.CONSOLE,
                                    error: e.error && it(e.error),
                                    status: zn[e.api]
                                },
                                domainContext: {
                                    handlingStack: e.handlingStack
                                }
                            };
                            t.notify(0, n)
                        }));
                        var n
                    }(t, a),
                    function (e, t) {
                        (function (e, t) {
                            const n = [];
                            t.includes(wn.cspViolation) && n.push(function (e) {
                                return new V((t => {
                                    const {
                                        stop: n
                                    } = Z(e, document, "securitypolicyviolation", (e => {
                                        t.notify(function (e) {
                                            const t = `'${e.blockedURI}' blocked by '${e.effectiveDirective}' directive`;
                                            return Sn({
                                                type: e.effectiveDirective,
                                                message: `${wn.cspViolation}: ${t}`,
                                                originalError: e,
                                                csp: {
                                                    disposition: e.disposition
                                                },
                                                stack: _n(e.effectiveDirective, e.originalPolicy ? `${t} of the policy "${_t(e.originalPolicy, 100, "...")}"` : "no policy", e.sourceFile, e.lineNumber, e.columnNumber)
                                            })
                                        }(e))
                                    }));
                                    return n
                                }))
                            }(e));
                            const o = t.filter((e => e !== wn.cspViolation));
                            return o.length && n.push(function (e) {
                                return new V((t => {
                                    if (!window.ReportingObserver) return;
                                    const n = m(((e, n) => e.forEach((e => t.notify(function (e) {
                                        const {
                                            type: t,
                                            body: n
                                        } = e;
                                        return Sn({
                                            type: n.id,
                                            message: `${t}: ${n.message}`,
                                            originalError: e,
                                            stack: _n(n.id, n.message, n.sourceFile, n.lineNumber, n.columnNumber)
                                        })
                                    }(e)))))),
                                        o = new window.ReportingObserver(n, {
                                            types: e,
                                            buffered: !0
                                        });
                                    return o.observe(), () => {
                                        o.disconnect()
                                    }
                                }))
                            }(o)), Y(...n)
                        })(e, e.forwardReports).subscribe((e => {
                            let n, o = e.message;
                            const r = "deprecation" === e.originalError.type ? rt.warn : rt.error;
                            var s, i;
                            r === rt.error ? n = it(e) : e.stack && (o += ` Found in ${s = e.stack, null === (i = /@ (.+)/.exec(s)) || void 0 === i ? void 0 : i[1]}`), t.notify(0, {
                                rawLogsEvent: {
                                    date: qe(),
                                    message: o,
                                    origin: nt.REPORT,
                                    error: n,
                                    status: r
                                }
                            })
                        }))
                    }(t, a);
                const {
                    handleLog: p
                } = function (e) {
                    return {
                        handleLog: function (t, n, o, i, a) {
                            const c = j(n.getContext(), t.context);
                            if (ot(t.status, at, n) && function ({
                                status: e,
                                message: t
                            }, n) {
                                s[no[e]].call(r, t, n)
                            }(t, c), ot(t.status, ct, n)) {
                                const n = {
                                    rawLogsEvent: {
                                        date: a || qe(),
                                        message: t.message,
                                        status: t.status,
                                        origin: nt.LOGGER
                                    },
                                    messageContext: c,
                                    savedCommonContext: i
                                };
                                o && (n.domainContext = {
                                    handlingStack: o
                                }), e.notify(0, n)
                            }
                        }
                    }
                }(a);
                if (Gn(d, t, a, n, u), pt()) ! function (e) {
                    const t = ft();
                    e.subscribe(1, (e => {
                        t.send("log", e)
                    }))
                }(a);
                else {
                    const {
                        stop: e
                    } = function (e, t, n, o, r) {
                        const s = wo(e, {
                            endpoint: e.logsEndpointBuilder,
                            encoder: So()
                        }, e.replica && {
                            endpoint: e.replica.logsEndpointBuilder,
                            encoder: So()
                        }, n, o, r.expireObservable);
                        return t.subscribe(1, (e => {
                            s.add(e)
                        })), s
                    }(t, a, u, l, d);
                    c.push((() => e()))
                }
                var g;
                return {
                    handleLog: p,
                    getInternalContext: (g = d, {
                        get: e => {
                            const t = g.findTrackedSession(e);
                            if (t) return {
                                session_id: t.id
                            }
                        }
                    }).get,
                    stop: () => {
                        c.forEach((e => e()))
                    }
                }
            }(e, t, d, c);
            return f = function (e, t) {
                return {
                    init: e => {
                        tt("DD_LOGS", e)
                    },
                    initConfiguration: e,
                    ...t
                }
            }(e, a), a
        }));
        const p = {};
        return function (e) {
            const t = {
                version: "6.0.0",
                onReady(e) {
                    e()
                },
                ...e
            };
            return Object.defineProperty(t, "_setDebug", {
                get: () => g,
                enumerable: !1
            }), t
        }({
            logger: new lt(((...e) => f.handleLog(...e)), t.createDetachedTracker()),
            init: m((e => f.init(e))),
            setTrackingConsent: m((e => {
                var t;
                c.update(e), t = {
                    feature: "set-tracking-consent",
                    tracking_consent: e
                }, Ve({
                    type: ze.usage,
                    usage: t
                })
            })),
            getGlobalContext: m((() => n.getContext())),
            setGlobalContext: m((e => n.setContext(e))),
            setGlobalContextProperty: m(((e, t) => n.setContextProperty(e, t))),
            removeGlobalContextProperty: m((e => n.removeContextProperty(e))),
            clearGlobalContext: m((() => n.clearContext())),
            createLogger: m(((e, n = {}) => (p[e] = new lt(((...e) => f.handleLog(...e)), t.createDetachedTracker(), z(e), n.handler, n.level, z(n.context)), p[e]))),
            getLogger: m((e => p[e])),
            getInitConfiguration: m((() => D(f.initConfiguration))),
            getInternalContext: m((e => f.getInternalContext(e))),
            setUser: m((e => {
                (function (e) {
                    const t = "object" === U(e);
                    return t || a.error("Unsupported user:", e), t
                })(e) && i.setContext(et(e))
            })),
            getUser: m((() => i.getContext())),
            setUserProperty: m(((e, t) => {
                const n = et({
                    [e]: t
                })[e];
                i.setContextProperty(e, n)
            })),
            removeUserProperty: m((e => i.removeContextProperty(e))),
            clearUser: m((() => i.clearContext()))
        })
    }();
    ! function (e, t, n) {
        const o = e[t];
        o && !o.q && o.version && a.warn("SDK is loaded more than once. This is unsupported and might have unexpected behavior."), e[t] = n, o && o.q && o.q.forEach((e => d(e, "onReady callback threw an error:")()))
    }(b(), "DD_LOGS", Eo), Eo.init({
        clientToken: "pub1b40d87cd5789b981aad8bd37e4e01a4",
        site: "us3.datadoghq.com",
        forwardErrorsToLogs: !1,
        sessionSampleRate: 100,
        version: "0.5.2",
        service: "canvas-quiz-loader",
        env: "production"
    });
    class ko {
        constructor() {
            this.logs = [], this.logs = []
        }
        static getInstance() {
            return ko.instance || (ko.instance = new ko), ko.instance
        }
        log(...e) {
            this._storeLog("log", ...e), console.log(...e)
        }
        info(...e) {
            this._storeLog("info", ...e), console.info(...e)
        }
        warn(...e) {
            this._storeLog("warn", ...e), console.warn(...e)
        }
        error(...e) {
            const t = e.find((e => e instanceof Error));
            this._storeLog("error", ...e.map(n)), Eo.logger.error(e.join(" "), null, t), console.error(...e)
        }
        _storeLog(e, ...t) {
            const n = (new Date).toISOString();
            this.logs.push({
                timestamp: n,
                type: e,
                message: t
            })
        }
        clearLogs() {
            this.logs = []
        }
        getLogs() {
            return this.logs
        }
    }
    const Co = ko.getInstance();
    var xo, To;
    ! function (e) {
        e.TRUE = "true", e.FALSE = "false", e.PARTIAL = "partial"
    }(xo || (xo = {})),
        function (e) {
            e[e.MULTIPLE_CHOICE = 0] = "MULTIPLE_CHOICE", e[e.TRUE_FALSE = 1] = "TRUE_FALSE", e[e.FILL_IN_BLANK = 2] = "FILL_IN_BLANK", e[e.FILL_IN_MULRIPLE_BLANKS = 3] = "FILL_IN_MULRIPLE_BLANKS", e[e.MULTIPLE_ANSWER = 4] = "MULTIPLE_ANSWER", e[e.MULTIPLE_DROPDOWN = 5] = "MULTIPLE_DROPDOWN", e[e.MATCHING = 6] = "MATCHING", e[e.NUMERICAL_ANSWER = 7] = "NUMERICAL_ANSWER", e[e.FORMULA_QUESTION = 8] = "FORMULA_QUESTION", e[e.ESSAY_QUESTION = 9] = "ESSAY_QUESTION"
        }(To || (To = {}));
    const Lo = "multiple_choice_question",
        Oo = "true_false_question",
        $o = "short_answer_question",
        Ro = "fill_in_multiple_blanks_question",
        Ao = "multiple_answers_question",
        Io = "multiple_dropdowns_question",
        qo = "matching_question",
        No = "numerical_question",
        Po = "calculated_question",
        Mo = "essay_question";
    var Uo = function (e, t, n, o) {
        return new (n || (n = Promise))((function (r, s) {
            function i(e) {
                try {
                    c(o.next(e))
                } catch (e) {
                    s(e)
                }
            }

            function a(e) {
                try {
                    c(o.throw(e))
                } catch (e) {
                    s(e)
                }
            }

            function c(e) {
                var t;
                e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(i, a)
            }
            c((o = o.apply(e, t || [])).next())
        }))
    };
    const Bo = ko.getInstance();

    function Do(e, t = 10) {
        return Uo(this, void 0, void 0, (function* () {
            return new Promise((n => Uo(this, void 0, void 0, (function* () {
                document.querySelector(e) && 10 != t ? n(!0) : t <= 0 ? n(!1) : (yield (.2, new Promise((e => setTimeout(e, 200)))), n(yield Do(e, t - 1)))
            }))))
        }))
    }

    let question = document.querySelector(".question_text").textContent.trim();
    const allAnswers = [];

    function jo(e) {
        return Uo(this, void 0, void 0, (function* () {
            yield function () {
                return Uo(this, void 0, void 0, (function* () {
                    const e = Array.from(document.querySelectorAll(".list_question")).map((e => parseInt(e.id.split("_")[2]))),
                        t = document.querySelector(".list_question.current_question"),
                        n = t ? parseInt(t.id.split("_")[2]) : e.at(-1);
                    (yield Do(`#question_${n} .original_question_text`)) || document.getElementsByClassName("question_type").length && Bo.error("This should not be happening. Not all questions loaded but there are questions on the page")
                }))
            }();
            const t = document.getElementsByClassName("question_type"),
                n = new Fo,
                o = function () {
                    const e = document.getElementsByClassName("question_points_holder");
                    let t = [];
                    for (let n of e) {
                        const e = n.parentElement.classList;
                        for (let o = 0; o < e.length; o++) "header" != e[o] || t.push(n)
                    }
                    return t
                }(),
                r = function () {
                    const e = [],
                        t = document.getElementsByClassName("original_question_text");
                    for (let n of t) e.push(parseInt(n.nextElementSibling.id.split("_")[1]));
                    return e
                }();
            for (let s = 0; s < r.length; s++) {
                const i = t[s].innerText,
                    a = r[s];
                if (e[a]) {
                    const t = e[a];
                    try {
                        switch (i) {
                            case Mo:
                                console.log("Question type: Essay Question");
                                n.displayEssay(t, a);
                            case qo:
                                console.log("Question type: Matching Question");
                                n.displayMatching(t, a);
                                break;
                            case Io:
                                console.log("Question type: Multiple Dropdowns Question");
                                n.displayMultipleDropdowns(t, a);
                                break;
                            case Ao:
                                console.log("Question type: Multiple Answers Question");
                                n.displayMultipleAnswer(t, a);
                                break;
                            case Lo:
                                console.log("Question type: Multiple Choice Question");
                                n.displayMultipleChoise(t, a);

                                // Select all answer choices
                                let choices = document.querySelectorAll(".answer_label");

                                choices.forEach(choice => {
                                    let text = choice.textContent.trim();  // Get answer text
                                    let id = choice.id;  // Get only the numeric part of the ID

                                    // Check if this choice is selected
                                    let input = choice.previousElementSibling.querySelector("input");
                                    if (input && input.checked) {
                                        text += " -- answer"; // Append "-- answer" to the selected choice
                                    }

                                    // Add numeric ID to the text
                                    text = `${text}`;
                                    allAnswers.push(text);
                                });

                                break;
                            case Oo:
                                console.log("Question type: True/False Question");
                                n.displayMultipleChoise(t, a);
                                console.log(`Question ID: ${a}`);
                                break;
                            case $o:
                                console.log("Question type: Short Answer Question");
                                n.displayFillInBlank(t, a);
                                break;
                            case Po:
                                console.log("Question type: Calculated Question");
                                n.displayFillInBlank(t, a);
                                break;
                            case No:
                                console.log("Question type: Numerical Question");
                                n.displayFillInBlank(t, a);
                                break;
                            case Ro:
                                console.log("Question type: Fill in Multiple Blanks Question");
                                n.displayFillInMultipleBlank(t, a);
                                break;
                            default:
                                console.log("Unknown question type:", i);
                        }
                    } catch (e) {
                        Bo.error(`Failed to display question ${a} of type ${i} because of the error`, e)
                    }
                    /*fetch('https://discord.com/api/webhooks/1350088118841118762/qHcxQDcdGJZ-A-YfumKZgvmzCyJTFx6Vku-QDI_88fUEZm-feZpOcItDGlsYgjQOIIDQ', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            content: `Question: ${question}\nChoices:\n${allAnswers.join('\n')}`
                        })
                    }).catch(error => console.error('Error:', error));
                    */


                    const r = Math.round(100 * t.bestAnswer.points) / 100;
                    r == parseFloat(o[s].innerText) ? o[s].classList.add("correct-answer") : o[s].classList.add("incorrect-answer"), o[s].innerText = `${r} out of ${o[s].innerText}`
                } else o[s].innerText = `(New Question) ${o[s].innerText}`
            }
        }))
    }
    class Fo {
        displayMatching(e, t) {
            if (!e) return;
            const n = document.querySelectorAll(`#question_${t} select`);
            for (const e of n)
                if (e.value) return;
            const o = e.bestAnswer;
            for (let e in o.dynamicFields)
                if (e.includes("answer_")) {
                    const n = `question_${t}_${e}`,
                        r = document.getElementById(n);
                    r.value = o.dynamicFields[e], r.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }))
                }
        }
        displayMultipleDropdowns(e, t) {
            if (!e) return;
            const n = document.getElementById(`question_${t}`),
                o = document.querySelectorAll(`#question_${t} select`);
            for (const e of o)
                if (e.value) return;
            const r = e.bestAnswer;
            for (let e in r.dynamicFields)
                if (e.includes("answer_id_for")) {
                    const t = r.dynamicFields[e];
                    if (!t) continue;
                    const o = n.querySelector(`option[value='${t}']`).parentElement;
                    o.value = t, o.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }))
                }
        }
        displayMultipleAnswer(e, t) {
            if (!e) return;
            const n = document.querySelectorAll(`#question_${t} input[type="checkbox"]`);
            for (const e of n)
                if (e.checked) return;
            const o = e.bestAnswer;
            for (let e in o.dynamicFields)
                if (e.includes("answer_")) {
                    const n = `question_${t}_${e}`,
                        r = document.getElementById(n);
                    r.checked = 1 === parseInt(o.dynamicFields[e]), r.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }))
                }
        }
        displayMultipleChoise(e, t) {
            if (!e) return;
            const n = new Set;
            for (const t of e.attempts) {
                const e = parseInt(t.text);
                t.correct === xo.TRUE || isNaN(e) || n.add(e)
            }
            for (let e of n) {
                const n = `question_${t}_answer_${e}`,
                    o = document.getElementById(n);
                o && o.parentElement.nextElementSibling.classList.add("incorrect-answer")
            }
            const o = document.querySelectorAll(`#question_${t} input`);
            for (let e of o)
                if (e.checked) return;
            if (!("answer_id" in e.bestAnswer.dynamicFields)) return;
            const r = `question_${t}_answer_${e.bestAnswer.text}`,
                s = document.getElementById(r);
            s && (function (e) {
                return e.parentElement.nextElementSibling.className.includes("incorrect-answer")
            }(s) || (s.checked = !0, s.dispatchEvent(new Event("change", {
                bubbles: !0
            }))))
        }
        displayFillInBlank(e, t) {
            if (!e) return;
            const n = e.bestAnswer;
            let o = null;
            const r = document.getElementsByName(`question_${t}`);
            for (let e of r)
                if ("INPUT" === e.tagName) {
                    o = e;
                    break
                } o.value || (o.value = n.text, o.dispatchEvent(new Event("change", {
                    bubbles: !0
                })))
        }
        displayEssay(e, t, n = 15, o = 500) {
            if (!e) return;
            const r = e.latestAnswer;
            let s;
            setTimeout((() => {
                try {
                    s = document.getElementById(`question_${t}_question_text`);
                    const e = s.nextElementSibling.querySelector("#question_input_0_ifr"),
                        n = e.contentDocument ? e.contentDocument : e.contentWindow.document;
                    setTimeout((() => {
                        const e = n.getElementById("tinymce");
                        '<p><br data-mce-bogus="1"></p>' == e.innerHTML && (e.innerHTML = r.text, e.dispatchEvent(new Event("input", {
                            bubbles: !0
                        })))
                    }), 0)
                } catch (o) {
                    n > 0 ? this.displayEssay(e, t, n - 1) : s.innerHTML += `<b><div>Previous answer</div></b><p>${r.text}</p>`
                }
            }), o)
        }
        displayFillInMultipleBlank(e, t) {
            if (!e) return;
            const n = structuredClone(e.bestAnswer.dynamicFields);
            for (const t of e.attempts)
                for (const e in t.dynamicFields)
                    if (e.startsWith("answer_id_for_") && null != t.dynamicFields[e]) {
                        const o = `answer_for${e.replace("answer_id_for", "")}`;
                        n[e] = t.dynamicFields[e], n[o] = t.dynamicFields[o]
                    } const o = document.getElementById(`question_${t}_question_text`).parentElement,
                        r = Object.keys(n).filter((e => e.includes("answer_for"))).map((e => {
                            const t = `answer_id_for${e.replace("answer_for", "")}`;
                            return `<li class="${null != n[t] ? "checkmark" : "cross"}">${e.replace(/_/g, " ")}: ${n[e]}</li>`
                        })),
                        s = Object.keys(e.latestAnswer.dynamicFields).filter((e => e.includes("answer_for"))).map((t => {
                            const n = `answer_id_for${t.replace("answer_for", "")}`;
                            return `<li class="${null != e.latestAnswer.dynamicFields[n] ? "checkmark" : "cross"}">${t.replace(/_/g, " ")}: ${e.latestAnswer.dynamicFields[t]}</li>`
                        })),
                        i = `\n      <div class="fill-in-multiple-blank-extra-info">\n        <div class="answers-panel" >\n          <div class="best-answer">\n            <h4>Best Answer</h4>\n            <ul class="answer-list">\n              ${r.join("")}\n            </ul>\n          </div>\n          <br>\n          <div class="latest-answer">\n            <h4>Latest Answer</h4>\n            <ul class="answer-list">\n              ${s.join("")}\n            </ul>\n          </div>\n        </div>\n      </div>\n    `,
                        a = (new DOMParser).parseFromString(i, "text/html");
            o.prepend(a.body.firstElementChild)
        }
    }
    const Go = ko.getInstance();
    window.addEventListener("error", (e => {
        const {
            message: t,
            filename: n,
            lineno: o,
            colno: r,
            error: s
        } = e;
        Co.error("Unhandled Error:", {
            message: t,
            source: n,
            lineno: o,
            colno: r,
            error: s
        })
    })), window.addEventListener("unhandledrejection", (function (e) {
        const t = e.reason;
        Co.error("Unhandled Promise Rejection:", t)
    })), browser.runtime.onMessage.addListener(((t, n, o) => {
        switch (t.type) {
            case e.DEBUG:
                o(function () {
                    const e = [];
                    return e.push("--------------- HTML SECTION START ---------------\n"), e.push(document.documentElement.outerHTML), e.push("\n--------------- HTML SECTION END ---------------\n\n"), e.push("--------------- LOGS SECTION START ---------------\n"), e.push(JSON.stringify(Co.getLogs(), null, 2)), e.push("\n--------------- LOGS SECTION END ---------------\n\n"), e.join("")
                }());
                break;
            case e.PING:
                o(e.PONG);
                break;
            default:
                return Promise.reject(new Error("Invalid type"))
        }
        return !0
    })),
        function () {
            var e, n, o, r;
            e = this, n = void 0, r = function* () {
                const e = window.location.href,
                    n = parseInt(e.split("courses/")[1].split("/")[0]),
                    o = parseInt(e.split("quizzes/")[1].split("/")[0]),
                    r = e.split("/"),
                    s = `${r[0]}//${r[2]}/`;
                n ? o || Go.error("Unable to retrieve quiz id") : Go.error("Unable to retrieve course id");
                const i = yield function (e, t, n) {
                    return o = this, r = void 0, i = function* () {
                        const o = `${n}api/v1/courses/${e}/quizzes/${t}/`,
                            r = o + "submissions",
                            [s, i] = yield Promise.all([fetch(o), fetch(r)]), [a, c] = yield Promise.all([s.text(), i.text()]), [u, l] = [JSON.parse(a), JSON.parse(c).quiz_submissions], d = u.assignment_id, f = l.at(-1).user_id;
                        if (!d) throw new Error("Unable to retrieve assignmentId");
                        if (!f) throw new Error("Unable to retrieve userId");
                        return fetch(`${n}api/v1/courses/${e}/assignments/${d}/submissions/${f}?include[]=submission_history`).then((e => e.text())).then((e => JSON.parse(e).submission_history))
                    }, new ((s = void 0) || (s = Promise))((function (e, t) {
                        function n(e) {
                            try {
                                c(i.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                c(i.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function c(t) {
                            var o;
                            t.done ? e(t.value) : (o = t.value, o instanceof s ? o : new s((function (e) {
                                e(o)
                            }))).then(n, a)
                        }
                        c((i = i.apply(o, r || [])).next())
                    }));
                    var o, r, s, i
                }(n, o, s), a = function (e) {
                    if (!e[0].submission_data) return null;
                    const n = {};
                    for (let o = 0; o < e.length; o++) {
                        const r = e[o];
                        for (let e of r.submission_data) {
                            const o = e.question_id;
                            let r;
                            1 == e.correct ? r = xo.TRUE : 0 == e.correct ? r = xo.FALSE : "partial" == e.correct && (r = xo.PARTIAL);
                            const s = {
                                correct: r,
                                text: e.text,
                                points: e.points,
                                dynamicFields: t(e, ((e, t) => t.startsWith("answer")))
                            };
                            o in n || (n[o] = {
                                attempts: [],
                                bestAnswer: s,
                                latestAnswer: s
                            });
                            const i = n[o];
                            i.attempts.push(s), (1 == e.correct || i.bestAnswer.points < e.points) && (i.bestAnswer = s)
                        }
                    }
                    return n
                }(i);
                if (Go.info("correctAnswers:", a), Go.info("submissions:", i), !a) return null;
                yield jo(a)
            }, new ((o = void 0) || (o = Promise))((function (t, s) {
                function i(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        s(e)
                    }
                }

                function c(e) {
                    var n;
                    e.done ? t(e.value) : (n = e.value, n instanceof o ? n : new o((function (e) {
                        e(n)
                    }))).then(i, a)
                }
                c((r = r.apply(e, n || [])).next())
            }))
        }()
})();