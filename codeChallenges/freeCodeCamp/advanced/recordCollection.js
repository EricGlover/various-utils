// Setup
var collection = {
  "2548": {
    album: "Slippery When Wet",
    artist: "Bon Jovi",
    tracks: ["Let It Rock", "You Give Love a Bad Name"]
  },
  "2468": {
    album: "1999",
    artist: "Prince",
    tracks: ["1999", "Little Red Corvette"]
  },
  "1245": {
    artist: "Robert Palmer",
    tracks: []
  },
  "5439": {
    album: "ABBA Gold"
  }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
//mutate collection and return it
//rules
//if value is empty delete the prop
//if tracks push onto the array
function updateRecords(id, prop, value) {
  let album = collection[id];

  if (prop === "tracks") {
    if (!album.tracks) album.tracks = [];
    album.tracks.push(value);
  } else {
    album[prop] = value;
  }
  if (value === "") {
    delete album[prop];
  }

  return collection;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");
