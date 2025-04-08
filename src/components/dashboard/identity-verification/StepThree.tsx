import React from 'react';
import axios from 'axios';
import { useToast } from '../../../hooks/use-toast';
import useUserDetails from '../../../stores/userStore';
import { useUploadDocumentModal } from '../../../lib/utils';
import { Loader2Icon } from 'lucide-react';

interface LivenessCheckProps {}

const StepThree: React.FC<LivenessCheckProps> = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const recordingVideoRef = React.useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<BlobPart[]>([]);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [recordedVideo, setRecordedVideo] = React.useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<boolean | null>(null);
  const [isUploading, setIsUploading] = React.useState(false)

  const { toast } = useToast();
  const { token, user, kycStatus, fetchKycStatus, fetchKycDetails } = useUserDetails();
  const { onClose } = useUploadDocumentModal();

  React.useEffect(() => {
    if (isRecording && videoRef.current && recordingVideoRef.current) {
      recordingVideoRef.current.srcObject = videoRef.current.srcObject;
      recordingVideoRef.current.play().catch(error => console.error("Error playing recording video:", error));
    } else if (!isRecording && recordingVideoRef.current) {
      if (recordingVideoRef.current.srcObject) {
        const tracks = (recordingVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      recordingVideoRef.current.srcObject = null;
      recordingVideoRef.current.src = '';
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(error => console.error("Error playing video stream:", error));

        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(blob);
          setRecordedVideo(videoUrl);
          // Stop all tracks in the stream
          stream.getTracks().forEach((track) => track.stop());
          await uploadVideo(blob);
        };

        mediaRecorder.start();
        setIsRecording(true);

        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, 30000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: 'Error',
        description: 'Camera access denied or unavailable.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadVideo = async (blob: Blob) => {
    setUploadStatus(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('short_video', blob, 'liveness_check.webm');

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.olamax.io/api/upload-short-video',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios.request(config);
      console.log('step-3', response);
      if (response.status === 201) {
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success',
        });
        setIsUploading(false);
        setUploadStatus(true);
        onClose();
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast({
          title: 'Error',
          description: error.response?.data.message || 'Something went wrong, try again later!',
          variant: 'destructive',
        });
        setIsUploading(false);
        setUploadStatus(false);
        console.error("Error uploading video:", error.response?.data.message || error.message);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong!! Try again later',
          variant: 'destructive',
        });
        setIsUploading(false);
        setUploadStatus(false);
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleRetry = () => {
    setRecordedVideo(null);
    setUploadStatus(null);
  };

    React.useEffect(()=> {
      if (user) {
        fetchKycStatus();
        fetchKycDetails();
      }
    },[user]);

  const video_status = { kyc_documents_video_status: "pending" };

  React.useEffect(() => {
    if (kycStatus) {
      function checkObjectPresence(object1: Record<string, any>, generalObject: Record<string, any>): boolean {
        const object1Keys = Object.keys(object1);
      
        return object1Keys.every((key) => generalObject.hasOwnProperty(key));
      };

      if (checkObjectPresence(video_status, kycStatus)) {
        onClose();
      }
    }
  }, [kycStatus]);

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} style={{ display: 'none' }} />
      {isRecording && (
        <video ref={recordingVideoRef} autoPlay className='size-[250px] rounded-full overflow-hidden object-cover mb-4' />
      )}
      { recordedVideo ? (
        <div className="flex flex-col items-center">
          <video src={recordedVideo} className='xl:size-[250px] rounded-full overflow-hidden object-cover' />
          {uploadStatus === true && <p className="mt-2 text-green-500">Upload successful!</p>}
          {uploadStatus === false && <p className="mt-2 text-red-500">Upload failed!</p>}
          {uploadStatus === false && <button onClick={handleRetry} className="mt-2 px-4 py-2 text-sm bg-primary hover:bg-secondary text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">Retry</button>}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className='text-sm lg:text-base px-6 py-3 bg-primary hover:bg-secondary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1'
          >
            {isRecording ? 'Recording (30s)' : 'Start Liveness Check'}
          </button>
          {isRecording && (
            <button onClick={stopRecording} className='mt-2 text-sm lg:text-base px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1'>
              Stop Recording
            </button>
          )}
        </div>
      )}
      { isUploading &&
        <div className='flex items-center justify-center gap-4 lg:text-base text-sm mt-4'>
          Uploading video... <Loader2Icon className='animate-spin'/>
        </div>
      }
    </div>
  );
};

export default StepThree;