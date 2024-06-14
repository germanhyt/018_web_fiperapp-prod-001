"use client";
import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const SpeechInput = (instanceRecognition: any) => {
  console.log(instanceRecognition.hasRecognitionSupport);
  return (
    <div>
      <div>
        <button
          type="button"
          onMouseDown={instanceRecognition.handleMouseDown}
          onMouseUp={instanceRecognition.handleMouseUp}
          onTouchStart={instanceRecognition.handleMouseDown}
          onTouchEnd={instanceRecognition.handleMouseUp}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          {instanceRecognition.isListening ? (
            <FaMicrophone />
          ) : (
            <FaMicrophoneSlash />
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeechInput;
