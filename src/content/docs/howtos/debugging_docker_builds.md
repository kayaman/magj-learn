---
title: Debugging Docker Builds
description: by Claude
---

There are several techniques you can use to debug Docker builds:

## 1. Use Verbose Output

```bash
docker build --progress=plain -t your-image .
```

This shows each command's output during the build process.

## 2. Print Environment and Files

Add debugging commands to your Dockerfile:

```dockerfile
RUN pwd && ls -la
RUN env | sort
RUN cat /path/to/problematic/file
```

## 3. Use Build Arguments

Define variables to control debugging behavior:

```dockerfile
ARG DEBUG=false
RUN if [ "$DEBUG" = "true" ]; then ls -la /app; fi
```

Then build with:
```bash
docker build --build-arg DEBUG=true -t your-image .
```

## 4. Enter the Build Context

For failed builds, create a temporary container from the last successful layer:

```bash
# Find the last successful layer
docker build -t your-image . 2>&1 | tee build.log
# Get the last successful layer ID (from the log)
docker run -it --rm layer_id sh
```

## 5. Use Multi-stage Builds for Diagnosis

```dockerfile
FROM base-image as build
# Build steps...

FROM build as debug
RUN ls -la /app
RUN cat /app/package.json

FROM build as final
# Continue with your build...
```

Build to the debug stage:
```bash
docker build --target debug -t debug-image .
```

## 6. Check Layer Cache Usage

```bash
docker build --no-cache -t your-image . # Skip cache completely
```

## 7. Enable BuildKit for Better Error Reporting

```bash
export DOCKER_BUILDKIT=1
docker build -t your-image .
```

## 8. Check Build Context

Make sure your context isn't too large or including unnecessary files:

```bash
docker build --no-cache -t your-image . 2>&1 | grep "Sending build context"
```

## 9. Use Docker Inspect

After a successful build, examine the final image:

```bash
docker image inspect your-image
```

Would you like me to explain any of these techniques in more detail?
