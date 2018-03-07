package def;

import java.util.function.Supplier;

import def.random_js.random.MT19937;

public class Random {

	private def.random_js.random.Random random;
	
	public Random(long seed) {

		setSeed(seed);
	}
	
	/**
	 * Makes this Random use a random seed similar to a Java Random instantiated with Random()
	 */
	public void autoSeed() {
		
		Supplier<MT19937> s = def.random_js.random.Random.engines.mt19937;
		MT19937 mt19937 = s.get();
		mt19937.autoSeed();
		random = new def.random_js.random.Random(mt19937);
	}
	
	public void setSeed(long seed) {
		
		Supplier<MT19937> s = def.random_js.random.Random.engines.mt19937;
		MT19937 mt19937 = s.get();
		mt19937.seed(seed);
		random = new def.random_js.random.Random(mt19937);
	}
	
	public int nextInt() {
		
		return (int) random.integer(NumberValueHelper.INT_MIN_VALUE, NumberValueHelper.INT_MAX_VALUE);
	}
	
	public int nextIntWithBound(int bound) {
		
		return (int) random.integer(0, bound);
	}

	public double nextDouble() {
		
		return random.real(0, 1, true);
	}
}
