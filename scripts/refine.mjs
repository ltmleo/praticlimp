import {readFileSync,writeFileSync} from 'node:fs';
let css=readFileSync('src/styles/global.css','utf8');
css=css.replace(/@media\(min-width:900px\)\{\.hero-copy\{animation:enter[\s\S]*?(?=@media\(max-width:1100px\))/, '');
css=css.replace('.about-copy h2 br:last-of-type{display:none}', '').replace('.contact-copy h2 br:nth-child(2){display:none}', '');
writeFileSync('src/styles/global.css',css);
let app=readFileSync('src/App.tsx','utf8');
app=app.replace('layout initial={{opacity:0}} animate={{opacity:1}}','layout initial={false} animate={{opacity:1}}');
app=app.replace('href="/privacidade"','href="/privacidade/"');
writeFileSync('src/App.tsx',app);
