"use client";

import { toast, type ToasterProps } from "sonner";

const props: ToasterProps = {
  position: "top-right",
  duration: 2500,
};

const notificationInfo = (
  title: string,
  description?: string,
  autoClose?: number
): void => {
  toast.info(title, {
    description: description,
    duration: autoClose ?? props.duration,
    position: props.position,
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  });
};

const notificationError = (
  title: string,
  description?: string,
  autoClose?: number
): void => {
  toast.error(title, {
    description: description,
    duration: autoClose ?? props.duration,
    position: props.position,
    style: {
      backgroundColor: "#FF0000",
      color: "#fff",
    },
  });
};

const notificationWarn = (
  title: string,
  description?: string,
  autoClose?: number
): void => {
  toast.warning(title, {
    description: description,
    duration: autoClose ?? props.duration,
    position: props.position,
    style: {
      backgroundColor: "#FFA500",
      color: "#000",
    },
  });
};

export { notificationInfo, notificationError, notificationWarn };
