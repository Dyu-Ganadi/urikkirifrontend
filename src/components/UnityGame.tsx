import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect } from "react";

interface UnityGameProps {
  token: string;
  roomCode: string;
}

export const UnityGame = ({ token, roomCode }: UnityGameProps) => {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/Builds.loader.js",
    dataUrl: "Build/Builds.data.br",
    frameworkUrl: "Build/Builds.framework.js.br",
    codeUrl: "Build/Builds.wasm.br",
  });

  useEffect(() => {
    console.log("Unity 로딩 상태:", {
      isLoaded,
      loadingProgression: Math.round(loadingProgression * 100) + "%"
    });
  }, [isLoaded, loadingProgression]);

  useEffect(() => {
    if (isLoaded) {
      console.log("Unity 로드 완료, 데이터 전송:", { token, roomCode });
      try {
        sendMessage("GameManager", "SetRoomCode", roomCode);
        sendMessage("Networking", "SetAccessToken", token);
        console.log("데이터 전송 성공");
      } catch (error) {
        console.error("Unity 메시지 전송 실패:", error);
      }
    }
  }, [isLoaded, token, roomCode, sendMessage]);

  return (
    <>
      <Unity
        className={"w-full h-full" + (!isLoaded ? " hidden" : "")}
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
      />
      <div className={"w-full h-full flex flex-col justify-center items-center bg-gray-100" + (isLoaded ? " hidden" : "")}>
        <div className="text-2xl font-bold mb-4">게임 로딩 중...</div>
        <div className="text-xl">{Math.round(loadingProgression * 100)}%</div>
      </div>
    </>
  );
};
