// Script para comparar dois diretórios (estrutura e conteúdo dos arquivos)
// Uso: node compareDirs.js <dir1> <dir2>

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getAllFiles(dir, base = dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(base, fullPath);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllFiles(fullPath, base));
    } else {
      files.push(relPath);
    }
  }
  return files;
}

function md5File(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(data).digest('hex');
}

function compareDirs(dir1, dir2) {
  const files1 = getAllFiles(dir1);
  const files2 = getAllFiles(dir2);

  const onlyIn1 = files1.filter(f => !files2.includes(f));
  const onlyIn2 = files2.filter(f => !files1.includes(f));
  const inBoth = files1.filter(f => files2.includes(f));

  const diffContent = [];
  for (const file of inBoth) {
    const hash1 = md5File(path.join(dir1, file));
    const hash2 = md5File(path.join(dir2, file));
    if (hash1 !== hash2) {
      diffContent.push(file);
    }
  }

  return { onlyIn1, onlyIn2, diffContent };
}

if (require.main === module) {
  const [,, dir1, dir2] = process.argv;
  if (!dir1 || !dir2) {
    console.error('Uso: node compareDirs.js <dir1> <dir2>');
    process.exit(1);
  }
  const result = compareDirs(dir1, dir2);
  console.log('Arquivos só em', dir1, ':', result.onlyIn1);
  console.log('Arquivos só em', dir2, ':', result.onlyIn2);
  console.log('Arquivos diferentes nos dois:', result.diffContent);
}

module.exports = compareDirs;
