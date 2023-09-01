import { useState } from "react";
import axios from 'axios';


export function VoiceRecording() {

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [audioChunks, setAudioChunks] = useState([]);

let mediaRecorder = null;

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setAudioChunks((chunks) => [...chunks, event.data]);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setAudioChunks([]);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
        setIsRecording(false);
      });
  };

  const stopRecording = async () => {
    setIsRecording(false);

    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    // Convert and send audio to Whisper API
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const apiKey = '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';

    try {
      const formData = new FormData();
      formData.append('file', audioBlob);

      const response = await axios.post(
        'http://localhost:4000/whisper/asr',  // Koristi svoju IP adresu ili domenu
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      

      // Handle response and set transcript state
      setTranscript(response.data.text);
    } catch (error) {
      console.error('Error:', error);
    }}

    return (
        <div className='bg-white mt-5 hidden'>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      <div>
        <p className='text-black'>Transcript: {transcript}</p>
      </div>
    </div>
    )

}

