### To run the app

1. run npm start from root
2. visit http://localhost:8000

### OR

1. run redis-server locally
2. go to "/backend/configs/cache" and update url
3. go to "/backend" and run "npm start"
2. go to "/frontend" and run "npm start"

## Project structure:

1. root eslint.rc contains common rules for both frontend and backend files
2. root package json serves the same purpose
3. .env files are added to git on purpose so you don't have to deal with it yourself. Also if it required if you want to run the app without docker


## Answering the questions https://drive.google.com/file/d/1b_IrwHvWM6wV2yZwnq6tYVquwBaR5fDx/view

1. App.ts - main component that renders child components located at src/pages
2. I didn't use any state management libraries. For input state I used query params. I could've used shared state in the parent and pass it down to the child components but I decided to use query params for this task to reduce code base (interfaces, props: value, onChange etc)
3. I used https://dummyjson.com. Controllers accept rotes and trigger methods of the product service
4. I used eslint, commitlint, prettier, tslint, lint-staged, husky with these git hooks: pre-commit, post-merge, commit-msg
5. BDD approach all tests are located close to the features they belong to
6. All images are being saved locally for better performance. Data caching logic can be found at /backend/controllers/products
