FROM node:16.3.0-alpine
WORKDIR /app

# copy package.json
COPY package.json ./

# installing all packages of packages.json [ like node_modules]
RUN yarn

# copy all project files and folders
COPY . .

# run on port
EXPOSE 5000

# same as nodejs run > node index.js
CMD ["node","index.js"]

# docker build -t demo-server .
# docker run -d -it -p 5000:5000 --name=demo-server demo-server