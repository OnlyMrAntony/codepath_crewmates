import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './CrewmateDetail.css'

function CrewmateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchCrewmate = async () => {
      if (!id) {
        setErrorMessage('Missing crewmate id.')
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('Crewmates')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          setErrorMessage(error.message || 'Unable to load crewmate.')
          setCrewmate(null)
        } else {
          setCrewmate(data)
          // prefer DB-stored boolean if available, otherwise fall back to deterministic assignment
          if (Object.prototype.hasOwnProperty.call(data, 'is_imposter')) {
            setRole(data.is_imposter ? 'Imposter' : 'Crewmate')
          } else {
            const seededRole = (() => {
              const idNum = Number(data.id)
              if (Number.isNaN(idNum)) return 'Crewmate'
              const seed = (idNum * 9301 + 49297) % 233280
              const r = seed / 233280
              return r < 0.2 ? 'Imposter' : 'Crewmate'
            })()
            setRole(seededRole)
          }
        }
      } catch (fetchError) {
        setErrorMessage(fetchError.message || 'Unexpected error loading crewmate.')
      } finally {
        setLoading(false)
      }
    }

    fetchCrewmate()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (errorMessage) return <div className="error-message">Error: {errorMessage}</div>
  if (!crewmate) return <div>No crewmate found.</div>

  return (
    <div className="crewmate-detail">
      <div className="detail-actions">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button type="button" className="edit-button" onClick={() => navigate(`/edit/${crewmate.id}`)}>
          Edit Crewmate
        </button>
      </div>

      <h1>
        {crewmate.name}
        {role && <span className={`role-badge ${role === 'Imposter' ? 'imposter' : 'crewmate'}`}>{role}</span>}
      </h1>
      <p><strong>Speed:</strong> {crewmate.speed}</p>
      <p><strong>Color:</strong> {crewmate.color}</p>

      {/* Add any extra fields here */}
      <p><strong>Created:</strong> {crewmate.created_at ? new Date(crewmate.created_at).toLocaleDateString() : '—'}</p>
    </div>
  )
}

export default CrewmateDetail