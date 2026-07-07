import Navbar from "@/components/navbar/Navbar";
import { useAppSelector } from "@/store/hooks";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <div className="mt-8 rounded-xl border bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">
              Welcome {user?.name}
            </h2>

            <p className="mt-2 text-slate-600">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}