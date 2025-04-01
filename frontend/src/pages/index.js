import { Container, Typography, Box } from "@mui/material";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const fetchPosts = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Wrapper for Layout */}
      <Box sx={{ display: "flex", flexDirection: "row", flex: 1, overflow: "hidden" }}>
        {/* Post List Section */}
        <Box
          sx={{
            flex: 1,
            maxWidth: "70%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Fixed Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1,
              p: 2,
            }}
          >
            <Typography variant="h5" align="center">
              Pinggy Posts
            </Typography>
          </Box>
          {/* Scrollable Post List */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              "&::-webkit-scrollbar": {
                width: "0px", // Hide scrollbar until scrolling
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0, 0, 0, 0.3)", // Style scrollbar when visible
              },
            }}
          >
            <PostList key={refresh} />
          </Box>
        </Box>

        {/* Post Submission Form Section */}
        <Box
          sx={{
            width: "300px",
            position: "fixed",
            right: 0,
            top: 0,
            height: "100%",
            backgroundColor: "#f5f5f5",
            p: 2,
            boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Submit a Post
          </Typography>
          <PostForm fetchPosts={fetchPosts} />
        </Box>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#f5f5f5",
          textAlign: "center", // Center align footer content
          p: 1,
          zIndex: 1,
        }}
      >
        <Typography variant="body2">
          Developed by Anil Kumar Palaketi, +91 9542886381, anilkumarpalaketi@gmail.com
        </Typography>
      </Box>
    </Container>
  );
}
