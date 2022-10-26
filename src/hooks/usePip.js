import { useCallback, useEffect } from "react";
import { closePIP, isInPIP, openPIP } from "../util/pip";

const defaultOptions = {
  autoPIP: true
};

const usePIP = (
  videoElement,
  options = defaultOptions
) => {
  const disablePIP = useCallback(async () => {
    await closePIP(videoElement.current).catch(console.warn);
  }, [videoElement]);

  const enablePIP = useCallback(async () => {
    await openPIP(videoElement.current).catch(console.warn);
  }, [videoElement]);

  const handleVisibility = useCallback(async () => {
    if (document.visibilityState === "visible") await disablePIP();
    else await enablePIP();
  }, [disablePIP, enablePIP]);

  const togglePIP = useCallback(async () => {
    if (isInPIP()) await disablePIP();
    else await enablePIP();
  }, [enablePIP, disablePIP]);

  useEffect(() => {
    if (!options.autoPIP) return;
    const video = videoElement.current;

    if (video && "autoPictureInPicture" in video)
      // @ts-ignore
      video.autoPictureInPicture = true;

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [options.autoPIP, videoElement, handleVisibility]);

  return {
    enablePIP,
    disablePIP,
    togglePIP
  };
};

export default usePIP;
