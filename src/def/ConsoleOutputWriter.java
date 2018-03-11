package def;

import java.io.IOException;
import java.lang.System;

import def.dom.Window;

public class ConsoleOutputWriter implements OutputWriter { //[FILE]

	private String fileName;
	private StringBuffer buffer;
	
	public ConsoleOutputWriter(String filename) {
		this.fileName = filename;
		this.buffer = new StringBuffer();
	}

	@Override
	public void write(String s) throws IOException {
		buffer.append(s);
		
	}

	@Override
	public void flush() throws IOException {
		
		//Flush
	}

	@Override
	public void close() throws IOException {
		
		String output = buffer.toString();
		
		System.out.println("=== CONSOLE OUTPUT WRITER || START ===");
		System.out.println(output);
		System.out.println("=== CONSOLE OUTPUT WRITER || END ===");
	}

}
