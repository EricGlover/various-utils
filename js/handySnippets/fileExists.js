//fileName::String => Bool
const fileExists = async file => {
  const util = require("util");
  const fs = require("fs");
  let filePointer;
  const open = util.promisify(fs.open);
  try {
    filePointer = await open(file, "r");
  } catch (err) {
    // console.log("catching error");
    if (err.code === "ENOENT") {
      console.log("file does not exist");
      return false;
    } else {
      // console.log("other error");
      console.error(err);
    }
  }
  //close file if you found one
  const close = util.promisify(fs.close);
  await close(filePointer);
  return true;
};
