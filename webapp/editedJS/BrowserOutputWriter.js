/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var def;
(function (def) {
    var BrowserOutputWriter = (function () {
        function BrowserOutputWriter(filename) {
            this.fileName = null;
            this.buffer = null;
            this.fileName = filename;
            this.buffer = { str: "", toString: function () { return this.str; } };
        }
        /**
         *
         * @param {string} s
         */
        BrowserOutputWriter.prototype.write = function (s) {
            /* append */ (function (sb) { return sb.str = sb.str.concat(s); })(this.buffer);
        };
        /**
         *
         */
        BrowserOutputWriter.prototype.flush = function () {
        };
        /**
         *
         */
        BrowserOutputWriter.prototype.close = function () {
            var output = this.buffer.str;
            console.info("=== CONSOLE OUTPUT WRITER || START ===");
            console.info(output);
            console.info("=== CONSOLE OUTPUT WRITER || END ===");
            
            var newWindow = window.open(this.filename, this.filename);
            if (newWindow != null) {
            	newWindow.document.write(output);				
			}
            else {
            	alert("Report can't be opened. Make sure to allow popups in your browser.");
            }
        };
        return BrowserOutputWriter;
    }());
    def.BrowserOutputWriter = BrowserOutputWriter;
    BrowserOutputWriter["__class"] = "def.BrowserOutputWriter";
    BrowserOutputWriter["__interfaces"] = ["def.OutputWriter"];
})(def || (def = {}));
