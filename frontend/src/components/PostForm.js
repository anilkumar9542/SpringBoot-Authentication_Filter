import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const PostForm = ({ fetchPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'PinggyAuthHeader': authCode, // Sending Auth Code in Header
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) throw new Error("Failed to submit post, PinggyAuthHeader is missing");

      setTitle("");
      setBody("");
      setAuthCode("");
      fetchPosts(); // Refresh the post list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Submit a Post
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <TextField
        label="Auth Code"
        variant="outlined"
        fullWidth
        // type="password"
        margin="normal"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Post
      </Button>
    </Box>
  );
};

export default PostForm;
