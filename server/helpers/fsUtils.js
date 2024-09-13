const util = require('util');
const fs = require('fs');

const readFromFile = util.promisify(fs.readFile);


const writeToFile = async (destination, content) => {
  try {
    await fs.promises.writeFile(destination, JSON.stringify(content, null, 4));
    console.info(`\nData written to ${destination}`);
  } catch (err) {
    console.error(err);
  }
};


const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readFromFile,
  writeToFile,
  readAndAppend,
};