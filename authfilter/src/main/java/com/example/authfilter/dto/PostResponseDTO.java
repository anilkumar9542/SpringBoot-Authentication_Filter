package com.example.authfilter.dto;

public class PostResponseDTO {
    private String title;
    private String body;
    private String PinggyAuthHeader;

    public PostResponseDTO(String title, String body, String PinggyAuthHeader) {
        this.title = title;
        this.body = body;
        this.PinggyAuthHeader = PinggyAuthHeader;
    }

    public String getTitle() { return title; }
    public String getBody() { return body; }
    public String getPinggyAuthHeader() { return PinggyAuthHeader; }
}
