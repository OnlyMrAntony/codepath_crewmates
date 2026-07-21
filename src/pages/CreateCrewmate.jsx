import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./CreateCrewmate.css";

function CreateCrewmate() {
    const [crewmate, setCrewmate] = useState({ name: "", speed: "", color: "" })
    const navigate = useNavigate()

    const createPost = async (event) => {
        event.preventDefault()

        // automatically assign is_imposter (20% chance)
        const is_imposter = Math.random() < 0.2

        const { error } = await supabase
            .from('Crewmates')
            .insert([{ name: crewmate.name, speed: crewmate.speed, color: crewmate.color, is_imposter }])
            .select()

        if (error) {
            console.error('Error creating crewmate:', error.message)
            return
        }

        navigate('/read')
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setCrewmate((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div>
            <form onSubmit={createPost}>
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
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreateCrewmate