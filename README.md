# Exdesis Cookie Clicker Pablo

Simple page application made with React and Javascript, which allows you to earn points every time you click on the button or buy autoclickers, which allow you to earn points automatically.

### Project structure

```
src
├── __test__
├── domain/services
│   ├── persistenceService
├── infrastructure
│   ├── components
│   ├── navigation
│   ├── pages
└── └── storage

```

### Used libraries

- `cypress` for end to end testing (npm install --save-dev cypress)
- `react-autocomplete-hint` to search autocompletion (npm install react-autocomplete-hint)
- `react-router-dom` to create app routing (npm install react-router-dom)
- `@testing-library/react` to assist with testing (npm install --save-dev @testing-library/jest-dom @testing-library/react)
- `@testing-library/jest-dom` to assist with testing

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run open`

Runs cypress end to end test on a browser.\
Be sure your your project runs on http://localhost:3000 Chose E2E Testing then click on the Start E2E Testing in Chrome buttom.\
Click on cookie-clicker.cy.js and you can see al the test running.

### `npm run cypress`

Runs cypress end to end test on your terminal.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except
`eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool
wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run build` fails to minify

This section has moved here:
[https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
