// import { useSelector } from "react-redux";

// const TopHeader = () => {
//   const user = useSelector((state) => state.auth.user);

//   const IMG_URL = import.meta.env.VITE_API_IMG_URL;

//   const profileImage = user?.photo
//     ? `${IMG_URL}${user.photo}`
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         user?.fullName || "User",
//       )}`;

//   return (
//     <div className="flex items-center justify-between mb-6">
//       {/* Greeting */}
//       <div className="hidden md:block">
//         <h1 className="text-4xl font-bold text-[#0d2240]">
//           Hello, {user?.fullName} 👋
//         </h1>

//         <p className="text-sm sm:text-base text-gray-500 mt-2">
//           Welcome back to your dashboard
//         </p>
//       </div>

//       {/* Profile Image */}
//       <div className="flex items-center gap-3 md:gap-5 ml-auto">
//         <img
//           src={profileImage}
//           alt={user?.fullName || "Profile"}
//           onError={(e) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//               user?.fullName || "User",
//             )}`;
//           }}
//           className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default TopHeader;

import { useSelector } from "react-redux";

const TopHeader = () => {
  const user = useSelector((state) => state.auth.user);

  const IMG_URL = import.meta.env.VITE_API_IMG_URL;

  const profileImage = user?.photo
    ? `${IMG_URL}${user.photo}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.fullName || "User",
      )}`;

  return (
    <div className="flex items-start justify-end md:justify-between mb-4 md:mb-0">
      {/* Desktop Greeting */}
      <div className="hidden md:block">
        <h1 className="text-4xl font-bold text-[#0d2240]">
          Hello, {user?.fullName} 👋
        </h1>

        <p className="text-base text-gray-500 mt-2">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Profile */}
      <img
        src={profileImage}
        alt={user?.fullName || "Profile"}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.fullName || "User",
          )}`;
        }}
        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover shadow-md"
      />
    </div>
  );
};

export default TopHeader;