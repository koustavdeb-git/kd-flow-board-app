import { useEffect, useState } from "react";
import { FolderKanban, ListTodo, Clock3, CheckCircle2 } from "lucide-react";
import { supabase } from "../../services/supabase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    inProgress: 0,
    completed: 0,
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data: projectData } = await supabase
      .from("project-list")
      .select("*");

    const { data: taskData } = await supabase
      .from("tasks")
      .select("*");

    setStats({
      projects: projectData?.length || 0,
      tasks: taskData?.length || 0,
      inProgress:
        taskData?.filter((task) => task.status === "in-progress").length || 0,
      completed:
        taskData?.filter((task) => task.status === "done").length || 0,
    });

    setProjects(projectData || []);
  };

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      value: stats.tasks,
      icon: ListTodo,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome Back 👋
            </h1>

            <p className="mt-3 text-green-50">
              Track projects, manage tasks, and stay productive with FlowBoard.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
            <p className="text-sm text-green-100">
              Active Workspace
            </p>

            <p className="text-2xl font-bold">
              KD FlowBoard
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          const iconColors = [
            "bg-blue-100 text-blue-600",
            "bg-purple-100 text-purple-600",
            "bg-amber-100 text-amber-600",
            "bg-emerald-100 text-emerald-600",
          ];

          return (
            <div
              key={card.title}
              className="
              group
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-4 text-4xl font-bold text-gray-900">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`rounded-2xl p-4 ${iconColors[index]}`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Recent Projects */}
        <div className="xl:col-span-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Projects
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {projects.length} Projects
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="
                  rounded-2xl
                  border
                  border-green-200
                  bg-green-50/40
                  p-5
                  transition-all
                  duration-300
                  hover:border-green-600
                  hover:bg-green-60
                  hover:shadow-md
                "
                >
                  <h3 className="font-semibold text-gray-900">
                    {project.project_name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {project.project_desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
              <p className="text-gray-500">
                No projects found.
              </p>
            </div>
          )}
        </div>

        {/* Productivity Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Productivity
          </h2>

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-4xl font-bold text-emerald-700">
                {stats.tasks
                  ? Math.round(
                    (stats.completed / stats.tasks) * 100
                  )
                  : 0}
                %
              </span>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Completion Rate
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Completed
                </span>

                <span className="font-semibold text-emerald-600">
                  {stats.completed}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  In Progress
                </span>

                <span className="font-semibold text-amber-600">
                  {stats.inProgress}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Total Tasks
                </span>

                <span className="font-semibold">
                  {stats.tasks}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;