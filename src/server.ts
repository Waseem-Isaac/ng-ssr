import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();
/**
 * This tells Express to serve any static files e.g., images, CSS, client JS 
    and the static Generated HTMLs -in case this file is running- from 
    the browser distribution folder.
*/
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    /** 
      Use index.html as the default file. 
      When angular prerenders routes at build-time, it generates `index.html` 
      file in a separated folder named by the target route itself. 
      Ex: when pre-render `/about` route (using ssg) a folder named `about` 
      will be placed under `/dist/browser` folder and that folder will 
      include the finale generated content into `index.html` file. 
      The following parameter will allow you to custmize or provide a new index.
    */
    index: 'index.html'
  }),
);

/**
 * 
  The `commonEngine` (from @angular/ssr/node)renders the Angular application,
   do the SSR process then finally return the generated HTML for each 
   requested route. 

   The following process will run -during runtime- everytime a request is made 
   by client in case of SSR.
*/
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;
  commonEngine
    .render({
      bootstrap,
      /**
        A method reference defined by `main.server.ts` file. When invoked, 
        it inializes & starts the application then returns a reference to that 
        running application.
      */

      documentFilePath: indexHtml,
      /**
       File path of the initial DOM to use to bootstrap the server application.
      */

      url: `${protocol}://${headers.host}${originalUrl}`,
      // The url of the page to render.

      publicPath: browserDistFolder,
      /**
        Base path including the document file and the rest of browser files 
        and assets.
      */
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      /** 
        The dependency providers passed - per request- to the application 
        rendered on the server..
      */
    })
    .then((html) => {
      return res.send(html);
      /**
       * Here, SSR process is done, and the final HTML content for the 
         current route is rendered on the SSR and returned to the Client.
      */
    })
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;