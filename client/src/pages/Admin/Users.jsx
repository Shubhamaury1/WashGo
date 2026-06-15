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
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-[40px] font-bold text-[#0d2240] mb-8">Users</h1>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-[#4a5d7a]">
                <th className="text-left py-5 font-semibold">Name</th>

                <th className="text-left py-5 font-semibold">Email</th>

                <th className="text-left py-5 font-semibold">Phone</th>

                <th className="text-left py-5 font-semibold">Status</th>

                <th className="text-left py-5 font-semibold">Joined</th>

                <th className="text-left py-5 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    Loading Users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
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
                    <td className="py-4">
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
                    <td className="py-4 text-gray-600">{user.email}</td>

                    {/* Mobile */}
                    <td className="py-4 text-gray-600">{user.mobile}</td>

                    {/* Status */}
                    <td className="py-4">
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
                    <td className="py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-4">
                      <button className="bg-blue-100 text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-blue-200 transition">
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
  );
}

export default Users;
