import { useEffect, useState } from "react";
import vehicleApi from "../../api/vehicleApi";

const Vehicles = () => {
  const BaseURL = import.meta.env.VITE_API_IMG_URL;
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    title: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data } = await vehicleApi.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("title", form.title);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        const { data } = await vehicleApi.updateVehicle(editingId, formData);

        setVehicles((prev) =>
          prev.map((vehicle) => (vehicle._id === editingId ? data : vehicle)),
        );

        setEditingId(null);
      } else {
        const { data } = await vehicleApi.createVehicle(formData);

        setVehicles((prev) => [data, ...prev]);
      }

      setForm({
        name: "",
        description: "",
        title: "",
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
      title: vehicle.title,
    });

    setPreview(`${BaseURL}${vehicle.image}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?",
    );

    if (!confirmDelete) return;

    try {
      await vehicleApi.deleteVehicle(id);

      setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      name: "",
      description: "",
      title: "",
    });

    setImage(null);
    setPreview("");
  };


  const toggleStatus = async (id) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                {editingId ? "Update Vehicle" : "Add Vehicle"}
              </h2>

              <p className="text-slate-500 mt-1">
                Manage all vehicle categories
              </p>
            </div>

            {editingId && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                Editing Mode
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
            className="w-full h-14 px-5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />
          
          <input
            type="text"
            placeholder="Vehicle Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full h-14 px-5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />

          <textarea
            rows="1"
            placeholder="Vehicle Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full p-5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />

          {/* Upload Area */}

          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-blue-300 rounded-3xl p-6 hover:bg-blue-50 transition text-center">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl"
                  />

                  <p className="mt-4 text-blue-600 font-medium">
                    Click to change image
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">📸</div>

                  <h3 className="text-xl font-semibold text-slate-700">
                    Upload Vehicle Image
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Drag & Drop or Click to Upload
                  </p>
                </>
              )}
            </div>

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {/* <button
            type="submit"
            className={`px-8 h-14 rounded-2xl text-white font-semibold transition ${
              editingId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editingId ? "Update Vehicle" : "Add Vehicle"}
          </button> */}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`px-8 h-14 rounded-2xl text-white font-semibold transition ${
                editingId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editingId ? "Update Vehicle" : "Add Vehicle"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-8 h-14 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Vehicle List */}

      {vehicles.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={`${BaseURL}${vehicle.image}`}
                  alt={vehicle.name}
                  className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold capitalize text-slate-800">
                      {vehicle.name}
                    </h3>

                    <p className="text-slate-500 mt-2">{vehicle.description}</p>
                  </div>

                  <button
                    onClick={() => toggleStatus(vehicle._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vehicle.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {vehicle.isActive ? "Active" : "Inactive"}
                  </button>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
          <div className="text-7xl mb-4">🚗</div>

          <h3 className="text-2xl font-bold text-slate-800">
            No Vehicles Found
          </h3>

          <p className="text-slate-500 mt-2">
            Add your first vehicle category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Vehicles;