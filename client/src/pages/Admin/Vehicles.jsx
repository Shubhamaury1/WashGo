import { useEffect, useState } from "react";

import vehicleApi from "../../api/vehicleApi";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const { data } = await vehicleApi.getVehicles();

    setVehicles(data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("description", form.description);

  if (image) {
    formData.append("image", image);
  }

  try {
    if (editingId) {
      const { data } = await vehicleApi.updateVehicle(editingId, formData);

      setVehicles((prev) => prev.map((v) => (v._id === editingId ? data : v)));

      // Reset Edit Mode
      setEditingId(null);
    } else {
      const { data } = await vehicleApi.createVehicle(formData);

      setVehicles((prev) => [data, ...prev]);
    }

    // Clear Form
    setForm({
      name: "",
      description: "",
    });

    setImage(null);
    setPreview("");
  } catch (error) {
    console.log(error);
  }
};

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);

    setForm({
      name: vehicle.name,
      description: vehicle.description,
    });

    setPreview(`http://localhost:5000${vehicle.image}`);

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleStatus = async (id) => {
    const { data } = await vehicleApi.toggleStatus(id);

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle._id === id
          ? {
              ...vehicle,
              isActive: data.isActive,
            }
          : vehicle,
      ),
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">Add Vehicle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          {/* Drag Drop */}

          <label className="border-2 border-dashed border-blue-400 rounded-2xl p-8 cursor-pointer flex flex-col items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt=""
                className="h-40 rounded-xl object-cover"
              />
            ) : (
              <div>
                <p className="text-gray-500">Drag image here</p>

                <p className="text-blue-600">Click to upload</p>
              </div>
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                setImage(file);

                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          <button
            type="submit"
            className={`px-6 py-3 rounded-lg text-white transition ${
              editingId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingId ? "Update Vehicle" : "Add Vehicle"}
          </button>
        </form>
      </div>

      {/* Vehicle List */}

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={`http://localhost:5000${vehicle.image}`}
              alt={vehicle.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl capitalize">
                    {vehicle.name}
                  </h3>

                  <p className="text-gray-500 mt-1">{vehicle.description}</p>
                </div>

                <button
                  onClick={() => toggleStatus(vehicle._id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    vehicle.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {vehicle.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                >
                  Edit
                </button>

                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
