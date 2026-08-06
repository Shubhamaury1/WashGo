import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
const TopHeader = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-0">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 break-words">
          Hello, {user.fullName} 👋
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Welcome back to your dashboard</p>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="profile"
          className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl object-cover shadow-md flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default TopHeader;
