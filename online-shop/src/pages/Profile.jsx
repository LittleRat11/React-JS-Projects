import {useState,useEffect} from "react"
import {useNavigate} from "react-router";

export default function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/users.json")
        .then(res => res.json())
        .then(data => setUser(data));

    },[])
    if(!user) return <p>User not found.....</p>
    return (

              <div className='container mx-auto p-4'>
            <div className='flex flex-col items-center'>
                <img 
                    src={user.profilePicture}
                    alt="Profile"
                    className='w-32 h-32 rounded-full shadow-lg mb-4'
                />
                <h1 className='text-3xl font-bold mb-2'>{user.name}</h1>
                <p className='text-gray-600 mb-2'>{user.email}</p>
                <button onClick={() => navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
            </div>
        </div>
 );
}