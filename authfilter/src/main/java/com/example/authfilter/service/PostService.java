package com.example.authfilter.service;

import com.example.authfilter.dto.PostRequestDTO;
import com.example.authfilter.dto.PostResponseDTO;
import com.example.authfilter.config.AuthFilter;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    private final List<PostResponseDTO> posts = new ArrayList<>();

    public void savePost(PostRequestDTO request) {
        String authHeader = AuthFilter.getAuthHeader();
        posts.add(new PostResponseDTO(request.getTitle(), request.getBody(), authHeader));
    }

    public List<PostResponseDTO> getPosts() {
        return posts;
    }
}
