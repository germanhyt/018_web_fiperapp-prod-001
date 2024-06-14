import { useEffect, useState } from "react";

let window = globalThis;
const useSpeechRecognition = () => {
  // Hooks
  const [isListening, setIsListening] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  let recognition = null;
  if ("webkitSpeechRecognition" in window) {
    recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    //   recognition.interimResults = true;
    recognition.lang = "es-PE";
  }

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      // console.log("onresult event", event);
      let interimTranscript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      // setText(event.results[0][0].transcript);
      setText(interimTranscript);

      recognition.stop();
      setIsListening(false);
    };
  }, [text, recognition]);

  const startListining = () => {
    setText("");

    setIsListening(true);
    recognition.start();
  };

  const stopListining = () => {
    setIsListening(false);
    recognition.stop();
  };

  const handleMouseDown = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleMouseUp = () => {
    if (recognition && isListening) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return {
    text,
    isListening,
    startListining,
    stopListining,
    handleMouseUp,
    handleMouseDown,
    hasRecognitionSupport: !!recognition,
    clearText: () => {
      setText("");
    },
  };
};

export default useSpeechRecognition;
