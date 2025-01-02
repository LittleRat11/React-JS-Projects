import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {gql, useLazyQuery} from "@apollo/client";

// *creating a graph query
const GET_USER_INFO = gql`
    query getUserInfo($username: String!) {
            user(login: $username) {
                    name
                    avatarUrl
                    repositories(last: 10) {
                            nodes{
                                    id
                                    name
                                    description
                                    url
                        }
            }
    }
}
`;


export default function App() {
    const[username,setUsername] = useState('');
    const[getUserInfo,{loading,error,data}] = useLazyQuery(GET_USER_INFO);
    const handleSearch = () => {
    getUserInfo({variables : {username}});
};
    return (
        <div style={{ textAlign: 'center',padding: 20 }}>
            <h1>Github User Info</h1>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Github username'/>
            <button onClick={() => handleSearch()}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.user && (
                <div>
                        <img src={data.user.avatarUrl} alt={data.user.name} style={{borderRadius: '50%', width: 100}}/>
                        <h2>{data.user.name}</h2>
                        <h3>Repositories</h3>
                        <ul style={{ listStyleType: 'none', padding:0 }}>
                                    {data.user.repositories.nodes.map((repo) => (
                                        <li key={repo.id} style={{ marginBottom: 10 }}>
                                                <a href={repo.url} target='_blank' rel='noopener noreferrer'>
                                                <strong>{repo.name}</strong>
                                                </a>    
                                                <p>{repo.description}</p>
                                        </li>
                        ))}
                        </ul>
                </div>
)}
        </div>
);  
}