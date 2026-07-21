import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [crewmate, setCrewmate] = useState({ id: null, name: "", speed: "", color: "", is_imposter: false })
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const idNum = Number(id)

    useEffect(() => {
        const fetchCrewmate = async () => {
            if (!id || Number.isNaN(idNum)) {
                setErrorMessage('Invalid crewmate id.')
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('Crewmates')
                .select('*')
                .eq('id', idNum)
                .single()

            if (error) {
                setErrorMessage(error.message || 'Error fetching crewmate')
                setLoading(false)
                return
            }

            setCrewmate({
                id: data.id,
                name: data.name ?? '',
                speed: data.speed ?? '',
                color: data.color ?? '',
                is_imposter: data.is_imposter ?? false,
            })
            setLoading(false)
        }

        fetchCrewmate()
    }, [id])

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setCrewmate((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const updatePost = async (event) => {
        event.preventDefault()

        if (Number.isNaN(idNum)) {
            setErrorMessage('Invalid id, cannot update.')
            return
        }

        const { data, error } = await supabase
            .from('Crewmates')
            .update({
                name: crewmate.name,
                speed: crewmate.speed,
                color: crewmate.color,
                is_imposter: crewmate.is_imposter,
            })
            .eq('id', idNum)
            .select()

        if (error) {
            setErrorMessage(error.message || 'Error updating crewmate')
            return
        }

        setSuccessMessage('Crewmate updated successfully')
        navigate('/')
    }

    const deletePost = async (event) => {
        event.preventDefault()

        if (Number.isNaN(idNum)) {
            setErrorMessage('Invalid id, cannot delete.')
            return
        }

        const { data, error } = await supabase
            .from('Crewmates')
            .delete()
            .eq('id', idNum)
            .select()

        if (error) {
            setErrorMessage(error.message || 'Error deleting crewmate')
            return
        }

        setSuccessMessage('Crewmate deleted')
        navigate('/')
    }

    if (loading) {
        return <div>Loading crewmate...</div>
    }

    return (
        <div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={updatePost}>
                <label htmlFor="name">Name</label> <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={crewmate.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />

                <label htmlFor="speed">Speed (mph)</label><br />
                <input
                    type="text"
                    id="speed"
                    name="speed"
                    value={crewmate.speed}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />

                <label htmlFor="color">Color</label><br />
                <select
                    id="color"
                    name="color"
                    value={crewmate.color}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Pink">Pink</option>
                    <option value="Purple">Purple</option>
                    <option value="Orange">Orange</option>
                </select>
                
                <input type="submit" value="Submit" />
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost