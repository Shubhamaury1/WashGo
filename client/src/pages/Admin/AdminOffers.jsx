import { useEffect, useMemo, useState } from "react";
import { FaUsers, FaGift, FaTicketAlt, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import adminNotificationApi from "../../api/adminNotificationApi";
import authApi from "../../api/authApi";

function AdminOffers() {
  const admin = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");

 const [form, setForm] = useState({
   title: "",
   message: "",
   couponCode: "",
   redeemCode: "",
   discountType: "percentage",
   discountValue: "",
   expiryDate: "",
   targetType: "all",
   selectedUsers: [],
 });

  useEffect(() => {
    loadUsers();
    loadOffers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await authApi.getUsers();

      const list = Array.isArray(res.data) ? res.data : res.data.users || [];

      setUsers(list);
    } catch (err) {
      toast.error("Unable to load users");
    }
  };

  const loadOffers = async () => {
    try {
      const res = await adminNotificationApi.getCoupons();
      setOffers(res.data.coupons || []);
    } catch (err) {
      console.log(err);
    }
  };

  const stats = useMemo(() => {
    return {
      totalOffers: offers.length,
      activeOffers: offers.filter((x) => x.isActive).length,
      totalUsers: users.length,
    };
  }, [offers, users]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSelection = (id) => {
    setForm((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(id)
        ? prev.selectedUsers.filter((x) => x !== id)
        : [...prev.selectedUsers, id],
    }));
  };

  const sendOffer = async () => {
    if (!form.title) return toast.error("Enter title");
    if (!form.message) return toast.error("Enter message");
    if (!form.couponCode) return toast.error("Enter coupon code");
    if (!form.discountValue) return toast.error("Enter discount Value");

    try {
      setLoading(true);

      await adminNotificationApi.sendNotification({
        ...form,
        createdBy: admin._id,
      });

      toast.success("Offer sent successfully");

      setForm({
        title: "",
        message: "",
        couponCode: "",
        redeemCode: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        targetType: "all",
        selectedUsers: [],
      });

      loadOffers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Coupon & Offers</h1>

          <p className="text-gray-500 mt-2">
            Create coupons and send real-time notifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Total Coupons</p>
                <h2 className="text-3xl font-bold mt-2">{stats.totalOffers}</h2>
              </div>

              <FaGift className="text-4xl text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Active Coupons</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.activeOffers}
                </h2>
              </div>

              <FaTicketAlt className="text-4xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Users</p>
                <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
              </div>

              <FaUsers className="text-4xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-5">
            <input
              className="border rounded-xl p-4"
              placeholder="Offer Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <input
              className="border rounded-xl p-4"
              placeholder="Coupon Code"
              name="couponCode"
              value={form.couponCode}
              onChange={handleChange}
            />

            <input
              className="border rounded-xl p-4"
              placeholder="Redeem Code"
              name="redeemCode"
              value={form.redeemCode}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-5">
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="border rounded-lg p-3"
              >
                <option value="percentage">Percentage (%)</option>

                <option value="fixed">Fixed Amount (₹)</option>
              </select>

              <input
                type="number"
                name="discountValue"
                value={form.discountValue}
                onChange={handleChange}
                placeholder={
                  form.discountType === "percentage" ? "Discount %" : "Amount ₹"
                }
                className="border rounded-lg p-3"
              />
            </div>

            <input
              className="border rounded-xl p-4"
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />

            <select
              className="border rounded-xl p-4"
              value={form.targetType}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  targetType: e.target.value,
                  selectedUsers:
                    e.target.value === "all" ? [] : prev.selectedUsers,
                }))
              }
            >
              <option value="all">All Users</option>
              <option value="selected">Selected Users</option>
            </select>
          </div>

          <textarea
            rows={5}
            className="border rounded-xl p-4 mt-5 w-full"
            placeholder="Offer Message..."
            name="message"
            value={form.message}
            onChange={handleChange}
          />

          {form.targetType === "selected" && (
            <div className="mt-6">
              <input
                placeholder="Search User..."
                className="border rounded-xl p-3 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="grid md:grid-cols-2 gap-3 max-h-72 overflow-auto">
                {users
                  .filter((u) =>
                    u.fullName.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((user) => (
                    <label
                      key={user._id}
                      className="flex justify-between items-center border rounded-xl p-4 hover:bg-indigo-50 cursor-pointer"
                    >
                      <div>
                        <h4 className="font-semibold">{user.fullName}</h4>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <input
                        type="checkbox"
                        checked={form.selectedUsers.includes(user._id)}
                        onChange={() => handleUserSelection(user._id)}
                      />
                    </label>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={sendOffer}
            disabled={loading}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Offer"}
          </button>
        </div>

        {/* Coupon List Part 2 goes here */}
        <div className="mt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              All Coupons ({offers.length})
            </h2>

            <input
              type="text"
              placeholder="Search Coupon..."
              className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-80 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {offers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-16 text-center">
              <FaTicketAlt className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-bold text-gray-600">
                No Coupons Found
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first coupon using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {offers
                .filter(
                  (item) =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.couponCode
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <FaTicketAlt className="text-indigo-600 text-xl" />
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {item.title}
                          </h3>

                          <p className="text-sm text-gray-500 line-clamp-1">
                            {item.message}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <p className="text-gray-400">Coupon</p>

                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {item.couponCode}
                          </span>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.couponCode);
                              toast.success("Coupon copied");
                            }}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400">Redeem</p>

                        <p className="font-semibold text-gray-800">
                          {item.redeemCode || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Discount</p>

                        <p className="font-bold text-green-600">
                          {item.discountType === "percentage"
                            ? `${item.discountValue}%`
                            : `₹${item.discountValue}`}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Expiry</p>

                        <p className="text-gray-700">
                          {item.expiryDate
                            ? new Date(item.expiryDate).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Target</p>

                        <p className="text-gray-700">
                          {item.targetType === "all"
                            ? "All Users"
                            : `${item.selectedUsers.length} Users`}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">Created</p>

                        <p className="text-gray-700">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t flex">
                      <button
                        onClick={async () => {
                          try {
                            await adminNotificationApi.toggleCoupon(item._id);
                            toast.success("Status Updated");
                            loadOffers();
                          } catch {
                            toast.error("Unable to update");
                          }
                        }}
                        className={`flex-1 py-3 text-sm font-semibold transition ${
                          item.isActive
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {item.isActive ? "Deactivate" : "Activate"}
                      </button>

                      <div className="w-px bg-gray-200"></div>

                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this coupon?")) return;

                          try {
                            await adminNotificationApi.deleteCoupon(item._id);
                            toast.success("Deleted");
                            loadOffers();
                          } catch {
                            toast.error("Delete failed");
                          }
                        }}
                        className="flex-1 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Coupon List */}
      </div>
    </div>
  );
}

export default AdminOffers;
