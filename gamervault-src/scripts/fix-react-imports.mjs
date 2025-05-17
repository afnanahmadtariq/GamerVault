import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to check if a file contains JSX but no React import
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file contains JSX syntax (a very basic check)
    if (content.includes('<') && content.includes('/>') && content.includes('className=')) {
      // Check if React is imported
      const hasReactImport = content.includes("import React") || 
                             content.includes("import * as React") ||
                             content.includes("import { useState") || // React hooks indirectly import React
                             content.includes("import { useEffect");
      
      if (!hasReactImport) {
        console.log(`Adding React import to: ${filePath}`);
        
        // Add React import
        const newContent = `import * as React from 'react';\n\n${content}`;
        fs.writeFileSync(filePath, newContent, 'utf8');
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
}

// Function to recursively process directories
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      processFile(filePath);
    }
  });
}

// Start processing from the components directory
const componentsDir = path.join(__dirname, '..', 'components');
const appDir = path.join(__dirname, '..', 'app');

console.log('Processing components directory...');
processDirectory(componentsDir);

console.log('Processing app directory...');
processDirectory(appDir);

console.log('Done processing files!');
