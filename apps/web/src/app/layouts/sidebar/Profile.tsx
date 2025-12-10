import { UserRound } from "lucide-react";
import { useCurrentUser } from "../../../features/auth/auth.hooks";

const Profile = () => {
  const { data: user } = useCurrentUser();
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl
    hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] cursor-pointer"
    >
      <div className="bg-gray-400 text-white rounded-full p-2">
        <UserRound size={24} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-semibold text-md text-[var(--color-text)]">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {user?.email}
        </span>
      </div>
    </div>
  );
};

export default Profile;
