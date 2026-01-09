interface Prop {
  text: string;
}

export const AuthButton = ({ text }: Prop) => {
  return (
    <div className="w-full py-[10px] flex justify-center items-center bg-main-1 rounded text-white text-2xl font-pretendard font-extrabold cursor-pointer">
      {text}
    </div>
  );
};
