type Prop = {
  children: React.ReactNode;
  title: string;
  width: string;
};

const Frame = ({ children, title, width }: Prop) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div style={{ maxWidth: width }} className="w-full">
        <h1 className="mb-3 text-center text-mainColor text-2xl font-bold shadow-sm">
          アカウント管理システム
        </h1>
        <div className="p-5 border-mainColor border-solid border-2 rounded-md">
          <h3 className="text-lg mb-3 font-bold">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Frame;
