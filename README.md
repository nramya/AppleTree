# AppleTree
Binary Tree MaxSum

## Demo
Screen capture of the application: http://recordit.co/DYs5q9p5zT

## Instructions to run
- Clone or download this repository.
- Download Docker and docker-compose for your operating system. If you're using Mac OS, you can download the Docker for Mac app from here: https://docs.docker.com/docker-for-mac/install/ and login using your account.
- Build your docker container from your project folder using
 `docker build .`
- Run your container from your project folder using
 `docker-compose up`
 
## Usage
- User can register an account and login to access the application.
- Provide root node value in the text box and press enter.
- To add child nodes to a node, click on the node to reveal a form to fill child node values.
- Once you have the tree, click on 'Calculate MaxSum' button to calculate the max sum of the deepest branch(es) of the tree you created.

## Try it
Application live at: [This will be updated soon]

## Technical discussion:
- The maxsum calculation uses a recusive approach. For large trees, this could lead to exceeded memory in the machine.
