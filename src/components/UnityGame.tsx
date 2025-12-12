import { Unity , useUnityContext } from "react-unity-webgl";

const UnityGame = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Builds.loader.js",
    dataUrl: "Build/Builds.data.br",
    frameworkUrl: "Build/Builds.framework.js.br",
    codeUrl: "Build/Builds.wasm.br",
  });
  return (
      <>
        <Unity className='w-full h-full'
            unityProvider={unityProvider}
            devicePixelRatio={devicePixelRatio}
        />
      </>
  );
};

export default UnityGame;
