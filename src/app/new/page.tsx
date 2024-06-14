"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSpeechRecognition from "@/core/hooks/useSpeechRecognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface IProps {
  params: {
    id: string;
  };
}

const NewPage = ({ params }: IProps) => {
  // Hooks
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mount, setMount] = useState<number>(0);
  const [operationtypeId, setOperationtypeId] = useState<number>(0);
  const [titleSpeech, setTitleSpeech] = useState<string>("");
  const [descriptionSpeech, setDescriptionSpeech] = useState<string>("");

  const titleRecognition = useSpeechRecognition();
  const descriptionRecognition = useSpeechRecognition();

  useEffect(() => {
    if (titleRecognition.text) {
      setTitleSpeech(titleRecognition.text);
    }
  }, [titleRecognition.text]);

  useEffect(() => {
    if (descriptionRecognition.text) {
      setDescriptionSpeech(descriptionRecognition.text);
    }
  }, [descriptionRecognition.text]);

  // Methods
  useEffect(() => {
    if (params.id) {
      fetch(`/api/operations/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("LOG 1", data);
          setTitle(data.title);
          setDescription(data.description);
          setMount(data.mount);
          setOperationtypeId(data.operationtypeId);
        });
    }
  }, [params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const operation = {
      title: form.titleheading.value,
      description: form.description.value,
      mount: Number(form.mount.value),
      operationtypeId: Number(form.operationtypeId.value),
    };
    // console.log("LOG 2", operation);

    if (params.id) {
      const res = await fetch(`/api/operations/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      });

      const data = await res.json();
      console.log("LOG 3", data);

      router.refresh();
      router.push("/operations");
    } else {
      const res = await fetch("/api/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(operation),
      });

      const data = await res.json();
      console.log(data);

      router.refresh();
      router.push("/operations");
    }
  };

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      {isPageLoaded && (
        <div>
          <div className="container mx-auto">
            <div className="my-12 flex flex-col justify-center items-center rounded-lg">
              <h2 className="mx-auto py-2 text-2xl">
                {params.id ? "Editar Operación" : "Crear Operación"}
              </h2>
              <form
                onSubmit={onSubmit}
                className="w-full sm:w-1/3 flex flex-col space-y-4"
              >
                <div className="flex justify-between items-center gap-1">
                  <input
                    type="text"
                    name="titleheading"
                    value={title || titleSpeech}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      titleRecognition.clearText();
                    }}
                    placeholder="Titulo"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {titleRecognition.hasRecognitionSupport && (
                    <div>
                      <button
                        type="button"
                        onMouseDown={titleRecognition.handleMouseDown}
                        onMouseUp={titleRecognition.handleMouseUp}
                        onTouchStart={titleRecognition.handleMouseDown}
                        onTouchEnd={titleRecognition.handleMouseUp}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        {titleRecognition.isListening ? (
                          <FaMicrophone />
                        ) : (
                          <FaMicrophoneSlash />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-1">
                  <input
                    type="text"
                    name="description"
                    value={description || descriptionSpeech}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      descriptionRecognition.clearText();
                    }}
                    placeholder="Descripcion"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {descriptionRecognition.hasRecognitionSupport && (
                    <div>
                      <button
                        type="button"
                        onMouseDown={descriptionRecognition.handleMouseDown}
                        onMouseUp={descriptionRecognition.handleMouseUp}
                        onTouchStart={descriptionRecognition.handleMouseDown}
                        onTouchEnd={descriptionRecognition.handleMouseUp}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        {descriptionRecognition.isListening ? (
                          <FaMicrophone />
                        ) : (
                          <FaMicrophoneSlash />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="number"
                  name="mount"
                  value={mount}
                  onChange={(e) => setMount(Number(e.target.value))}
                  placeholder="Monto"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <select
                  name="operationtypeId"
                  value={operationtypeId}
                  onChange={(e) => setOperationtypeId(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="1">Ingreso</option>
                  <option value="2">Gasto</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {params.id ? "Editar" : "Crear"}
                </button>

                {params.id && (
                  <button
                    onClick={async () => {
                      const res = await fetch(`/api/operations/${params.id}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });

                      const data = await res.json();
                      console.log(data);

                      router.refresh();
                      router.push("/operations");
                    }}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Eliminar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPage;
