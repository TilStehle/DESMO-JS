java.lang.System ={
 nanoTime: function() {
    var date = new Date();
    return Math.floor(date.getMilliseconds()) * 1000000;
},
currentTimeMillis : function() {
    var date = new Date();
    return Math.floor(date.getMilliseconds());
},
getProperty : function(key) {
    switch ((key)) {
        case "line.separator":
            return "/";
        default:
            return null;
    }
}
};

