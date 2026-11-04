import { compile } from '@tailwindcss/node';
import fs from 'fs';
import path from 'path';

async function buildCSS() {
  const inputCss = fs.readFileSync('src/app/globals.src.css', 'utf-8');
  console.log('Compiling Tailwind CSS with @tailwindcss/node...');
  
  function scanDir(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(fullPath, files);
      } else if (entry.isFile() && /\.(tsx|ts|js|jsx|html)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const allFiles = scanDir('src');
  console.log(`Scanning ${allFiles.length} source files for class candidates...`);
  
  const candidates = new Set();
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(/[a-zA-Z0-9_\-\/\[\]#:\.%]+/g);
    if (matches) {
      for (const m of matches) candidates.add(m);
    }
  }
  console.log(`Found ${candidates.size} candidate tokens.`);

  const compiler = await compile(inputCss, {
    base: process.cwd(),
    from: path.resolve('src/app/globals.src.css'),
    shouldRewriteUrls: true,
    onDependency: () => {}
  });

  const outputCss = compiler.build(Array.from(candidates));
  console.log(`Generated CSS length: ${outputCss.length} bytes.`);
  fs.writeFileSync('src/app/globals.css', outputCss, 'utf-8');
  console.log('Successfully wrote src/app/globals.css!');
}

async function main() {
  await buildCSS();
  
  if (process.argv.includes('--watch')) {
    console.log('Watching src/ directory for changes...');
    let timeout = null;
    fs.watch('src', { recursive: true }, (eventType, filename) => {
      if (filename && (filename.endsWith('.css') && filename.includes('globals.css'))) {
        return; // Avoid loop
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(`File change detected (${filename}), recompiling CSS...`);
        buildCSS().catch(console.error);
      }, 250);
    });
  }
}

main().catch(err => {
  console.error('Build CSS error:', err);
  process.exit(1);
});
