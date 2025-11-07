import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, Blob, LiveSession, LiveServerMessage } from '@google/genai';

// --- Helper Functions for Audio Processing ---

// Decodes Base64 string to Uint8Array
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Encodes Uint8Array to Base64 string
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Decodes raw PCM data into an AudioBuffer for playback
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Creates a Blob object for the GenAI API from raw audio data
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Icons ---
const MicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
);

const StopCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <rect x="9" y="9" width="6" height="6"></rect>
    </svg>
);

// --- Component ---

type SessionStatus = 'idle' | 'connecting' | 'live' | 'error' | 'closed';
type TranscriptionTurn = { speaker: 'user' | 'model'; text: string };

const LivePage: React.FC = () => {
    const [status, setStatus] = useState<SessionStatus>('idle');
    const [transcription, setTranscription] = useState<TranscriptionTurn[]>([]);
    const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const audioRefs = useRef<{
        inputAudioContext: AudioContext | null;
        outputAudioContext: AudioContext | null;
        mediaStream: MediaStream | null;
        scriptProcessor: ScriptProcessorNode | null;
        sources: Set<AudioBufferSourceNode>;
        nextStartTime: number;
    }>({
        inputAudioContext: null,
        outputAudioContext: null,
        mediaStream: null,
        scriptProcessor: null,
        sources: new Set(),
        nextStartTime: 0,
    });
    
    // Refs for managing transcription pieces
    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');

    const scrollToBottom = () => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [transcription]);

    const handleStart = useCallback(async () => {
        try {
            setStatus('connecting');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioRefs.current.mediaStream = stream;
            setMicPermission('granted');

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            audioRefs.current.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioRefs.current.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            audioRefs.current.sources = new Set();
            audioRefs.current.nextStartTime = 0;

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setStatus('live');
                        const source = audioRefs.current.inputAudioContext!.createMediaStreamSource(stream);
                        const scriptProcessor = audioRefs.current.inputAudioContext!.createScriptProcessor(4096, 1, 1);
                        audioRefs.current.scriptProcessor = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromise.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(audioRefs.current.inputAudioContext!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && audioRefs.current.outputAudioContext) {
                            audioRefs.current.nextStartTime = Math.max(
                                audioRefs.current.nextStartTime,
                                audioRefs.current.outputAudioContext.currentTime,
                            );
                            const audioBuffer = await decodeAudioData(
                                decode(base64Audio),
                                audioRefs.current.outputAudioContext,
                                24000, 1
                            );
                            const source = audioRefs.current.outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(audioRefs.current.outputAudioContext.destination);
                            source.addEventListener('ended', () => {
                                audioRefs.current.sources.delete(source);
                            });
                            source.start(audioRefs.current.nextStartTime);
                            audioRefs.current.nextStartTime += audioBuffer.duration;
                            audioRefs.current.sources.add(source);
                        }

                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.turnComplete) {
                            const fullInput = currentInputTranscriptionRef.current.trim();
                            const fullOutput = currentOutputTranscriptionRef.current.trim();
                            
                            setTranscription(prev => {
                                const newTurns: TranscriptionTurn[] = [];
                                if (fullInput) newTurns.push({ speaker: 'user', text: fullInput });
                                if (fullOutput) newTurns.push({ speaker: 'model', text: fullOutput });
                                return [...prev, ...newTurns];
                            });

                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }

                        if (message.serverContent?.interrupted) {
                            for (const source of audioRefs.current.sources.values()) {
                                source.stop();
                            }
                            audioRefs.current.sources.clear();
                            audioRefs.current.nextStartTime = 0;
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setStatus('error');
                    },
                    onclose: () => {
                        setStatus('closed');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: 'You are a helpful and friendly conversational AI on the Lade Stack Blog. Keep your responses concise and engaging.',
                },
            });
            sessionPromiseRef.current = sessionPromise;
        } catch (error) {
            console.error('Failed to start session:', error);
            setStatus('error');
            if ((error as Error).name === 'NotAllowedError' || (error as Error).name === 'PermissionDeniedError') {
                setMicPermission('denied');
            }
        }
    }, []);

    const cleanup = useCallback(() => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        audioRefs.current.mediaStream?.getTracks().forEach(track => track.stop());
        audioRefs.current.scriptProcessor?.disconnect();
        audioRefs.current.inputAudioContext?.close();
        audioRefs.current.outputAudioContext?.close();
        for (const source of audioRefs.current.sources.values()) {
            source.stop();
        }
        audioRefs.current.sources.clear();
        currentInputTranscriptionRef.current = '';
        currentOutputTranscriptionRef.current = '';
    }, []);

    const handleStop = () => {
        cleanup();
        setStatus('idle');
        setTranscription([]);
    };

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    const statusMessages = {
        idle: 'Start a voice conversation with our AI assistant.',
        connecting: 'Connecting to live session... Please wait.',
        live: 'You are live. Start speaking now.',
        error: 'An error occurred. Please refresh and try again.',
        closed: 'The conversation has ended.',
    };

    const StatusIndicator = () => (
        <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`relative flex h-3 w-3 ${status === 'live' ? '' : 'hidden'}`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p className="text-muted-foreground">{statusMessages[status]}</p>
        </div>
    );
    
    return (
        <div className="max-w-3xl mx-auto animate-fade-in text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Live Conversation
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
                Talk directly to a Gemini-powered AI assistant.
            </p>
            
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
                <StatusIndicator />
                {micPermission === 'denied' && (
                    <p className="text-destructive text-sm">Microphone access was denied. Please enable it in your browser settings to use this feature.</p>
                )}
                
                <div className="flex justify-center">
                    {status === 'live' || status === 'connecting' ? (
                        <button
                            onClick={handleStop}
                            disabled={status === 'connecting'}
                            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 px-8 disabled:opacity-50"
                        >
                            <StopCircleIcon className="h-5 w-5" />
                            Stop Conversation
                        </button>
                    ) : (
                        <button
                            onClick={handleStart}
                            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                        >
                            <MicIcon className="h-5 w-5" />
                            Start Conversation
                        </button>
                    )}
                </div>

                <div className="w-full h-80 bg-background rounded-md border p-4 overflow-y-auto text-left space-y-4">
                    {transcription.length === 0 && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Conversation transcript will appear here...</p>
                        </div>
                    )}
                    {transcription.map((turn, index) => (
                        <div key={index} className={`flex flex-col ${turn.speaker === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`rounded-lg px-4 py-2 max-w-[80%] ${turn.speaker === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                <p className="text-xs font-bold mb-1">{turn.speaker === 'user' ? 'You' : 'Gemini'}</p>
                                <p className="text-sm">{turn.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={transcriptEndRef} />
                </div>
            </div>
        </div>
    );
};

export default LivePage;