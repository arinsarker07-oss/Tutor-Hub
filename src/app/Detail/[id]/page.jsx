
import TutorDetails from "@/components/TutorDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function TutorDetailsPage({params}) {
    const {id}= await params
    // token ganeret for server component 
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);
    
    const res = await fetch(`http://localhost:8000/TutorDetails/${id}`,{
     // authorization for token
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const initialTutorData = await res.json()
    
    return(
        <div><TutorDetails initialTutorData={initialTutorData}></TutorDetails></div>
    )
     
}