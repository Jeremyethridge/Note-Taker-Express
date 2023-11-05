const util = require('util');
const fs = require('fs');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content you want to write to the file.
 * @returns {Promise<void>} A promise that resolves when the write operation is complete.
 */
const writeToFile = async (destination, content) => {
  try {
    await fs.promises.writeFile(destination, JSON.stringify(content, null, 4));
    console.info(`\nData written to ${destination}`);
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};

/**
 * Function to read data from a given file and append some content
 * @param {object} content The content you want to append to the file.
 * @param {string} file The path to the file you want to save to.
 * @returns {Promise<void>} A promise that resolves when the append operation is complete.
 */
const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};

module.exports = {
  readFromFile,
  writeToFile,
  readAndAppend,
};