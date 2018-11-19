# flickr-export-viewer

> a Next.js website for your Flickr data export

This React app uses [Next.js](https://nextjs.org/) and [Lunr](https://lunrjs.com/) to build a search index and viewer for photos exported from Flickr's official photo export.

*It is a work in progress.*

## Usage

First run ```npm install```.

Then put all your photos from ```data-download-*.zip``` in ```static/photos``` and put all the JSON files from the data zipfile (called something like ```72157703089255925_010027a4b7fa_part1.zip```) in ```static/data```.

Now run ```npm run indexer``` and wait for it to generate search index files.

To run a live copy of the Next.js server: ```npm run dev``` and open [http://localhost:3000](http://localhost:3000).

To generate a static copy of the codebase, suitable for uploading to a host such as AWS S3:

```
npm run build
npm run export
```

and upload the contents of the newly-generated ```out``` directory to an appropriate host.

## License

ISC

