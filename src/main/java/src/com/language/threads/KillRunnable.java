package com.language.threads;

import java.util.Scanner;

public class KillRunnable implements Runnable {

	private static final String KILL_STRING = "q";
	@Override
	public void run() {
		Scanner in = new Scanner(System.in);
		while(!in.next().equals(KILL_STRING));
		System.exit(0);
	}

}
