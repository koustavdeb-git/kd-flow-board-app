import { Pencil, Trash2 } from "lucide-react";

const TaskCard = ({ task, isEditModalOpen, setIsEditModalOpen, setSelectedTask, onDeleteTask }) => {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 cursor-pointer">
            <div className="flex items-start justify-between">
                <h3 className="font-medium">{task.title}</h3>

                <div className="flex gap-2">
                    <button className="cursor-pointer text-blue-600" onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedTask(task);
                    }}>
                        <Pencil size={16} />
                    </button>

                    <button className="cursor-pointer text-red-600" onClick={()=>{onDeleteTask(task)}}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                {task.description}
            </p>
        </div>
    );
};

export default TaskCard;