package com.language.processor;
import com.language.threads.CaptureRunnable;
import com.language.threads.KillRunnable;
import com.language.threads.MonitorRunnable;


public class Main {
	
	public static void main(String[] args) throws InterruptedException{	
		//instantiates all threads
		Thread kill = new Thread(new KillRunnable());
		Thread capture = new Thread(new CaptureRunnable());
		Thread monitor = new Thread(new MonitorRunnable(capture));
		
		//Starts all threads.
		kill.start();
		capture.start();
		monitor.start();
		
		//Joins the threads... main will never exit until forced to close or q is entered from the console.
		kill.join();
		capture.join();
		monitor.join();
	}
}
