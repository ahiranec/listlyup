/**
 * Hook para reconocimiento de voz usando Web Speech API
 * Reutilizable en cualquier campo de texto
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVoiceInputOptions {
  onTranscript?: (text: string) => void;
  language?: string;
  continuous?: boolean;
}

interface UseVoiceInputReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  error: string | null;
  permissionState: 'granted' | 'denied' | 'prompt' | 'unknown';
  startListening: () => Promise<void>;
  stopListening: () => void;
  toggleListening: () => Promise<void>;
  resetTranscript: () => void;
  requestPermission: () => Promise<boolean>;
}

export function useVoiceInput({
  onTranscript,
  language = 'es-CL', // Default español Chile
  continuous = false,
}: UseVoiceInputOptions = {}): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const recognitionRef = useRef<any>(null);

  // Check if browser supports Web Speech API
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Check microphone permission status
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' as PermissionName })
        .then((permissionStatus) => {
          console.log('[VoiceInput] Initial permission state:', permissionStatus.state);
          setPermissionState(permissionStatus.state as any);
          
          // Listen for permission changes
          permissionStatus.onchange = () => {
            console.log('[VoiceInput] Permission state changed to:', permissionStatus.state);
            setPermissionState(permissionStatus.state as any);
          };
        })
        .catch((err) => {
          // Permissions API not supported, default to unknown
          console.log('[VoiceInput] Permissions API not supported:', err);
          setPermissionState('unknown');
        });
    } else {
      console.log('[VoiceInput] Navigator.permissions not available');
      setPermissionState('unknown');
    }
  }, []);

  const initRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      setTranscript(currentTranscript.trim());
      
      if (finalTranscript && onTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      
      const errorMessages: Record<string, string> = {
        'no-speech': 'No se detectó voz. Intenta de nuevo.',
        'audio-capture': 'No se pudo acceder al micrófono. Verifica que esté conectado y no esté en uso.',
        'not-allowed': 'Permiso denegado. Haz clic en el botón "Permitir Micrófono" arriba.',
        'network': 'Error de red. Verifica tu conexión.',
        'aborted': 'Reconocimiento cancelado.',
        'service-not-allowed': 'Servicio no disponible. Asegúrate de estar usando HTTPS.',
      };

      setError(errorMessages[event.error] || 'Error al reconocer voz.');
      setIsListening(false);
      
      // Update permission state if denied
      if (event.error === 'not-allowed') {
        setPermissionState('denied');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  }, [isSupported, continuous, language, onTranscript]);

  // Request microphone permission explicitly
  const requestPermission = useCallback(async (): Promise<boolean> => {
    console.log('[VoiceInput] Requesting microphone permission...');
    
    try {
      // Try to get microphone access to trigger permission prompt
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      console.log('[VoiceInput] Permission granted, stream:', stream);
      
      // Stop all tracks immediately (we don't need the actual audio)
      stream.getTracks().forEach(track => track.stop());
      
      setPermissionState('granted');
      setError(null);
      return true;
    } catch (err: any) {
      console.error('[VoiceInput] Permission request failed:', err.name, err.message);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionState('denied');
        setError('Permiso denegado. Permite el acceso al micrófono en tu navegador.');
      } else if (err.name === 'NotFoundError') {
        setError('No se encontró ningún micrófono. Conecta un micrófono e intenta de nuevo.');
      } else {
        setError(`Error al solicitar permiso: ${err.message || 'Desconocido'}`);
      }
      
      return false;
    }
  }, []);

  const startListening = useCallback(async () => {
    if (!isSupported) {
      setError('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    // Check permission first
    if (permissionState === 'denied') {
      setError('Permiso denegado. Haz clic en "Permitir Micrófono" para otorgar acceso.');
      return;
    }

    // Request permission if not granted
    if (permissionState !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    try {
      if (!recognitionRef.current) {
        recognitionRef.current = initRecognition();
      }
      
      recognitionRef.current?.start();
      setTranscript('');
      setError(null);
    } catch (err: any) {
      console.error('Error starting recognition:', err);
      
      // Handle "already started" error
      if (err.message?.includes('already started')) {
        stopListening();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 100);
      } else {
        setError('Error al iniciar reconocimiento de voz.');
      }
    }
  }, [isSupported, permissionState, initRecognition, requestPermission]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(async () => {
    if (isListening) {
      stopListening();
    } else {
      await startListening();
    }
  }, [isListening, startListening, stopListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    error,
    permissionState,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    requestPermission,
  };
}
