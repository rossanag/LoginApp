# React 18 App boilerplate created with Vite

## Introduction

I switched to Vite from Create React App for performance reasons
>On-demand file serving over native ESM, no bundling required!
Hot Module Replacement (HMR) that stays fast regardless of app size.
Out-of-the-box support for TypeScript, JSX, CSS and more.
Pre-configured Rollup builds with multi-page and library mode support.
Rollup-superset plugin interface shared between dev and build.
Flexible programmatic APIs with full TypeScript typing.
Supports React, Vue, Preact, Svelte.

>Vite uses esbuild which is written in Go and pre-bundles dependencies 10–100x faster than JavaScript-based bundlers.
Vite improves the development server start time by dividing the modules of an application into two categories: **dependencies** and **source code**.
**Dependencies** are mostly plain JavaScript that does not change often during development. Some large dependencies (e.g. AntD) are also quite expensive to process.
**Source code** often contains non-plain JavaScript that needs transforming (e.g. JSX, CSS or etc components), and will be edited very often. Also, not all source code needs to be loaded at the same time (e.g. with route-based code-splitting).

Here the [explanation why Vite is faster than CRA](https://dev.to/nilanth/use-vite-for-react-apps-instead-of-cra-3pkg), it's worth reading

## Features installed

- Vite
- Typescript
- Tailwindcss
- Eslint
- Jest

## Step by Step installations

1- Create a folder for your project and change to it
2- Install Vite ``` npm install vite @vitejs/plugin-react --save-dev ```
3- Create a React with Typescript ``` npm create vite@latest my-vue-app -- --template react-ts ```
4- Create package.json ``` npm install ``` to install the plugins mentioned in the package.json file
5- I wanted to open the browser instantaneously after the ``` npm run dev ``` command. We need to add the following tag in the vite.config.ts. You can skip this step, if so just copy and paste the url that appears in your terminal

```

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
 plugins: [react()],
 server: {
  open: 'pathToYourIndex/index.html',
 }, 
});

 ```

**Note :**  In a Vite project, index.html is front-and-central instead of being tucked away inside public. This is intentional: during development Vite is a server, and index.html is the entry point to your application.

6- You cant check the tsconfig.json file, these are my options. You can change them in order to suit your preferences. The [official site](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) has all the configuration options described.
7- Install [Tailwind](https://tailwindcss.com/):

```npm install -D tailwindcss postcss autoprefixer```
```npx tailwindcss init -p```

 The last command creates the taiwind y postcss config files

PostCSS is a tool for transforming styles with JS plugins. Autoprefixer is a plugin for PostCSS processor
The tailwind.

**Note :** After installing Tailwind the layout changes because the styles are broken because we cleared the default CSS in the index.css file to input the Tailwind directives.

8- Install Jest for testing

``` npm install -D jest ```
``` npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event ```
``` npm install -D @babel/preset-react @babel/preset-typescript @babel/preset-env ```
``` npm install -D identity-obj-proxy ```

>One of the downsides of vite is that it doesn't come with any out-of-the-box testing support. It also has its own esbuild-based compiler, which is not currently compatible with jest, so we have to configure JSX & TypeScript support for jest even though vite handles that already for our app.
Source: [Adding Jest with TS to a Vite app](https://egghead.io/lessons/jest-adding-jest-with-typescript-support-to-a-vite-application)

The **jest.config.cjs** file has some tweaks to enable css files imports (ie: @import index.css) and surpress a Syntax Error. Source: From a [stackoverflow post](https://stackoverflow.com/questions/39418555/syntaxerror-with-jest-and-react-and-importing-css-files)

The **babel.config.js** was modified to avoid importing React as well, take a look at the file. The _runtime:automatic_ set it is how to pursue that.

I added scripts for testing in the package.json file:
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"

 ```


9- By following [this article](https://www.robinwieruch.de/vite-eslint/) I installed Eslint for a React Vite app.
I installed [Eslint for Typescript](https://typescript-eslint.io/getting-started) and for [CSS](https://www.npmjs.com/package/eslint-plugin-css) as well. I wanted a depth syntax control to avoid as much errors as possible.

You can install and configure (very basically) eslint by running: ``` npm init @eslint/config ```

This is my final vite.config.ts file after installing eslint:

```

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
 plugins: [react(), eslint()],
 server: {
  open: 'index.html',
 }, 
});

 ```

10- Create the eslint configuration file ``` touch .eslintrc ```. 
I complemented the configuration by following: [eslint configuration](https://medium.com/alturasoluciones/eslint-basic-configuration-18b2109d98ec)

You can change the configuration running this command: ``` npm init @eslint/config ```

I experienced some erros with the following message:
>"React must be in scope, disable rules"  

I found [this nice article](https://bobbyhadz.com/blog/react-must-be-in-scope-when-using-jsx) that point out the several reason and each solution to them. In my case it was because my React version is greater than 17.  I needed to update the .eslintrc config file by adding the following rules:

```

'react/react-in-jsx-scope': 'off',
'react/jsx-uses-react': 'off',
'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],

 ```

I added the eslint script to the package.json file
``` "eslint": "eslint --max-warnings=0 src/**/*.ts{,x} --fix" ```

I had to tweak the config file to add ";" after every sentence, just because I like it.
Within the rules: is the 'semi' attribute


## About the example code

The code has the basic sckeleton to import a tipical React app with a changing state example. 
I added a test for differente cases: test the rendering, test the user event and test the state changes.
It could be improvable in several ways, if by a change you arrive here, feel free to let me know.

### Important

After running and testing my example several times, it lead me to this error:
>"ERROR: Error: ENOSPC: System limit for number of file watchers reached"

I use Ubuntu, but it is the same for other OS, Linux uses the inotify package to observe filesystem events, individual files or directories. Due to React hot reloads, it recompiles files, on save it needs to keep track of all project's files. Increasing the inotify watch limit hides the warning messages.
Here is the link to the [article that leads to the solution](https://bobbyhadz.com/blog/system-limit-for-number-of-file-watchers-reached) according to your OS 


### Final notes

You can watch the different config files to see the options I choose. For shortening purposes I didn't specify all of them.
