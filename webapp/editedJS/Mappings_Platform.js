
org={apache:{commons:{collections:{
	list:{TreeList:Array},
	map:{}}}}};
org.apache.commons.collections.map.ReferenceMap = function(){return {};};

let java={
		lang:{},
		util:{},
}
java.lang.System = System;

java.util.EnumMap = function(EnumType) {
	// this is, how normal Maps are emulated by JSweet
	return {};
};

java.util.WeakHashMap = function() {
	// this is, how normal Maps are emulated by JSweet
	return {};
};

java.util.LinkedList = function(EnumType) {
	// this is, how lists are emulated by JSweet
	return [];
};