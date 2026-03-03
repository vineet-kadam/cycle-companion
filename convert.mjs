import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import babel from '@babel/core';

// Paths to check
const extensions = ['.ts', '.tsx'];
const exclude = ['vite-env.d.ts', '.d.ts'];

const files = globSync('src/**/*.{ts,tsx}');
const rootFiles = globSync('*.{ts,tsx}');
const allFiles = [...files, ...rootFiles];

for (const file of allFiles) {
  if (exclude.some(ex => file.endsWith(ex))) {
    fs.unlinkSync(file); // remove type definitions completely
    console.log(`Removed type definition: ${file}`);
    continue;
  }
  
  const code = fs.readFileSync(file, 'utf-8');
  let result;
  
  try {
    result = babel.transformSync(code, {
      presets: [
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
      ],
      filename: file,
      retainLines: true, // Keep original lines for easy diff
    });
  } catch (err) {
    console.error(`Failed to transform ${file}:`, err.message);
    continue;
  }

  const isTsx = file.endsWith('.tsx');
  const newName = file.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
  
  // Clean up empty import sequences left by erased types
  let cleanCode = result.code.replace(/import {[^}]+} from ['"][^'"]+['"];?/g, match => {
    // If the import strictly had types that got erased, babel might leave an empty {} block.
    // e.g. import {} from 'lucide-react';
    if (match.includes('{}')) return '';
    return match;
  });
  
  fs.writeFileSync(newName, cleanCode);
  if (file !== newName) {
      fs.unlinkSync(file);
      console.log(`Converted ${file} to ${path.basename(newName)}`);
  }
}

console.log('Conversion complete!');
