import React from "react";
import {
  MapPin,
  Eye,
  Users,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

const tasks = [
  { id: 1, task: "Road Clearance", location: "Kathmandu - Kalanki", type: "Road", score: 92, impact: "High", status: "Reported" },
  { id: 2, task: "Bridge Safety Inspection", location: "Bhaktapur - Suryabinayak", type: "Bridge", score: 88, impact: "High", status: "In Review" },
  { id: 3, task: "Water Pipeline Repair", location: "Lalitpur - Pulchowk", type: "Water Supply", score: 75, impact: "Medium", status: "Pending" },
  { id: 4, task: "Power Line Restoration", location: "Pokhara - Lakeside", type: "Power Grid", score: 60, impact: "Medium", status: "Scheduled" },
  { id: 5, task: "Sewage Overflow Fix", location: "Biratnagar - Main Road", type: "Sewage System", score: 95, impact: "Critical", status: "Reported" },
  { id: 6, task: "Hospital Access Repair", location: "Birgunj - Adarshanagar", type: "Hospital Access", score: 90, impact: "Critical", status: "Pending" },
  { id: 7, task: "School Building Inspection", location: "Hetauda - Makwanpur", type: "School Building", score: 82, impact: "High", status: "In Review" },
  { id: 8, task: "Drainage Cleaning", location: "Janakpur - Ramanand Chowk", type: "Drainage", score: 55, impact: "Medium", status: "Scheduled" },
  { id: 9, task: "Public Transport Route Repair", location: "Butwal - Traffic Chowk", type: "Public Transport", score: 45, impact: "Low", status: "Completed" },
  { id: 10, task: "Park Wall Restoration", location: "Dharan - Bhanu Chowk", type: "Park Facility", score: 30, impact: "Low", status: "Deferred" },
  { id: 11, task: "Street Lighting Fix", location: "Nepalgunj - BP Chowk", type: "Street Lighting", score: 58, impact: "Medium", status: "Scheduled" },
  { id: 12, task: "Heritage Site Assessment", location: "Patan - Durbar Square", type: "Heritage Site", score: 70, impact: "Medium", status: "Reported" },
  { id: 13, task: "Landslide Clearance", location: "Sindhupalchok - Melamchi", type: "Road", score: 98, impact: "Critical", status: "Reported" },
  { id: 14, task: "Water Tank Structural Check", location: "Gorkha - Bazaar", type: "Water Supply", score: 65, impact: "Medium", status: "Pending" },
  { id: 15, task: "Electric Substation Repair", location: "Itahari - Tarahara", type: "Power Grid", score: 85, impact: "High", status: "In Review" },
];

const impactColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-orange-100 text-orange-700",
  High: "bg-yellow-100 text-yellow-800",
  Critical: "bg-red-100 text-red-700",
};

const statusColors = {
  Reported: "bg-gray-200 text-gray-700",
  "In Review": "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-600",
  Scheduled: "bg-green-100 text-green-700",
  Completed: "bg-green-200 text-green-800",
  Deferred: "bg-gray-300 text-gray-600",
};

export default function AITaskPrioritizationQueue() {
  const [selectedRow, setSelectedRow] = React.useState(1);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDEBAR (page-level, not navbar) */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="font-bold text-lg">Punarnirman Admin</h2>
        <nav className="space-y-3 text-sm">
          <p className="font-semibold text-blue-600">Prioritization Queue</p>
          <p className="text-gray-600">Assign Tasks</p>
          <p className="text-gray-600">Volunteers</p>
          <p className="text-gray-600">Progress Tracking</p>
          <p className="text-gray-600">Reports</p>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold">AI-Based Task Prioritization Queue</h1>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* TABLE */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="text-left p-3">Task Name</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Infrastructure</th>
                  <th className="text-left p-3">AI Score</th>
                  <th className="text-left p-3">Impact</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => setSelectedRow(task.id)}
                    className={`border-b last:border-none cursor-pointer transition ${
                      selectedRow === task.id ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3 font-medium">{task.task}</td>
                    <td className="p-3 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {task.location}
                    </td>
                    <td className="p-3">{task.type}</td>
                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">
                        {task.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full ${impactColors[task.impact]}`}>
                        {task.impact}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full ${statusColors[task.status]}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:underline flex items-center gap-1">
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT INSIGHT PANEL */}
          <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
            <h2 className="font-semibold">Why this task is high priority</h2>
            <div className="flex items-start gap-3 text-sm">
              <Users className="text-blue-600" />
              <p>
                Population affected: <strong>5,000 residents</strong>
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <ShieldAlert className="text-red-600" />
              <p>
                Safety risk: <strong>High structural instability</strong>
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <AlertTriangle className="text-orange-600" />
              <p>Connectivity loss: Primary access route disrupted</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
