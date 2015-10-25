package com.language.threads;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import com.ibm.watson.developer_cloud.speech_to_text.v1.SpeechToText;
import com.ibm.watson.developer_cloud.speech_to_text.v1.model.SpeechResults;

public class ContextRunnable implements Runnable {

	private static final String HOST_WEB_SERVER = "https://infinite-brook-7279.herokuapp.com/v1/speech/text";
	private File audioFile;
	
	public ContextRunnable(File newAudioFile){
		audioFile = newAudioFile;
	}
	
	@Override
	public void run() {
		    //Although auto-detect is available, it is recommended you select your region for added accuracy.
		    try { 	
		    	//transcribeAudioGoogle();
		    	String resultsString = transcribeAudio();
		    	sendPostRequest(resultsString);		    	
		    	writeResultsToFile(resultsString);
		    }
		    catch (Exception ex) {
		      // TODO Handle how to respond if Google cannot be contacted
		      System.out.println ("Error, something went wrong while transcribing");
		      ex.printStackTrace ();
		    }
		    PrintWriter outer = new PrintWriter(System.out);
		   	
	}
	private void writeResultsToFile(String resultsString) {

	     BufferedWriter bw = null;
	     try {
	         // APPEND MODE SET HERE
	         bw = new BufferedWriter(new FileWriter("sentences.txt", true));
	         bw.write(resultsString);
	     	 bw.newLine();
	     	 bw.flush();
	      } 
	      catch (IOException ioe) {
	    	  ioe.printStackTrace();
	      } 
	      finally {                       // always close the file
	    	  if (bw != null){
	    		  try {
	    			  bw.close();
	    		  } 
	    	  	  catch (IOException ioe2) {
	    			  System.out.println(ioe2.getMessage());
	    		  }
	    	  }
	     } 
		
	}

	
	private String transcribeAudio() {
		SpeechToText service = new SpeechToText();
    	service.setUsernameAndPassword(“username”, “password”);
   
    	Map<String, Object> params = new HashMap<>();
    	params.put("audio", audioFile);
    	params.put("content_type", "audio/wav; rate=44100");
    	params.put("word_confidence", true);
    	params.put("continuous", false);
    	params.put("timestamps", false);
    	params.put("inactivity_timeout", 30);
    	params.put("max_alternatives", 1);
    	params.put("Transfer-Encoding", "chunked");

    	SpeechResults transcript = service.recognize(params);
		return transcript.toString();
	}
	
	
	private void sendPostRequest(String resultsString) {
		HttpClient httpClient = new DefaultHttpClient(); //Use this instead 

        try {
            HttpPost request = new HttpPost(HOST_WEB_SERVER);
            StringEntity parameters = new StringEntity(resultsString);
           // request.addHeader("content-type", "application/x-www-form-urlencoded");
            request.setEntity(parameters);
            HttpResponse response = httpClient.execute(request);
            System.out.println(response.toString());
        }catch (Exception ex) {
            // handle exception here
        	ex.printStackTrace();
        } finally {
            httpClient.getConnectionManager().shutdown(); //Deprecated
        }
		
	}
	
	private static void transcribeAudioGoogle(){
	      //int maxNumOfResponses = 4;
	      //System.out.println("Sample rate is: " + (int) mic.getAudioFormat().getSampleRate());
//	      GoogleResponse response = recognizer.getRecognizedDataForFlac(audioFile);
//	     // = recognizer.getRecognizedDataForFlac (file, maxNumOfResponses, (int) mic.getAudioFormat().getSampleRate ());
//	      stringresp = response.getResponse();
//	      System.out.println ("Google Response: " + stringresp);
//	      System.out.println ("Google is " + Double.parseDouble (response.getConfidence ()) * 100 + "% confident in" + " the reply");
//	      System.out.println ("Other Possible responses are: ");
//	      for (String s:response.getOtherPossibleResponses ()) {
//		  System.out.println ("\t" + s);
	    	
	}
		

}
