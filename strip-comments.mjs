import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Regular expression to match all standard HTML comments: <!-- comment -->
  const commentRegex = /<!--[\s\S]*?-->/g;
  content = content.replace(commentRegex, '');
  
  // Clean up any double blank lines caused by removed block comments
  content = content.replace(/\n\s*\n/g, '\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully stripped all HTML comments from production build (dist/index.html)!');
} else {
  console.error('dist/index.html not found. Run astro build first.');
}
