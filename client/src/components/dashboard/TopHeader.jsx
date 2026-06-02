import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
const TopHeader = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Hello, {user.fullName} 👋
        </h1>

        <p className="text-gray-500 mt-2">Welcome back to your dashboard</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
          <FaBell />
        </button>

        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="profile"
          className="w-14 h-14 rounded-2xl object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default TopHeader;
