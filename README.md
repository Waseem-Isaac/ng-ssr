# ng-ssr

A minimal example demonstrating Server-Side Rendering (SSR) and Static Site Generation (SSG) using Angular v19.2.5.

#### The following routes are pre-rendered at build time using *SSG*:


- `/about`

- `/post/1`

#### All other routes (including dynamic paths) are rendered on-demand using *SSR*:

- `/` (homepage)

- `/post/{:id}` (except id=1, which is SSG)

###### As defined in  [routes.txt](./routes.txt) file.

## How to use ?

To start a local development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to [http://localhost:4200](http://localhost:4200)

##

To build the project run:

```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory.

##

To start a app in the production mode, run:

```bash
npm run serve:ssr:ng-ssr
```
Once the server is running, open your browser and navigate to [http://localhost:4000](http://localhost:4000)





