import { FolderOpen, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onSelect, onDelete }) => {
    const projectList = [
        {
            id: "1",
            name: "KD FlowBoard",
            created_at: "2026-06-07T10:00:00Z",
        },
        {
            id: "2",
            name: "Interview Prep",
            created_at: "2026-06-06T15:00:00Z",
        },
    ];

    return (
        projectList.map((project) => (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        {project.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Created on{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <button
                        onClick={() => onSelect(project.id)}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        <FolderOpen size={16} />
                        Open
                    </button>

                    <button
                        onClick={() => onDelete(project.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        ))
    )





};

export default ProjectCard;