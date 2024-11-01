! function(t) {
    var a = {
        init: function(e) {
            return this.each(function() {
                a.destroy.call(this), this.opt = t.extend(!0, {}, t.fn.raty.defaults, e);
                var i = t(this),
                    s = ["number", "readOnly", "score", "scoreName"];
                a._callback.call(this, s), this.opt.precision && a._adjustPrecision.call(this), this.opt.number = a._between(this.opt.number, 0, this.opt.numberMax), this.opt.path = this.opt.path || "", this.opt.path && "/" !== this.opt.path.slice(this.opt.path.length - 1, this.opt.path.length) && (this.opt.path += "/"), this.stars = a._createStars.call(this), this.score = a._createScore.call(this), a._apply.call(this, this.opt.score);
                var o = this.opt.space ? 4 : 0,
                    r = this.opt.width || this.opt.number * this.opt.size + this.opt.number * o;
                this.opt.cancel && (this.cancel = a._createCancel.call(this), r += this.opt.size + o), this.opt.readOnly ? a._lock.call(this) : (i.css("cursor", "pointer"), a._binds.call(this)), this.opt.width !== !1 && i.css("width", r), a._target.call(this, this.opt.score), i.data({
                    settings: this.opt,
                    raty: !0
                })
            })
        },
        _adjustPrecision: function() {
            this.opt.targetType = "score", this.opt.half = !0
        },
        _apply: function(t) {
            t && t > 0 && (t = a._between(t, 0, this.opt.number), this.score.val(t)), a._fill.call(this, t), t && a._roundStars.call(this, t)
        },
        _between: function(t, a, e) {
            return Math.min(Math.max(parseFloat(t), a), e)
        },
        _binds: function() {
            this.cancel && a._bindCancel.call(this), a._bindClick.call(this), a._bindOut.call(this), a._bindOver.call(this)
        },
        _bindCancel: function() {
            a._bindClickCancel.call(this), a._bindOutCancel.call(this), a._bindOverCancel.call(this)
        },
        _bindClick: function() {
            var a = this,
                e = t(a);
            a.stars.on("click.raty", function(t) {
                a.score.val(a.opt.half || a.opt.precision ? e.data("score") : this.alt), a.opt.click && a.opt.click.call(a, parseFloat(a.score.val()), t)
            })
        },
        _bindClickCancel: function() {
            var t = this;
            t.cancel.on("click.raty", function(a) {
                t.score.removeAttr("value"), t.opt.click && t.opt.click.call(t, null, a)
            })
        },
        _bindOut: function() {
            var e = this;
            t(this).on("mouseleave.raty", function(t) {
                var i = parseFloat(e.score.val()) || void 0;
                a._apply.call(e, i), a._target.call(e, i, t), e.opt.mouseout && e.opt.mouseout.call(e, i, t)
            })
        },
        _bindOutCancel: function() {
            var a = this;
            a.cancel.on("mouseleave.raty", function(e) {
                t(this).attr("src", a.opt.path + a.opt.cancelOff), a.opt.mouseout && a.opt.mouseout.call(a, a.score.val() || null, e)
            })
        },
        _bindOverCancel: function() {
            var e = this;
            e.cancel.on("mouseover.raty", function(i) {
                t(this).attr("src", e.opt.path + e.opt.cancelOn), e.stars.attr("src", e.opt.path + e.opt.starOff), a._target.call(e, null, i), e.opt.mouseover && e.opt.mouseover.call(e, null)
            })
        },
        _bindOver: function() {
            var e = this,
                i = t(e),
                s = e.opt.half ? "mousemove.raty" : "mouseover.raty";
            e.stars.on(s, function(s) {
                var o = parseInt(this.alt, 10);
                if (e.opt.half) {
                    var r = parseFloat((s.pageX - t(this).offset().left) / e.opt.size),
                        n = r > .5 ? 1 : .5;
                    o = o - 1 + n, a._fill.call(e, o), e.opt.precision && (o = o - n + r), a._roundStars.call(e, o), i.data("score", o)
                } else a._fill.call(e, o);
                a._target.call(e, o, s), e.opt.mouseover && e.opt.mouseover.call(e, o, s)
            })
        },
        _callback: function(t) {
            for (i in t) "function" == typeof this.opt[t[i]] && (this.opt[t[i]] = this.opt[t[i]].call(this))
        },
        _createCancel: function() {
            var a = t(this),
                e = this.opt.path + this.opt.cancelOff,
                i = t("<img />", {
                    src: e,
                    alt: "x",
                    title: this.opt.cancelHint,
                    "class": "raty-cancel"
                });
            return "left" == this.opt.cancelPlace ? a.prepend("&#160;").prepend(i) : a.append("&#160;").append(i), i
        },
        _createScore: function() {
            return t("<input />", {
                type: "hidden",
                name: this.opt.scoreName
            }).appendTo(this)
        },
        _createStars: function() {
            for (var e = t(this), i = 1; i <= this.opt.number; i++) {
                var s = a._getHint.call(this, i),
                    o = this.opt.score && this.opt.score >= i ? "starOn" : "starOff";
                o = this.opt.path + this.opt[o], t("<img />", {
                    src: o,
                    alt: i,
                    title: s
                }).appendTo(this), this.opt.space && e.append(i < this.opt.number ? "&#160;" : "")
            }
            return e.children("img")
        },
        _error: function(a) {
            t(this).html(a), t.error(a)
        },
        _fill: function(t) {
            for (var a = this, e = 0, i = 1; i <= a.stars.length; i++) {
                var s = a.stars.eq(i - 1),
                    o = a.opt.single ? i == t : t >= i;
                if (a.opt.iconRange && a.opt.iconRange.length > e) {
                    var r = a.opt.iconRange[e],
                        n = r.on || a.opt.starOn,
                        c = r.off || a.opt.starOff,
                        l = o ? n : c;
                    i <= r.range && s.attr("src", a.opt.path + l), i == r.range && e++
                } else {
                    var l = o ? "starOn" : "starOff";
                    s.attr("src", this.opt.path + this.opt[l])
                }
            }
        },
        _getHint: function(t) {
            var a = this.opt.hints[t - 1];
            return "" === a ? "" : a || t
        },
        _lock: function() {
            var e = parseInt(this.score.val(), 10),
                i = e ? a._getHint.call(this, e) : this.opt.noRatedMsg;
            t(this).data("readonly", !0).css("cursor", "").attr("title", i), this.score.attr("readonly", "readonly"), this.stars.attr("title", i), this.cancel && this.cancel.hide()
        },
        _roundStars: function(t) {
            var a = (t - Math.floor(t)).toFixed(2);
            if (a > this.opt.round.down) {
                var e = "starOn";
                this.opt.halfShow && a < this.opt.round.up ? e = "starHalf" : a < this.opt.round.full && (e = "starOff"), this.stars.eq(Math.ceil(t) - 1).attr("src", this.opt.path + this.opt[e])
            }
        },
        _target: function(e, i) {
            if (this.opt.target) {
                var s = t(this.opt.target);
                0 === s.length && a._error.call(this, "Target selector invalid or missing!"), this.opt.targetFormat.indexOf("{score}") < 0 && a._error.call(this, 'Template "{score}" missing!');
                var o = i && "mouseover" == i.type;
                void 0 === e ? e = this.opt.targetText : null === e ? e = o ? this.opt.cancelHint : this.opt.targetText : ("hint" == this.opt.targetType ? e = a._getHint.call(this, Math.ceil(e)) : this.opt.precision && (e = parseFloat(e).toFixed(1)), o || this.opt.targetKeep || (e = this.opt.targetText)), e && (e = this.opt.targetFormat.toString().replace("{score}", e)), s.is(":input") ? s.val(e) : s.html(e)
            }
        },
        _unlock: function() {
            t(this).data("readonly", !1).css("cursor", "pointer").removeAttr("title"), this.score.removeAttr("readonly", "readonly");
            for (var e = 0; e < this.opt.number; e++) this.stars.eq(e).attr("title", a._getHint.call(this, e + 1));
            this.cancel && this.cancel.css("display", "")
        },
        cancel: function(e) {
            return this.each(function() {
                t(this).data("readonly") !== !0 && (a[e ? "click" : "score"].call(this, null), this.score.removeAttr("value"))
            })
        },
        click: function(e) {
            return t(this).each(function() {
                t(this).data("readonly") !== !0 && (a._apply.call(this, e), this.opt.click || a._error.call(this, 'You must add the "click: function(score, evt) { }" callback.'), this.opt.click.call(this, e, {
                    type: "click"
                }), a._target.call(this, e))
            })
        },
        destroy: function() {
            return t(this).each(function() {
                var a = t(this),
                    e = a.data("raw");
                e ? a.off(".raty").empty().css({
                    cursor: e.style.cursor,
                    width: e.style.width
                }).removeData("readonly") : a.data("raw", a.clone()[0])
            })
        },
        getScore: function() {
            var a, e = [];
            return t(this).each(function() {
                a = this.score.val(), e.push(a ? parseFloat(a) : void 0)
            }), e.length > 1 ? e : e[0]
        },
        readOnly: function(e) {
            return this.each(function() {
                var i = t(this);
                i.data("readonly") !== e && (e ? (i.off(".raty").children("img").off(".raty"), a._lock.call(this)) : (a._binds.call(this), a._unlock.call(this)), i.data("readonly", e))
            })
        },
        reload: function() {
            return a.set.call(this, {})
        },
        score: function() {
            return arguments.length ? a.setScore.apply(this, arguments) : a.getScore.call(this)
        },
        set: function(a) {
            return this.each(function() {
                var e = t(this),
                    i = e.data("settings"),
                    s = t.extend({}, i, a);
                e.raty(s)
            })
        },
        setScore: function(e) {
            return t(this).each(function() {
                t(this).data("readonly") !== !0 && (a._apply.call(this, e), a._target.call(this, e))
            })
        }
    };
    t.fn.raty = function(e) {
        return a[e] ? a[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist!") : a.init.apply(this, arguments)
    }, t.fn.raty.defaults = {
        cancel: !1,
        cancelHint: "Cancel this rating!",
        cancelOff: "images/cancel-off.png",
        cancelOn: "images/cancel-on.png",
        cancelPlace: "left",
        click: void 0,
        half: !1,
        halfShow: !0,
        hints: ["bad", "poor", "regular", "good", "gorgeous"],
        iconRange: void 0,
        mouseout: void 0,
        mouseover: void 0,
        noRatedMsg: "Not rated yet!",
        number: 5,
        numberMax: 20,
        path: "",
        precision: !1,
        readOnly: !1,
        round: {
            down: .25,
            full: .6,
            up: .76
        },
        score: void 0,
        scoreName: "score",
        single: !1,
        size: 24,
        space: !0,
        starHalf: "images/star-half-big.png",
        starOff: "images/star-off-big.png",
        starOn: "images/star-on-big.png",
        target: void 0,
        targetFormat: "{score}",
        targetKeep: !1,
        targetText: "",
        targetType: "hint",
        width: void 0
    }
}(jQuery);