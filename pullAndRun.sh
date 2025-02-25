docker pull ivucicev/eenvo.io:latest || echo "Failed to pull image"
docker stop eenvo || echo "Failed to stop container"
docker rm eenvo || echo "Failed to remove container"
docker run -d --env-file .env -p 443:80 -p 80:80 -v /pb_data:/pb/pb_data -v /pb_demo_data:/pb-demo/pb_data --restart always --name eenvo ivucicev/eenvo.io:latest || echo "Failed to run container"