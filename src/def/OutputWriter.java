package def;

import java.io.IOException;

public interface OutputWriter {

	public void write(String s) throws IOException;
	public void flush() throws IOException; 
	public void close() throws IOException;
	
}
