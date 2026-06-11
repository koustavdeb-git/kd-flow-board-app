import React from 'react'
import { useState, useEffect } from 'react';
import Board from './Board';
import { ArrowBigUpDash, ArrowBigDownDash, ArrowBigRightDash } from 'lucide-react';

const CreateTaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const [priority, setPriority] = useState("");
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
        <form className="space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-1 block text-sm font-medium">
              Task Title <span className="text-red-500">*</span>
            </label>

            <input
              id="task-title"
              type="text"
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
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              placeholder="Enter task description"
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