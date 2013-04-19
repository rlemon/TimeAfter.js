/* 
	TimeAfter.js by Robert Lemon (rlemon - rob.lemon@gmail.com) 
	http://github.com/rlemon/TimeAfter.js 
	WTFPL (http://www.wtfpl.net/)
*/
function TimeAfter() {
    this.to = 0;
    this.rt = undefined;
    this.clear();
}
TimeAfter.prototype = {
    constructor: TimeAfter,
    now: function () {
        return new Date().getTime();
    },
    start: function () {
        this.st = this.now();
        this.time = 0;
        this.resume();
    },
    stop: function () {
        clearTimeout(this.to);
        return this.time;
    },
    resume: function () {
        this.rs = this.now();
        this.check();
    },
    register: function (after, func) {
        var cb = {
            fn: func,
            step: 0,
            after: after
        };
        this.callbacks.push(cb);
    },
    unregister: function (func) {
        this.callbacks = this.callbacks.filter(function (callback) {
            return callback.fn != func;
        });
    },
    check: function () {
        var n = this.now(),
            ttime = n - (this.rt || this.st);
        this.time = n - this.st;
        this.to = setTimeout(this.check.bind(this), 1);
        this.callbacks.forEach(function (cb, i) {
            if (cb.after && ttime >= cb.after * (cb.step + 1)) {
                if (typeof cb.fn === 'function') {
                    cb.fn.call(this, cb);
                }
                cb.step++;
            }
        }.bind(this));
    },
    clear: function () {
        clearTimeout(this.to);
        this.st = 0;
        this.time = 0;
        this.callbacks = [];
    }
};