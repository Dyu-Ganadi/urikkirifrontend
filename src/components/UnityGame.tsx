import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

interface UnityGameProps {
  token: string;
  roomCode: string;
}

export const UnityGame = ({ token, roomCode }: UnityGameProps) => {
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "Build/Builds.loader.js",
    dataUrl: "Build/Builds.data.br",
    frameworkUrl: "Build/Builds.framework.js.br",
    codeUrl: "Build/Builds.wasm.br",
  });

  useEffect(() => {
    if (isLoaded) {
      console.log("Unity 로드 완료, 데이터 전송:", { token, roomCode });
      sendMessage("GameManager", "SetRoomCode", roomCode);
      sendMessage("Networking", "SetAccessToken", token);
    }
  }, [isLoaded, token, roomCode, sendMessage]);

  return (
    <>
      <Unity
        className="w-full h-full"
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
      />
    </>
  );
};
