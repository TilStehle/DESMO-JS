package def;

import java.util.function.Supplier;

import def.random_js.random.MT19937;
import desmoj.core.dist.UniformRandomGenerator;

public class MersenneTwisterRandomGeneratorJS implements UniformRandomGenerator{

	private def.random_js.random.Random random;
	
	/*
	public MersenneTwisterRandomGeneratorJS() {
		this(42);
	}
	*/
	
	public MersenneTwisterRandomGeneratorJS(long seed) {
		setSeed(seed);
	}

	@Override
	public double nextDouble() {
		return random.real(0, 1, true);
	}

	@Override
	public void setSeed(long seed) {

		Supplier<MT19937> s = def.random_js.random.Random.engines.mt19937;
		MT19937 mt19937 = s.get();
		mt19937.seed(42);
		random = new def.random_js.random.Random(mt19937);
		
	}

}
