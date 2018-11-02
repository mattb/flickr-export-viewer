const Promise = require('bluebird');
const lunr = require('lunr');
const fs = Promise.promisifyAll(require('fs'));
const glob = Promise.promisify(require('glob'));

const builder = new lunr.Builder();
builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);
builder.searchPipeline.add(lunr.stemmer);
builder.field('name');
builder.field('description');

const addPhoto = json => builder.add(JSON.parse(json));

const saveIndex = () =>
  fs
    .writeFileAsync(
      'data/search_index.json',
      JSON.stringify(builder.build().toJSON(), null, 2)
    )
    .then(() => 'Index written');

glob(
  '/Users/mattb/Pictures/Kathy/72157703094568955_772195d13617_part1/photo_*.json'
)
  .then(files =>
    Promise.all(Promise.map(files, f => fs.readFileAsync(f).then(addPhoto)))
  )
  .then(saveIndex)
  .then(console.log);
