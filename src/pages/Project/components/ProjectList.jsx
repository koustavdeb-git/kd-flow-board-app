import { FolderOpen, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "../../../components/Modals/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ onSelect, onDelete, projectList, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const navigate = useNavigate();

    const handleDeleteClick = (projectId) => {
        setSelectedProjectId(projectId);
        setIsModalOpen(true);
    }


    return (
        <>
            <div className="list-view grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {projectList.map((project) => (
                    <div key={project.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                {project.project_name}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Created on{" "}
                                {new Date(project.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                <span className="font-medium">Description:</span> {project.project_desc}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/projects/${project.id}`)}
                                className="cursor-pointer flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                                <FolderOpen size={16} />
                                Open
                            </button>

                            <button
                                onClick={() => handleDeleteClick(project.id)}
                                className="cursor-pointer flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                loading={loading}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    onDelete(selectedProjectId);
                    setIsModalOpen(false);
                }}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </>
    )





};

export default ProjectCard;