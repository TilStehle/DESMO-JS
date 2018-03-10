/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var def;
(function (def) {
    var Random = (function () {
        function Random(seed) {
            this.random = null;
            this.setSeed(seed);
        }
        /**
         * Makes this Random use a random seed similar to a Java Random instantiated with Random()
         */
        Random.prototype.autoSeed = function () {
            var s = (Random.engines.mt19937);
            var mt19937 = (function (target) { return (typeof target === 'function') ? target() : target.get(); })(s);
            mt19937.autoSeed();
            this.random = new Random(mt19937);
        };
        Random.prototype.setSeed = function (seed) {
            var s = (Random.engines.mt19937);
            var mt19937 = (function (target) { return (typeof target === 'function') ? target() : target.get(); })(s);
            mt19937.seed(seed);
            this.random = new Random(mt19937);
        };
        Random.prototype.nextInt = function () {
            return (this.random.integer(def.NumberValueHelper.INT_MIN_VALUE, def.NumberValueHelper.INT_MAX_VALUE) | 0);
        };
        Random.prototype.nextIntWithBound = function (bound) {
            return (this.random.integer(0, bound) | 0);
        };
        Random.prototype.nextDouble = function () {
            return this.random.real(0, 1, true);
        };
        return Random;
    }());
    def.Random = Random;
    Random["__class"] = "def.Random";
})(def || (def = {}));
