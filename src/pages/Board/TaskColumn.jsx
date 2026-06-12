import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, isEditModalOpen, setIsEditModalOpen, setSelectedTask, onDeleteTask }) => {
    const columnStyles = {
        "To Do": {
            header: "bg-sky-500",
            badge: "bg-sky-100 text-sky-700",
        },
        "In Progress": {
            header: "bg-amber-500",
            badge: "bg-amber-100 text-amber-700",
        },
        "Done": {
            header: "bg-emerald-500",
            badge: "bg-emerald-100 text-emerald-700",
        },
    };
    const style = columnStyles[title];

    return (

        <div className="flex h-full min-h-[500px] flex-col rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className={`h-2 ${style.header}`} />
            <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-800">
                            {title}
                        </h2>

                        <p className="text-xs text-slate-500">
                            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <span
                        className={`${style.badge} rounded-full px-3 py-1 text-xs font-semibold`}
                    >
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isEditModalOpen={isEditModalOpen}
                            setIsEditModalOpen={setIsEditModalOpen}
                            setSelectedTask={setSelectedTask}
                            onDeleteTask={onDeleteTask}
                        />
                    ))
                ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                        <p className="text-sm text-gray-500">
                            No tasks available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskColumn;