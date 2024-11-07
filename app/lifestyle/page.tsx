'use client';

import { useEffect, useState } from 'react'; // Import useEffect and useState
import { useLoader } from 'app/loader/Loader'; // Corrected import path for useLoader
import { LoaderProvider } from 'app/loader/Loader'; // Import LoaderProvider

interface Post {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    category: string; // Assuming category is part of the post data
    featured_media: number; // Assuming this is the ID of the featured image
    slug: string; // Add slug property to the Post interface
}

const App: React.FC = () => {
    return (
        <LoaderProvider>
            <LifestylePage />
        </LoaderProvider>
    );
};

const LifestylePage: React.FC = () => {
    const { setLoading } = useLoader(); // Ensure useLoader is called within LoaderProvider

    const [posts, setPosts] = useState<Post[]>([]); // Define state for posts
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]); // State to hold categories
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // Define state for filtered posts
    const [featuredImages, setFeaturedImages] = useState<{ [key: number]: string }>({}); // State to hold featured images

    // Fetch the featured image URL based on the featured_media ID
    const fetchFeaturedImage = async (mediaId: number) => {
        const response = await fetch(`https://anesiigebu.com/wp-json/wp/v2/media/${mediaId}`);
        const mediaData = await response.json();
        return mediaData.source_url; // Assuming source_url contains the image URL
    };

    useEffect(() => {
        const fetchPostsAndCategories = async () => {
            setLoading(true); // Set loading state to true
            try {
                const postsResponse = await fetch('https://anesiigebu.com/wp-json/wp/v2/posts');
                const postsData = await postsResponse.json();
                setPosts(postsData);
                setFilteredPosts(postsData); // Initialize filteredPosts with all posts

                // Fetch categories
                const categoriesResponse = await fetch('https://anesiigebu.com/wp-json/wp/v2/categories');
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData); // Set the categories state

                // Fetch featured images for each post
                const images = await Promise.all(postsData.map(async (post: Post) => {
                    if (post.featured_media) {
                        const imageUrl = await fetchFeaturedImage(post.featured_media);
                        return { id: post.id, url: imageUrl };
                    }
                    return { id: post.id, url: null };
                }));

                // Map images to a dictionary for easy access
                const imagesMap = images.reduce((acc, { id, url }) => {
                    acc[id] = url;
                    return acc;
                }, {} as { [key: number]: string });

                setFeaturedImages(imagesMap); // Set the featured images state
            } catch (error) {
                console.error('Error fetching posts or categories:', error);
            } finally {
                setLoading(false); // Set loading state to false
            }
        };
        fetchPostsAndCategories();
    }, [setLoading]);

    return (
        <div>
            <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map(post => (
                    <div key={post.id} className="post-card border p-4 rounded">
                        {featuredImages[post.id] && ( // Use the state to get the image URL
                            <img
                                src={featuredImages[post.id]} // Fetch and display the featured image
                                alt={post.title.rendered}
                                className="mb-2 rounded"
                            />
                        )}
                        <h2>{post.title.rendered}</h2>
                        <div className="category-highlight text-lg font-semibold text-teal-600">{post.category}</div> {/* Display category */}
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered.substring(0, 100) + '...' }} />
                        <button 
                            onClick={() => window.open(`https://anesiigebu.com/${post.slug}`, '_blank')} // Updated URL to the actual post
                            className="mt-2 bg-teal-500 text-white py-2 px-4 rounded"
                        >
                            Read more
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App; // Export App component instead of LifestylePage