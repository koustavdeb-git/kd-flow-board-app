import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [projectList, setProjectList] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const response = await supabase
        .from("project-list")
        .select("*")
        .eq("id", projectId)
        .single();

      if (response.error) {
        console.error("Error fetching projects:", response.error);
      } else {
        setProjectList(response.data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => navigate("/projects")}
          className="mb-4 flex items-center text-sm text-gray-600 hover:text-blue-900 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Project Board
          </h2>

          <p className="mt-2 text-gray-600">
            You are currently managing the{" "}
            <span className="font-medium text-gray-800">
              "{projectList.project_name}"
            </span>{" "}
            project. Create tasks, assign priorities, track progress, and organize
            work efficiently using FlowBoard.
          </p>
        </div>
      </div>

      {/* Create Task Button */}
      <div className="mb-6 flex justify-end">
        <button className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 cursor-pointer">
          + Create Task
        </button>
      </div>

      {/* Tasks Section */}
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-medium">No Tasks Yet</h3>

        <p className="mt-2 text-gray-500">
          This project does not have any tasks yet. Create your first task
          to start tracking work and project progress.
        </p>
      </div>
    </>
  );
}

export default Board