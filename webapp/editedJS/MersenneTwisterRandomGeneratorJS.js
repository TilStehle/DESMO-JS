/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var def;
(function (def) {
    var MersenneTwisterRandomGeneratorJS = (function () {
        function MersenneTwisterRandomGeneratorJS(seed) {
            this.random = null;
            this.setSeed(seed);
        }
        /**
         *
         * @return {number}
         */
        MersenneTwisterRandomGeneratorJS.prototype.nextDouble = function () {
            return this.random.real(0, 1, true);
        };
        /**
         *
         * @param {number} seed
         */
        MersenneTwisterRandomGeneratorJS.prototype.setSeed = function (seed) {
            var s = (Random.engines.mt19937);
            var mt19937 = (function (target) { return (typeof target === 'function') ? target() : target.get(); })(s);
            mt19937.seed(42);
            this.random = new Random(mt19937);
        };
        return MersenneTwisterRandomGeneratorJS;
    }());
    def.MersenneTwisterRandomGeneratorJS = MersenneTwisterRandomGeneratorJS;
    MersenneTwisterRandomGeneratorJS["__class"] = "def.MersenneTwisterRandomGeneratorJS";
    MersenneTwisterRandomGeneratorJS["__interfaces"] = ["desmoj.core.dist.UniformRandomGenerator"];
})(def || (def = {}));
