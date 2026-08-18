import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf-8');

const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
const headScriptMatch = html.match(/<head>[\s\S]*?<script>([\s\S]*?)<\/script>/);
const moduleScriptMatch = html.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);

if (!styleMatch || !headScriptMatch || !moduleScriptMatch) {
  console.error('extraction failed', {
    style: !!styleMatch,
    headScript: !!headScriptMatch,
    moduleScript: !!moduleScriptMatch,
  });
  process.exit(1);
}

const out = `<title>CleanSun — Paneles Solares y Cargadores para Autos Eléctricos en Toluca</title>
<style>
${styleMatch[1]}
</style>
<script>
${headScriptMatch[1]}
</script>
<div id="root"></div>
<script type="module">
${moduleScriptMatch[1]}
</script>
`;

fs.writeFileSync('pdf-export/artifact-source.html', out);
console.log('bytes', out.length);
