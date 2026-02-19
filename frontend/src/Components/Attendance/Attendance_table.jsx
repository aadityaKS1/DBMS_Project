import React from 'react'
import { useState } from 'react'

const initialVolunteers = Array.from({ length: 13 }).map((_, i) => ({
    id: i + 1,
    name: "Username",
    email: "abc@gmail.com",
    engagement: Math.floor(Math.random() * 40) + 60,
    status: "Attended",
}));

const Attendance_table = () =>{
        
            const [volunteers, setVolunteers] = useState(initialVolunteers);

            const handleStatusChange = (id, status) => {
                setVolunteers((prev) =>
                    prev.map((v) => (v.id === id ? { ...v, status } : v))
                );
  };

            return (
                <>
            <div className="p-6 w-[80%] mx-auto my-2 mb-12">
                <div className="bg-white rounded-2xl border shadow-sm">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">Volunteers Attendance</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left">S.No.</th>
                                    <th className="px-6 py-3 text-left">Volunteers Name</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Engagement Score</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {volunteers.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{v.id}.</td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                                <span className="text-blue-600 font-medium">
                                                    {v.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">{v.email}</td>

                                        <td className="px-6 py-4">
                                            <div className="w-40 h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-2 bg-blue-500 rounded-full"
                                                    style={{ width: `${v.engagement}%` }}
                                                />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <select
                                                value={v.status}
                                                onChange={(e) =>
                                                    handleStatusChange(v.id, e.target.value)
                                                }
                                                className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option>Attended</option>
                                                <option>Absent</option>
                                                <option>Late</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Attendance_table
