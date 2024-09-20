import Link from "next/link";

type ModalType = {
  searchParams: Record<string, string> | null | undefined;
  name: string;
  children?: React.ReactNode;
};

export default async function Modal({
  children,
  name,
  searchParams,
}: ModalType) {
  const showModal = searchParams?.[name];
  console.log(showModal)
  return (
    <>
      {showModal && (
        <div className="absolute top-0 z-10 h-screen w-full">
          <Link
            replace
            href="/"
            className="absolute h-screen w-full bg-black opacity-50"
          ></Link>
          <div className="absolute left-1/2 top-1/2 p-6 w-1/6 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
