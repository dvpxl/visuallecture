package com.language.threads;

import java.io.File;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.TargetDataLine;

public class CaptureRunnable implements Runnable{
	AudioFileFormat.Type targetType = AudioFileFormat.Type.WAVE;
	@Override
	public void run() {
		    int count = 0;
			while(true){
				File outputFile = new File("testAudio" + count + ".wav");

				/* For simplicity, the audio data format used for recording
				   is hardcoded here. We use PCM 44.1 kHz, 16 bit signed,
				   stereo.
				*/
				AudioFormat	audioFormat = new AudioFormat(
					AudioFormat.Encoding.PCM_SIGNED,
					44100.0F, 16, 2, 4, 44100.0F, false);
				DataLine.Info	info = new DataLine.Info(TargetDataLine.class, audioFormat);
				TargetDataLine	targetDataLine = null;
				try
				{
					targetDataLine = (TargetDataLine) AudioSystem.getLine(info);
					targetDataLine.open(audioFormat);
				}
				catch (LineUnavailableException e)
				{
					System.out.println("unable to get a recording line");
					e.printStackTrace();
					System.exit(1);
				}
				SimpleAudioRecorder	recorder = new SimpleAudioRecorder(
						targetDataLine,
						targetType,
						outputFile);
				recorder.start();
				if(outputFile.exists()) outputFile.delete();
//				Microphone mic = new Microphone(FLACFileWriter.FLAC);
//				try {
//				      mic.captureAudioToFile (outputFile);
//				    } catch (Exception ex) {
//				      //Microphone not available or some other error.
//				      System.out.println ("ERROR: Microphone is not availible.");
//				      ex.printStackTrace ();
//				    }
				while(!Thread.interrupted());
				recorder.stopRecording();
//				mic.close();
				new Thread(new ContextRunnable(outputFile)).start();;
				
				count ++;
			}		
		
	}

}
