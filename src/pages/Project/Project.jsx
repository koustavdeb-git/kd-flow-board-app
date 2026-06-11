import React from 'react'
import ProjectCard from './components/ProjectList'
import ProjectHeader from './components/ProjectHeader'
import CreateProjectModal from './components/CreateProjectModal'
import { supabase } from '../../services/supabase'
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Project = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [projectList, setProjectList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProject = async (projectData) => {
    setIsCreating(true);
    const { error } = await supabase
      .from("project-list")
      .insert([{
        project_name: projectData.name,
        project_desc: projectData.description,
        created_by: user.id,
      }])

    if (error) {
      console.error("Error creating project:", error);
    }
    setIsCreating(false);
    showProjectList();

    setIsModalOpen(false);
  }

  const showProjectList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("project-list")
      .select("*")
      .eq("created_by", user.id)

    if (error) {
      console.error("Error fetching project list:", error);
      return;
    }

    setProjectList(data);
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      showProjectList();
    }
  }, [user]);

  const handleDeleteProject = async (projectId) => {
    setIsCreating(true);
    const { error } = await supabase
      .from("project-list")
      .delete()
      .eq("id", projectId)

    if (error) {
      console.error("Error deleting project:", error);
    }
    setIsCreating(false);

    showProjectList();
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-64 rounded bg-gray-200"></div>
        <div className="h-4 w-96 rounded bg-gray-200"></div>
        <div className="h-32 rounded bg-gray-200"></div>
      </div>
    );
  }

  return (
    <>
      <ProjectHeader openCreateModal={() => setIsModalOpen(true)} />
      <ProjectCard loading={isCreating} projectList={projectList} onDelete={handleDeleteProject} />
      <CreateProjectModal loading={isCreating} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProject} />
    </>
  )
}


export default Project
