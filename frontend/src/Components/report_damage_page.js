import React, { useState } from "react";

export default function ReportDamageForm() {
  const [form, setForm] = useState({
    reported_by: "",
    district: "",
    municipality: "",
    volunteers_required: "",
    skills_required: "",
    infrastructure_type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      reported_by: form.reported_by,
      district: form.district,
      municipality: form.municipality,
      volunteers_required: Number(form.volunteers_required || 0),
      skills_required: form.skills_required,
      infrastructure_type: form.infrastructure_type,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/reports/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("API Error:", res.status, text);
        alert("Failed to submit");
        return;
      }

      alert("Report submitted!");
      setForm({
        reported_by: "",
        district: "",
        municipality: "",
        volunteers_required: "",
        skills_required: "",
        infrastructure_type: "",
      });
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 14px",
      background: "linear-gradient(135deg, #f7fafc, #eef2ff)",
    },
    card: {
      maxWidth: 560,
      margin: "0 auto",
      background: "#fff",
      borderRadius: 16,
      padding: 22,
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    },
    title: { margin: 0, fontSize: 22, color: "#0f172a" },
    subtitle: { marginTop: 6, marginBottom: 18, fontSize: 14, color: "#64748b" },
    label: { fontSize: 13, color: "#334155", marginBottom: 6, display: "block" },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: 12,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      outline: "none",
      fontSize: 14,
      background: "#f8fafc",
    },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    button: {
      width: "100%",
      padding: "11px 12px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      background: "#2563eb",
      color: "#fff",
      marginTop: 6,
    },
    smallNote: { fontSize: 12, color: "#94a3b8", marginTop: 10 },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Damage Report</h2>


        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Reported By </label>
          <input
            name="reported_by"
            value={form.reported_by}
            onChange={handleChange}
            placeholder="Your name / organization"
            style={styles.input}
          />

          <div style={styles.row}>
            <div>
              <label style={styles.label}>District</label>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="e.g. Kathmandu"
                required
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Municipality</label>
              <input
                name="municipality"
                value={form.municipality}
                onChange={handleChange}
                placeholder="e.g. KMC"
                required
                style={styles.input}
              />
            </div>
          </div>

          <label style={styles.label}>Infrastructure Type</label>
          <input
            name="infrastructure_type"
            value={form.infrastructure_type}
            onChange={handleChange}
            placeholder="Road / Bridge / School / Hospital"
            required
            style={styles.input}
          />

          <div style={styles.row}>
            <div>
              <label style={styles.label}>Volunteers Required</label>
              <input
                name="volunteers_required"
                type="number"
                value={form.volunteers_required}
                onChange={handleChange}
                placeholder="e.g. 10"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Skills Required</label>
              <input
                name="skills_required"
                value={form.skills_required}
                onChange={handleChange}
                placeholder="First Aid / Rescue"
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>


        </form>
      </div>
    </div>
  );
}
