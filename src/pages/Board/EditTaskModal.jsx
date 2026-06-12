import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const EditTaskModal = ({
    isOpen,
    onClose,
    task,
    onTaskUpdated,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || "",
                description: task.task_desc || "",
                priority: task.priority || "",
                status: task.status || "",
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const { data, error } = await supabase
                .from("tasks")
                .update({
                    title: formData.title,
                    task_desc: formData.description,
                    priority: formData.priority,
                    status: formData.status,
                })
                .eq("id", task.id)
                .select("*");
    
            if (error) {
                console.error("Error updating task:", error);
                return;
            }
    
            await onTaskUpdated();
    
            onClose();
            
        } finally {
            setLoading(false)
        }
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Edit Task
                    </h2>

                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="edit-task-title"
                            className="mb-1 block text-sm font-medium"
                        >
                            Task Title
                            <span className="text-red-500"> *</span>
                        </label>

                        <input
                            id="edit-task-title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="edit-task-status"
                            className="mb-1 block text-sm font-medium"
                        >
                            Priority
                            <span className="text-red-500"> *</span>
                        </label>

                        <select
                            id="edit-task-status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="edit-task-priority"
                            className="mb-1 block text-sm font-medium"
                        >
                            Priority
                            <span className="text-red-500"> *</span>
                        </label>

                        <select
                            id="edit-task-priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3"
                        >
                            <option value="low">↓ Low</option>
                            <option value="medium">→ Medium</option>
                            <option value="high">↑ High</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="edit-task-description"
                            className="mb-1 block text-sm font-medium"
                        >
                            Description
                        </label>

                        <textarea
                            id="edit-task-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={onClose}
                            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button type="submit" disabled={loading} className=" rounded-lg bg-green-600 px-4 py-2 text-white   transition-all duration-200   hover:bg-green-700   disabled:cursor-not-allowed   disabled:opacity-50   disabled:hover:bg-green-600 cursor-pointer"
                        >
                            {loading ? "Updating..." : "Update Task"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditTaskModal;