package def;

import static jsweet.util.Lang.$insert;

public class Integer {

	public static String toHexString(int value) {
		return toUnsignedRadixString(value, 16);
	}
	
	private static String toUnsignedRadixString(int value, int radix) {
		// ">>> 0" converts the value to unsigned number.
		return $insert("(value >>> 0).toString(radix)");
	}
	
	
	public static final int MIN_VALUE = 0x80000000;
	public static final int   MAX_VALUE = 0x7fffffff;

}
