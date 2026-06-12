import { supabase } from "../../services/supabase";
import { useState } from 'react';

const DeleteTaskModal = ({
    isOpen,
    onClose,
    task,
    onTaskDeleted,
}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true)
            const { error } = await supabase
                .from("tasks")
                .delete()
                .eq("id", task.id);

            if (error) {
                console.error("Delete Error:", error);
                return;
            }

            await onTaskDeleted();
            onClose();
        } finally {
            setLoading(false)
        }
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-semibold text-gray-900">
                    Delete Task
                </h2>

                <p className="mt-3 text-gray-600">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        "{task.title}"
                    </span>
                    ?
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className={`
                                rounded-lg px-4 py-2 text-white transition-all duration-200
                                ${loading
                                ? "cursor-not-allowed bg-red-400 opacity-70"
                                : "cursor-pointer bg-red-600 hover:bg-red-700"}
                            `}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Task"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;