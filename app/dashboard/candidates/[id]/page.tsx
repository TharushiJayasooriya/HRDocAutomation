'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Candidate {
  id: string
  fullName: string
  email: string
  phone: string
  nic: string
  position: string
  department: string
  employmentType: string
  salary: number
  startDate: string
  companyRepName: string
  createdAt: string
  documents: any[]
  emailLogs: any[]
}

export default function CandidateDetailPage() {
  const { id } = useParams()
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)

  async function fetchCandidate() {
    const res = await fetch(`/api/candidates/${id}`)
    const data = await res.json()
    setCandidate(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidate()
  }, [id])

  async function handleGenerate() {
    if (!candidate) return
    setGenerating(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId: candidate.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert('Failed to generate documents: ' + (data?.error ?? res.statusText))
        return
      }
      fetchCandidate()
    } catch (error) {
      console.error(error)
      alert('Failed to generate documents')
    } finally {
      setGenerating(false)
    }
  }

  async function handleSendEmail() {
    if (!candidate) return
    setSending(true)
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId: candidate.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert('Failed to send email: ' + (data?.error ?? res.statusText))
        return
      }
      alert('Documents sent successfully!')
      fetchCandidate()
    } catch (error) {
      console.error(error)
      alert('Failed to send email')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Candidate not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">HR Document Portal</h1>
          <Link href="/dashboard/candidates" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Candidates
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{candidate.fullName}</h2>
            <p className="text-gray-500 text-sm mt-1">{candidate.position} · {candidate.department}</p>
          </div>
          <Link
            href={`/dashboard/candidates/${candidate.id}/edit`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            Edit
          </Link>
        </div>

        {/* Candidate Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">NIC / Passport</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.nic}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Position</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.position}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Department</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Employment Type</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                candidate.employmentType === 'Intern'
                  ? 'bg-yellow-100 text-yellow-700'
                  : candidate.employmentType === 'Full-Time'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {candidate.employmentType}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Salary / Allowance</p>
              <p className="text-gray-900 font-medium mt-1">Rs. {candidate.salary?.toLocaleString() ?? '0'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
              <p className="text-gray-900 font-medium mt-1">{new Date(candidate.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Company Representative</p>
              <p className="text-gray-900 font-medium mt-1">{candidate.companyRepName}</p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Documents</h3>
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate Documents'}
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sending || (candidate.documents?.length ?? 0) === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Documents'}
              </button>
            </div>
          </div>
          {(candidate.documents?.length ?? 0) === 0 ? (
            <p className="text-gray-500 text-sm">No documents generated yet. Click Generate Documents to create them.</p>
          ) : (
            <ul className="space-y-2">
              {candidate.documents.map((doc: any) => (
                <li key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{doc.documentType}</span>
                  <button
                    onClick={async () => {
                      const response = await fetch(doc.fileUrl)
                      const blob = await response.blob()
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${doc.documentType}-${candidate.fullName}.pdf`
                      document.body.appendChild(a)
                      a.click()
                      window.URL.revokeObjectURL(url)
                      document.body.removeChild(a)
                    }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Email Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Status</h3>
          {(candidate.emailLogs?.length ?? 0) === 0 ? (
            <p className="text-gray-500 text-sm">No emails sent yet.</p>
          ) : (
            <ul className="space-y-2">
              {candidate.emailLogs.map((log: any) => (
                <li key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className={`text-sm font-medium ${
                    log.emailStatus === 'sent' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {log.emailStatus}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(log.sentAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}