const fs = require('fs');
const path = require('path');

const projectFolderPath = 'C:/Users/babar/Documents/meteor-master'; // Replace with your project folder path
const outputFilePath = './extractedText.csv';

const regex = /{__\('([^']+)'\)}/g;

const extractedText = [];

function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    extractedText.push(match[1]);
  }
}

function traverseDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        processFile(filePath);
      }
    } else if (stats.isDirectory() && file !== 'node_modules') {
      traverseDirectory(filePath);
    }
  });
}

if (!fs.existsSync(projectFolderPath)) {
  console.error(`The specified folder '${projectFolderPath}' does not exist.`);
  process.exit(1);
}

traverseDirectory(projectFolderPath);

const csvContent = extractedText.join('\n');
fs.writeFileSync(outputFilePath, csvContent, 'utf8');
console.log('Text extracted and saved in CSV format.');
