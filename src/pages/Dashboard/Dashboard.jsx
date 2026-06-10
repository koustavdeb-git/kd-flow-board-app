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
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>

    </>
  );
}

export default Dashboard
