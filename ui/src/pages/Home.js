import { useEffect, useState } from 'react';
import { Loader } from '../components/index';
import { getPosts } from '../api/index';
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            if (response.success) {
                setPosts(response.data.posts);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <div>Home</div>
        </>
    );
};

export default Home;
