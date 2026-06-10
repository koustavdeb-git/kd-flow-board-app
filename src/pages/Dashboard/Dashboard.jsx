import { React, useState, useEffect } from 'react'
import { supabase } from '../../services/supabase';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [projectList, setProjectList] = useState([]);
  const { projectId } = useParams();

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
    <div>
      {projectList ? (
        <>
          <h1 className="text-2xl font-bold">
            {projectList.project_name}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Organize tasks, track progress, and collaborate efficiently within this project board.
            Create tasks, update their status, and keep your workflow moving.
          </p>
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">
            Project Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The project you're looking for doesn't exist or may have been removed.
          </p>

          <p className="mt-1 text-gray-500">
            Go back to the Projects page and select an existing project, or create a new one.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard
