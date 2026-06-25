'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Candidate {
  id: string
  fullName: string
  email: string
  phone: string
  position: string
  department: string
  employmentType: string
  salary: number
  startDate: string
  createdAt: string
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  async function fetchCandidates() {
    const res = await fetch('/api/candidates')
    const data = await res.json()
    setCandidates(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this candidate?')) return
    await fetch(`/api/candidates/${id}`, { method: 'DELETE' })
    fetchCandidates()
  }

  const filtered = candidates.filter(c =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">HR Document Portal</h1>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
          <Link
            href="/dashboard/candidates/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Candidate
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No candidates found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Name</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Email</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Position</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Type</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Start Date</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{c.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">{c.email}</td>
                    <td className="px-6 py-4 text-gray-600">{c.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        c.employmentType === 'Intern'
                          ? 'bg-yellow-100 text-yellow-700'
                          : c.employmentType === 'Full-Time'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {c.employmentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(c.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/candidates/${c.id}`}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/candidates/${c.id}/edit`}
                          className="text-green-600 hover:underline text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}