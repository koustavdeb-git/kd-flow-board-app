import React from 'react'

const ProjectHeader = ({ openCreateModal }) => {
  return (
    <>
      <div className="flex flex-col mb-6 gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Your Projects
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Create and manage projects to organize your tasks.
            Select a project to view and update tasks through
            Board View and List View.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 cursor-pointer"
        >
          + Create Project
        </button>
      </div>

    </>
  )
}

export default ProjectHeader
