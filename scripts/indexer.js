const Promise = require('bluebird');
const lunr = require('lunr');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const glob = Promise.promisify(require('glob'));

const builder = new lunr.Builder();
builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);
builder.searchPipeline.add(lunr.stemmer);
builder.field('name');
builder.field('description');

const store = {};

const filenameRe = /^([0-9]{10,11})_.*_o.jpg$/;
const filenameRe2 = /^.*_([0-9]+).*\.jpg$/;
const storePhoto = filepath => {
  const jpeg = path.basename(filepath);
  const id = (filenameRe.exec(jpeg) || filenameRe2.exec(jpeg))[1];

  store[id] = {
    id,
    jpeg
  };
  return fs.accessAsync(`static/data/photo_${id}.json`); // check related JSON file exists
};

const saveStore = () =>
  fs
    .writeFileAsync(
      'static/data/search_store.json',
      JSON.stringify(store, null, 2)
    )
    .then(() => 'Store written');

const addPhoto = json => builder.add(JSON.parse(json));

const saveIndex = () =>
  fs
    .writeFileAsync(
      'static/data/search_index.json',
      JSON.stringify(builder.build().toJSON(), null, 2)
    )
    .then(() => 'Index written');

glob('static/data/photo_*.json')
  .then(files =>
    Promise.all(Promise.map(files, f => fs.readFileAsync(f).then(addPhoto)))
  )
  .then(saveIndex)
  .then(console.log);

glob('static/photos/*.jpg')
  .then(files => Promise.all(Promise.map(files, storePhoto)))
  .then(saveStore)
  .then(console.log);
