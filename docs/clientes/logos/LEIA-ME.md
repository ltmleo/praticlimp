# Logos de clientes

Coloque aqui o logo original de cada cliente, de preferência SVG ou PNG com fundo transparente e pelo menos 300 px de largura. Use o nome do cliente no arquivo, como `droga-pires.png`.

Depois, rode `npm run logos`. O script gera `public/brand/clientes/<nome>.webp` com até 300 × 156 px, que é o dobro do espaço no cartão. O script recorta as margens vazias e, quando o original tem fundo chapado claro (JPG), torna esse fundo transparente; o original não é alterado. Por fim, informe `logo: 'clientes/<nome>.webp'` no cliente em `src/data/content.ts`.

Os originais ficam nesta pasta para regerar os arquivos quando necessário. A home só carrega os WebP, com prioridade baixa (`fetchpriority="low"`). Não use `loading="lazy"`: o carrossel recorta os cartões fora da janela, e os logos só começariam a carregar ao entrar nela.
