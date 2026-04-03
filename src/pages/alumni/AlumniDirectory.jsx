import { useEffect, useState } from "react";
import { getAlumni, sendConnection, getMyConnections } from "../../services/apiService";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

function AlumniDirectory() {

  const [alumni, setAlumni] = useState([]);
  const [connections, setConnections] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [mentorFilter, setMentorFilter] = useState("");

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {

      const alumniRes = await getAlumni();
      setAlumni(alumniRes.data || []);

      const connRes = await getMyConnections();
      setConnections(connRes.data || []);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleConnect = async (id) => {

    try {

      await sendConnection(id);

      alert("Connection request sent");

      load(); // refresh status

    } catch (err) {

      console.error(err);
      alert("Failed to send request");

    }

  };

  if (loading) return <Loader />;

  const filtered = alumni.filter((a) => {

    if (
      search &&
      !a.name?.toLowerCase().includes(search.toLowerCase()) &&
      !a.skills?.toLowerCase().includes(search.toLowerCase()) &&
      !a.location?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (batchFilter && a.batch_year?.toString() !== batchFilter) {
      return false;
    }

    if (deptFilter && a.department !== deptFilter) {
      return false;
    }

    if (mentorFilter === "mentor" && !a.is_mentor) {
      return false;
    }

    return true;
  });

  const getConnectionStatus = (userId) => {

    const conn = connections.find(
      (c) => c.receiver_id === userId || c.sender_id === userId
    );

    if (!conn) return "none";

    if (conn.status === "pending") return "pending";

    if (conn.status === "accepted") return "connected";

    return "none";
  };

  return (
    <div className="p-8 space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">Alumni Directory</h1>
        <p className="text-gray-500">
          {alumni.length} alumni in the network
        </p>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name, skills, location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-xl"
      />

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">

        <select
          className="border p-2 rounded"
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
        >
          <option value="">All Batches</option>
          {[...new Set(alumni.map((a) => a.batch_year).filter(Boolean))].map((year, index) => (
  <option key={`batch-${year}-${index}`} value={year}>
    {year}
  </option>
))}
        </select>

        <select
          className="border p-2 rounded"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {[...new Set(alumni.map((a) => a.department).filter(Boolean))].map((dep, index) => (
  <option key={`dept-${dep}-${index}`} value={dep}>
    {dep}
  </option>
))}
        </select>

        <select
          className="border p-2 rounded"
          value={mentorFilter}
          onChange={(e) => setMentorFilter(e.target.value)}
        >
          <option value="">All Alumni</option>
          <option value="mentor">Mentors Only</option>
        </select>

      </div>

      {/* Alumni Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((a) => {

          const status = getConnectionStatus(a.id);

          return (
            <div key={a.id} className="border rounded-lg p-5 shadow">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {a.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">{a.name}</h3>
                  <p className="text-sm text-indigo-500">{a.profession}</p>
                </div>

              </div>

              <div className="mt-3 text-sm text-gray-600">

                <p>
                  🎓 {a.department} • Batch {a.batch_year}
                </p>

                {a.location && <p>📍 {a.location}</p>}

              </div>

              {a.skills && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {a.skills.split(",").map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Connection Button */}

              {a.id !== Number(currentUserId) && (

                <Button
                  className="mt-4 w-full"
                  disabled={status !== "none"}
                  onClick={() => handleConnect(a.id)}
                >
                  {status === "pending"
                    ? "Pending"
                    : status === "connected"
                    ? "Connected"
                    : "Connect"}
                </Button>

              )}

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default AlumniDirectory;