import { useState } from "react";

const CreateProjectModal = ({
    isOpen,
    onClose,
    onCreate,
    loading,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreate(formData);

        setFormData({
            name: "",
            description: "",
        });

        onClose();
    };

    if (!isOpen) {
        return null;
    } else {
        return (isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Create Project
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a new project to organize your tasks.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Project Name <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter project name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter project description"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-70 cursor-pointer"
                            >
                                {loading ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ));
    }

};

export default CreateProjectModal;