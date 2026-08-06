import { useEffect, useState } from "react";
import authApi from "../../api/authApi";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await authApi.getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="px-10 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-1 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Users</h1>
      </div>

      <div className="p-3 sm:p-4 ">
        {/* Mobile Card View */}
        <div className="sm:hidden space-y-2">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading Users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No Users Found</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {getInitials(user.fullName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium">Name</p>
                      <p className="font-semibold text-sm truncate text-slate-800">{user.fullName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                    user.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {user.status ? "Active" : "Blocked"}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Joined</p>
                    <p className="font-semibold text-sm">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone</p>
                    <p className="font-semibold text-sm text-gray-600">{user.mobile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Role</p>
                    <p className="font-semibold text-sm text-gray-600">{user.role}</p>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm transition">
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block bg-white rounded-3xl shadow-md p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-[#4a5d7a]">
                  <th className="text-left py-5 font-semibold px-4">Name</th>
                  <th className="text-left py-5 font-semibold px-4">Email</th>
                  <th className="text-left py-5 font-semibold px-4">Phone</th>
                  <th className="text-left py-5 font-semibold px-4">Role</th>
                  <th className="text-left py-5 font-semibold px-4">Status</th>
                  <th className="text-left py-5 font-semibold px-4">Joined</th>
                  <th className="text-left py-5 font-semibold px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      Loading Users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            {getInitials(user.fullName)}
                          </div>

                          <span className="font-semibold text-[#0d2240]">
                            {user.fullName}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 text-gray-600">{user.email}</td>

                      {/* Mobile */}
                      <td className="py-4 px-4 text-gray-600">{user.mobile}</td>

                      {/* Role */}
                      <td className="py-4 px-4 text-gray-600">{user.role}</td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            user.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status ? "Active" : "Blocked"}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4">
                        <button className="bg-blue-100 text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-blue-200 transition text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
