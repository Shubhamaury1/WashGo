
import { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";
import { toast } from "react-toastify";

const Packages = () => {
  const [vehicles, setVehicles] = useState([]);
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    vehicleId: "",
    packageName: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    loadVehicles();
    loadPackages();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data } = await vehicleApi.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPackages = async () => {
    try {
      const { data } = await packageApi.getPackages();
      setPackages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (
      !form.vehicleId ||
      !form.packageName ||
      !form.description ||
      !form.price
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        const { data } = await packageApi.updatePackage(editingId, form);

        setPackages((prev) =>
          prev.map((pkg) =>
            pkg._id === editingId
              ? {
                  ...pkg,
                  ...data,
                }
              : pkg,
          ),
        );

        setEditingId(null);
      } else {
        const { data } = await packageApi.createPackage(form);

        const newPackage = {
          ...data,
          vehicleId: vehicles.find((v) => v._id === form.vehicleId),
        };

        setPackages((prev) => [newPackage, ...prev]);
      }

     
      handleCancelForm();
    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = (pkg) => {
    setEditingId(pkg._id);

    setForm({
      vehicleId: pkg.vehicleId?._id || pkg.vehicleId || "",
      packageName: pkg.packageName || "",
      description: pkg.description || "",
      price: pkg.price || "",
    });

    // Scroll to appropriate form based on screen size
    setTimeout(() => {
      let element;
      if (window.innerWidth < 640) {
        // Mobile
        element = document.getElementById("package-form-mobile");
      } else {
        // Desktop/Tablet
        element = document.getElementById("package-form-desktop");
      }
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }, 150);
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await packageApi.toggleStatus(id);

      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === id
            ? {
                ...pkg,
                isActive: data.isActive,
              }
            : pkg,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelForm = () => {
  setEditingId(null);

  setForm({
    vehicleId: "",
    packageName: "",
    description: "",
    price: "",
  });
  };
  

  const handlePriceChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      setForm({
        ...form,
        price: value,
      });
    }
  };

  return (
    <>
      <div className=" sm:hidden px-10 sm:px-8 lg:px-2 py-4 sm:py-6 lg:py-2 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Package Info</h1>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {/* Add Package Card - Mobile Only */}
        <div id="package-form-mobile" className="sm:hidden bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? "Edit Package" : "Add Package"}
          </h2>

          <div className="space-y-3">
            {/* Vehicle */}
            <select
              value={form.vehicleId}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleId: e.target.value,
                })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 w-full text-sm"
            >
              <option value="">Select Vehicle</option>

              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                </option>
              ))}
            </select>

            {/* Package Name */}
            <input
              type="text"
              placeholder="Package Name"
              value={form.packageName}
              onChange={(e) =>
                setForm({
                  ...form,
                  packageName: e.target.value,
                })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 w-full text-sm"
            />

            {/* Price */}
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Math.max(0, e.target.value),
                })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 w-full text-sm"
            />

            {/* Description */}
            <textarea
              rows="2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 rounded-xl px-4 py-3 w-full text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold text-sm"
              >
                {editingId ? "Update" : "Add Package"}
              </button>

              {editingId && (
                <button
                  onClick={handleCancelForm}
                  type="button"
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Package List - Mobile Card View */}
        <div className="sm:hidden bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Package List</h2>

          {packages.length > 0 ? (
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="border border-gray-200 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Package</p>
                      <p className="text-md font-semibold  text-gray-700">{pkg.packageName}</p>
                    </div>
                    <button
                      onClick={() => toggleStatus(pkg._id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        pkg.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pkg.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Vehicle</p>
                      <p className="text-base font-semibold text-gray-700">{pkg.vehicleId?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">Price</p>
                      <p className="text-lg font-bold text-green-600">₹{pkg.price}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-medium">Description</p>
                    <p className="text-gray-700">{pkg.description}</p>
                  </div>

                  <div className="border-t pt-3">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5 rounded-lg font-bold transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">
              No packages found
            </div>
          )}
        </div>

        {/* Desktop View - Hidden on Mobile */}
        <div className="hidden sm:block space-y-6">
          {/* Add Package Card */}
          <div id="package-form-desktop" className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {editingId ? "Edit Package" : "Add Package"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Vehicle */}
              <select
                value={form.vehicleId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicleId: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3 w-full"
              >
                <option value="">Select Vehicle</option>

                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>

              {/* Package Name */}
              <input
                type="text"
                placeholder="Package Name"
                value={form.packageName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    packageName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3 w-full"
              />

              {/* Price */}
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Math.max(0, e.target.value),
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3 w-full"
              />

              {/* Description */}
              <textarea
                rows="1"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3 w-full"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                {editingId ? "Update Package" : "Add Package"}
              </button>

              {editingId && (
                <button
                  onClick={handleCancelForm}
                  type="button"
                  className="px-20 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Package List */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Package List</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="text-left py-4">Vehicle</th>
                    <th className="text-left py-4">Package</th>
                    <th className="text-left py-4">Description</th>
                    <th className="text-left py-4">Price</th>
                    <th className="text-left py-4">Status</th>
                    <th className="text-left py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {packages.map((pkg) => (
                    <tr
                      key={pkg._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4">{pkg.vehicleId?.name}</td>

                      <td className="py-4">{pkg.packageName}</td>

                      <td className="py-4">{pkg.description}</td>

                      <td className="py-4 font-semibold">₹{pkg.price}</td>

                      <td className="py-4">
                        <button
                          onClick={() => toggleStatus(pkg._id)}
                          className={`px-4 py-1 rounded-full text-sm font-medium ${
                            pkg.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {pkg.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>

                      <td className="py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}

                  {packages.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No packages found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;