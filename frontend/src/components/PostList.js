import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/list", {
        method: "GET",
        headers: {
          "PinggyAuthHeader": "xyz",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : posts.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No posts available.
        </Typography>
      ) : (
        posts.map((post, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PostList;
