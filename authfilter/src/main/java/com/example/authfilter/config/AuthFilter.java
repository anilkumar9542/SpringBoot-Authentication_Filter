package com.example.authfilter.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class AuthFilter implements Filter {

    private static final ThreadLocal<String> authHeaderStorage = new ThreadLocal<>();

    public static String getAuthHeader() {
        return authHeaderStorage.get();
    }

    @Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    HttpServletResponse httpResponse = (HttpServletResponse) response;

    
    if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
        chain.doFilter(request, response);
        return;
    }

    String authHeader = httpRequest.getHeader("PinggyAuthHeader");

    if (authHeader == null || authHeader.isEmpty()) {
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: PinggyAuthHeader is missing");
        return;
    }

    authHeaderStorage.set(authHeader);
    try {
        chain.doFilter(request, response);
    } finally {
        authHeaderStorage.remove();
    }
}

}
