import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  FolderKanban,
} from "lucide-react";

const navItems = [
  {
    name: "Board View",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "List View",
    path: "/list",
    icon: List,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="p-4">
        <ul className="space-y-2">

          <div className="flex items-center gap-3 mb-15">
            <LayoutDashboard size={24} />
            <span className="text-xl font-bold">
              KD FlowBoard
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;