import SimpleForm from "./SimpleForm";


export default function RawModal({children, handleIsOpen} : {children: React.ReactNode, handleIsOpen: () => void}) {
  return (
    <div className="absolute top-0 z-10 h-screen w-full">
      <button
        onClick={() => handleIsOpen()}
        className="absolute h-screen w-full bg-black opacity-50"
      ></button>
      <div className="absolute left-1/2 top-1/2 w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-secondary p-6">
            {children}
      </div>
    </div>
  );
}
