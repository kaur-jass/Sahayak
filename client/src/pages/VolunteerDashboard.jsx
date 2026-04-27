import { useState } from "react";
import {
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function VolunteerDashboard() {
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);

 
  const [assignedTasks, setAssignedTasks] = useState([
    {
      id: "1",
      title: "Medical supplies needed",
      location: "Sector 5, Block A",
      urgency: "Critical",
      category: "Medical",
      distance: "1.2 km",
      time: "15 min ago",
    },
    {
      id: "2",
      title: "Food distribution assistance",
      location: "Sector 3, Main Street",
      urgency: "High",
      category: "Food",
      distance: "3.5 km",
      time: "1 hour ago",
    },
  ]);

  const [nearbyRequests, setNearbyRequests] = useState([
    {
      id: "3",
      title: "Shelter setup help needed",
      location: "Sector 7, Community Center",
      urgency: "Medium",
      category: "Shelter",
    },
  ]);


  const handleAccept = (task) => {
    setAssignedTasks((prev) => [...prev, task]);
    setNearbyRequests((prev) => prev.filter((t) => t.id !== task.id));

    // BACKEND CALL (later)
    // await axios.post("/api/tasks/accept", { taskId: task.id });
  };

  // ✅ COMPLETE TASK
  const markAsResolved = (id) => {
    setCompletedTasks((prev) => [...prev, id]);

    // 🔥 BACKEND CALL (later)
    // await axios.post("/api/tasks/complete", { taskId: id });
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("volunteer");
    navigate("/");
  };

  // ✅ STATS
  const completedCount = completedTasks.length;
  const activeCount = assignedTasks.length - completedTasks.length;

  const areasWorked = [
    ...new Set(
      assignedTasks
        .filter((task) => completedTasks.includes(task.id))
        .map((task) => task.location)
    ),
  ];

  const categoriesWorked = [
    ...new Set(
      assignedTasks
        .filter((task) => completedTasks.includes(task.id))
        .map((task) => task.category)
    ),
  ];

  const getColor = (urgency) => {
    if (urgency === "Critical") return "bg-red-500/20 text-red-400";
    if (urgency === "High") return "bg-orange-500/20 text-orange-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">

      {/* HEADER */}
      <div className="bg-[#0f1433] px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <User />
          <div>
            <h2>Volunteer</h2>
            <p className="text-gray-400 text-sm">Dashboard</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="px-4 py-2 bg-green-500/20 rounded-xl"
          >
            {isOnline ? "Online" : "Offline"}
          </button>

          <Bell />

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Completed" value={completedCount} color="text-green-400" />
          <StatCard title="Active" value={activeCount} color="text-orange-400" />
          <StatCard title="Areas" value={areasWorked.length} color="text-blue-400" />
          <StatCard title="Categories" value={categoriesWorked.length} color="text-purple-400" />
        </div>

        {/* ASSIGNED TASKS */}
        <Section title="Assigned Tasks">
          {assignedTasks.map((task) => (
            <TaskCard key={task.id} task={task}>
              {!completedTasks.includes(task.id) ? (
                <Link
                  to="/volunteer-proof-submission"
                  className="btn-primary"
                >
                  Submit Proof
                </Link>
              ) : (
                <span className="text-green-400 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Done
                </span>
              )}
            </TaskCard>
          ))}
        </Section>

        {/* NEARBY REQUESTS */}
        <Section title="Nearby Requests">
          {nearbyRequests.map((req) => (
            <TaskCard key={req.id} task={req}>
              <button
                onClick={() => handleAccept(req)}
                className="bg-gray-700 px-4 py-2 rounded-xl"
              >
                Accept
              </button>
            </TaskCard>
          ))}
        </Section>

      </div>
    </div>
  );
}



function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#0f1433] p-4 rounded-xl text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TaskCard({ task, children }) {
  return (
    <div className="bg-[#0f1433] p-6 rounded-2xl flex justify-between">
      <div>
        <h3>{task.title}</h3>
        <p className="text-gray-400 text-sm">{task.location}</p>
      </div>
      {children}
    </div>
  );
}