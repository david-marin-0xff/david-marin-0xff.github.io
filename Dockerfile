# Use a lightweight web server
FROM nginx:alpine

# Copy your static website into Nginx's public folder
COPY . /usr/share/nginx/html

# Expose port 8080 (Render expects an HTTP service)
EXPOSE 8080

# Change Nginx default port to 8080
RUN sed -i 's/80;/8080;/' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
