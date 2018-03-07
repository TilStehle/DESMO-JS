package def;

public class NumberValueHelper{

	public static final int INT_MAX_VALUE = 2147483647;
	public static final int INT_MIN_VALUE = -2147483648;
	
	public static double doubleValue(Number number) {
		return (double) number.doubleValue();
	}

	public static float floatValue(Number number) {
		return (float) number.floatValue();
	}

	public static int intValue(Number number) {
		return (int) number.intValue();
	}

	public static long longValue(Number number) {
		return (long) number.longValue();
	}
	

}
