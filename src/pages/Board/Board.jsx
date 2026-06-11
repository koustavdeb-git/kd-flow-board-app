import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TaskColumn from './TaskColumn';
import CreateTaskModal from './CreateTaskModal';

const Board = () => {
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await supabase
        .from("project-list")
        .select("*")
        .eq("id", projectId)
        .single();

      if (response.error || !response.data) {
        navigate("/projects", { replace: true });
        console.error("Error fetching projects:", response.error);
      } else {
        setProjectList(response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      navigate("/projects", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", projectId);
      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  useEffect(() => {
    getProjects();
    fetchTasks();
  }, [projectId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-40 rounded bg-gray-200"></div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 h-8 w-64 rounded bg-gray-200"></div>
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-96 rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        {/* content */}

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <button
            onClick={() => navigate("/projects")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {projectList.project_name}
              </h1>

              <p className="mt-2 text-gray-600">
                {projectList.project_desc}
              </p>
            </div>

            <button 
              className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-green-700 hover:shadow-md cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              + Create Task
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">To Do</p>
            <p className="text-2xl font-bold">
              {tasks.filter((task) => task.status === "todo").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-2xl font-bold">
              {tasks.filter((task) => task.status === "in-progress").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Done</p>
            <p className="text-2xl font-bold">
              {tasks.filter((task) => task.status === "done").length}
            </p>
          </div>
        </div>

        {/* Tasks Section */}
        {
          tasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <TaskColumn title="To Do" tasks={tasks.filter((task) => task.status === "todo")} />
              <TaskColumn title="In Progress" tasks={tasks.filter((task) => task.status === "in-progress")} />
              <TaskColumn title="Done" tasks={tasks.filter((task) => task.status === "done")} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No Tasks Yet</h3>

              <p className="mt-2 text-gray-500">
                This project does not have any tasks yet. Create your first task
                to start tracking work and project progress.
              </p>
            </div>
          )
        }
      </div>
      <CreateTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} projectId={projectId} onTaskCreated={fetchTasks} />
    </>
  );
}

export default Board