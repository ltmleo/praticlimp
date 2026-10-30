# Logos de clientes

Coloque aqui o logo original de cada cliente, de preferência SVG ou PNG com fundo transparente e pelo menos 300 px de largura. Use o nome do cliente no arquivo, como `droga-pires.png`.

Depois, rode `npm run logos`. O script gera `public/brand/clientes/<nome>.webp` com até 300 × 156 px, que é o dobro do espaço no cartão. Por fim, informe `logo: 'clientes/<nome>.webp'` no cliente em `src/data/content.ts`.

Os originais ficam nesta pasta para regerar os arquivos quando necessário. A home só carrega os WebP, com carregamento adiado (`loading="lazy"`).
