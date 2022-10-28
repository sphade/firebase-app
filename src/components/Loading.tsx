import { LoadingLogoIcon } from "../assets/images/icons";

const Loading = () => {
  return (
    <div className="w-full h-screen center-element relative ">

<LoadingLogoIcon className="z-50 scale-15"/>
      <div className="w-14 h-14 bg-primary rounded-full absolute animate-ping opacity-75 "></div>
    </div>
  );
};

export default Loading;
