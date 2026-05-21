
import TutorDetails from "@/components/TutorDetails";

export default async function TutorDetailsPage({params}) {
    const {id}= await params
    const res = await fetch(`http://localhost:8000/TutorDetails/${id}`)
    const initialTutorData = await res.json()
    console.log(initialTutorData);
    
    return(
        <div><TutorDetails initialTutorData={initialTutorData}></TutorDetails></div>
    )
     
}