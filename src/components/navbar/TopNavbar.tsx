import { useAppSelector } from "@/store/hooks";

export default function TopNavbar() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  return (
    <header className="flex h-16 items-center border-b bg-white px-6">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome, {user?.name ?? "User"} 
        </h2>

        <p className="text-sm text-gray-500">
          Manage your shortened URLs.
        </p>
      </div>
    </header>
  );
}