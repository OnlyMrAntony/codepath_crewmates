import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'

const ReadCrewmates = (props) => {

    const [crewmate, setCrewmate] = useState([])

    useEffect(() => {
        const fetchCrewmates = async () =>{
            const {data, error} = await supabase
                .from('Crewmates')
                .select('*')
                .order('created_at', { ascending: false }) // newest first
            if (error) {
                console.error('Error fetching crewmates:', error.message)
                return
            }
            setCrewmate(data)
        }
        fetchCrewmates();
    }, []);

    
    return (
        <div className="ReadCrewmates">
            {
                crewmate && crewmate.length > 0 ?
                crewmate.map((post,index) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        name={post.name}
                        speed={post.speed}
                        color={post.color}
                    />
                ) : <h2>{'No Crewmates Yet 😞'}</h2>
            }
        </div>  
    )
};

export default ReadCrewmates