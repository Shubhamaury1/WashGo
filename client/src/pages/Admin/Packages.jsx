import { useEffect, useState } from "react";

import vehicleApi from "../../api/vehicleApi";
import packageApi from "../../api/packageApi";

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
    const { data } = await vehicleApi.getVehicles();

    setVehicles(data);
  };

  const loadPackages = async () => {
    const { data } = await packageApi.getPackages();

    setPackages(data);
  };

  const handleSubmit = async () => {
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

    setForm({
      vehicleId: "",
      packageName: "",
      description: "",
      price: "",
    });
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg._id);

    setForm({
      vehicleId: pkg.vehicleId._id,
      packageName: pkg.packageName,
      description: pkg.description,
      price: pkg.price,
    });
  };

  const toggleStatus = async (id) => {
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
  };

  return (
    <div className="p-6 space-y-8">
      {/* Form */}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Package" : "Add Package"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={form.vehicleId}
            onChange={(e) =>
              setForm({
                ...form,
                vehicleId: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          >
            <option value="">Select Vehicle</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.name}
              </option>
            ))}
          </select>

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
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />

          <textarea
            rows="4"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-3 rounded-lg"
          >
            {editingId ? "Update Package" : "Add Package"}
          </button>
        </div>
      </div>

      {/* List */}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Package List</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Vehicle</th>

                <th className="p-4 text-left">Package</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id} className="border-b">
                  <td className="p-4">{pkg.vehicleId?.name}</td>

                  <td className="p-4">{pkg.packageName}</td>

                  <td className="p-4">₹{pkg.price}</td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(pkg._id)}
                      className={`px-3 py-1 rounded-full text-white ${
                        pkg.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {pkg.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-yellow-500 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packages;
