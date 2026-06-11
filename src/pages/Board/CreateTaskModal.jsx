import React from 'react'
import { useState, useEffect } from 'react';
import Board from './Board';
import { ArrowBigUpDash, ArrowBigDownDash, ArrowBigRightDash } from 'lucide-react';
import { supabase } from '../../services/supabase';

const CreateTaskModal = ({ isModalOpen, setIsModalOpen, projectId, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error} = await supabase
      .from('tasks')
      .insert([{
        project_id: projectId,
        title: formData.title,
        task_desc: formData.description,
        priority: formData.priority,
        status: "todo", // Default status for new tasks
      }]);

      if (error) {
        console.error("Error creating task:", error);
      } else {
        setFormData({
          title: "",
          description: "",
          priority: "",
        });
      }
      setIsModalOpen(false);
      onTaskCreated();
    }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Create Task
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-1 block text-sm font-medium">
              Task Title <span className="text-red-500">*</span>
            </label>

            <input
              id="task-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="task-priority" className="mb-1 block text-sm font-medium">
              Priority <span className="text-red-500">*</span>
            </label>

            <select
              id="task-priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              required
            >
              <option value="" disabled>
                Select Priority
              </option>

              <option value="low"> Low</option>
              <option value="medium"> Medium</option>
              <option value="high"> High</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-description" className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              id="task-description"
              rows={4}
              value={formData.description}
              placeholder="Enter task description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer"
            >
              Create Task
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateTaskModal