'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Article: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Get the article ID from the URL

    const [article, setArticle] = useState<any>(null); // State for article
    const [comments, setComments] = useState<any[]>([]); // State for comments
    const [newComment, setNewComment] = useState(''); // State for new comment

    useEffect(() => {
        if (id) {
            // Fetch article content
            const fetchArticle = async () => {
                const response = await fetch(`https://www.anesiigebu.com/wp-json/wp/v2/posts/${id}`);
                const data = await response.json();
                setArticle(data);
            };

            // Fetch comments
            const fetchComments = async () => {
                const response = await fetch(`https://www.anesiigebu.com/wp-json/wp/v2/comments?post=${id}`);
                const data = await response.json();
                setComments(data);
            };

            fetchArticle();
            fetchComments();
        }
    }, [id]);

    return (
        <div>
            {article && (
                <>
                    <h1>{article.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
                </>
            )}
            {/* Comments section */}
        </div>
    );
};

export default Article;