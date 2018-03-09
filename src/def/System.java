package def;

import jsweet.lang.Date;

public class System {

	public static long nanoTime() {
		
		Date date = new Date();
		return (long) date.getMilliseconds()*1000000;
	}
	
	public static long currentTimeMillis() {
		
		Date date = new Date();
		return (long) date.getMilliseconds();
	}
	
	public static String getProperty(String key) {
		
		switch (key) {
		case "line.separator":
			return "/";
		default:
			return null;
		}
	}
}
