package com.language.threads;

public class MonitorRunnable implements Runnable{

	private static final long TIME_TO_INTERRUPT = 5000L;
	private Thread monitored;
	
	public MonitorRunnable(Thread newMonitored){
		monitored = newMonitored;
	}
	@Override
	public void run() {
		while(true){
			try {
				Thread.sleep(TIME_TO_INTERRUPT);
				monitored.interrupt();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}	
		}			
	}
	

}
