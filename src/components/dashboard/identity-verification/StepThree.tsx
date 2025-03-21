import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../../hooks/use-toast';
import useUserDetails from '../../../stores/userStore';
import { useUploadDocumentModal } from '../../../lib/utils';

interface LivenessCheckProps {}

const StepThree: React.FC<LivenessCheckProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingVideoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { toast } = useToast();
  const { token } = useUserDetails();
  const { onClose } = useUploadDocumentModal();

  useEffect(() => {
    if (isRecording && videoRef.current && recordingVideoRef.current) {
      recordingVideoRef.current.srcObject = videoRef.current.srcObject;
      recordingVideoRef.current.play();
    } else if (!isRecording && recordingVideoRef.current) {
      recordingVideoRef.current.srcObject = null;
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideo(videoUrl);
          stream.getTracks().forEach((track) => track.stop());
          uploadVideo(blob, false); // false = live recording
        };

        mediaRecorder.start();
        setIsRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 30000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or unavailable.');
    }
  };

  const uploadVideo = async (blob: Blob | File, isFile: boolean) => {
    setUploadStatus(null);
    try {
      const formData = new FormData();
      formData.append('short_video', blob, 'liveness_check.webm');

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/upload-short-video',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: formData,
      };

      axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Success',
            description: response.data.message,
            variant: 'success'
          });
          setUploadStatus(true);
          onClose();
        };
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Error',
            description: error.response? error.response.data.message : 'Something went wrong, try again later!',
            variant: 'destructive'
          });
          setUploadStatus(false);
          console.error("Error fetching data message:", error.response?.data.message || error.message);        
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong!! Try again later',
            variant: 'destructive'
          });
          setUploadStatus(false);
          console.error("Unexpected error:", error);
        };
      });
    } catch (error) {
      setUploadStatus(false);
      console.error('Error uploading video:', error);
    } finally {
      if(isFile) {
        setVideoFile(null); //reset the file after upload.
      }
    }
  };

  const handleRetry = () => {
    setRecordedVideo(null);
    setUploadStatus(null);
    setVideoFile(null);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setRecordedVideo(URL.createObjectURL(file));
      uploadVideo(file, true); // true = uploaded file
    } else {
      alert('Please select a video file.');
    }
  };

  const handleVideoFilePlayback = () => {
    if (videoFile && recordingVideoRef.current) {
      recordingVideoRef.current.srcObject = null;
      recordingVideoRef.current.src = URL.createObjectURL(videoFile);
      recordingVideoRef.current.play();
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      {isRecording && (
        <video ref={recordingVideoRef} controls className='w-full aspect-video' />
      )}
      {recordedVideo ? (
        <div>
          <video src={recordedVideo} controls className='w-full aspect-video' />
          {uploadStatus === true && <p>Upload successful!</p>}
          {uploadStatus === false && <p>Upload failed!</p>}
          {uploadStatus === false && <button onClick={handleRetry}>Retry</button>}
        </div>
      ) : (
        <div>
          <button onClick={startRecording} disabled={isRecording || !!videoFile}>
            {isRecording ? 'Recording...' : 'Start Liveness Check (Record)'}
          </button>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'block', marginTop: '10px' }}
          />
          {videoFile && <button onClick={handleVideoFilePlayback}>Play Uploaded Video</button>}
        </div>
      )}
    </div>
  );
};

export default StepThree;