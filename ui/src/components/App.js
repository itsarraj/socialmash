import { useEffect } from 'react';
import { getPosts } from '../api/index';
function App() {
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            console.log(response);
        };
        fetchPosts();
    }, []);
    return (
        <div className="App">
            <h1>Hello</h1>
        </div>
    );
}

export default App;
