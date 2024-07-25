### To run the app

1. run npm start from root
2. visit http://localhost:8000

### OR

1. run redis-server locally
2. go to "/backend/configs/cache" and update url
3. go to "/backend" and run "npm run dev"
2. go to "/frontend" and run "npm run dev"

## Project structure:

1. root eslint.rc contains common rules for both frontend and backend files
2. root package json serves the same purpose
3. .env files are added to git on purpose so you don't have to deal with it yourself. Also if it required if you want to run the app without docker

