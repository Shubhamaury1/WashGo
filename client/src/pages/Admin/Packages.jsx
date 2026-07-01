
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
    <div className="space-y-6">
      {/* Add Package Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
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

        {/* <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          {editingId ? "Update Package" : "Add Package"}
        </button> */}
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
  );
};

export default Packages;