# pnpm
#### Run dev
```
pnpm dev
```

#### Run build
```
pnpm build
```

# Docker
#### Build
```
docker build -t <image-name> .
```

#### Run
```
docker run -p8001:3000 -p8000:8000 <image-name>
```

Browse
- http://localhost:8001
- http://localhost:8000


#### ls Docker Container ID
```
docker container ls
```

#### Stop
```
docker stop <container-id>
```

#### Stop and remove by <image-name>
```
IMAGENAME=testwebapp-authentication sh -c 'docker rm $(docker stop $(docker ps -a -q --filter ancestor=$IMAGENAME --format="{{.ID}}"))'
```

# Eslint Rules
See eslint 'complexity', 'max-depth'