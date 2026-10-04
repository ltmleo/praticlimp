# Cartões de visitas Pratic Limp

Abra `index.html` em Chrome ou Edge para comparar as quatro opções. Use **Abrir e editar** para acessar o HTML de uma proposta.

## Editar

1. Abra **Editar informações** e altere os campos. O QR code acompanha o campo **Destino do QR code**.
2. Clique em **Baixar HTML editado** para salvar uma cópia. As alterações na tela não sobrescrevem o arquivo original e não são salvas ao fechar a janela.
3. Abra a cópia baixada para continuar ou exportar o PDF.

Cada HTML é independente: fontes, logotipo e biblioteca de QR code estão incorporados e funcionam sem internet. O link de comparação pressupõe que `index.html` esteja na mesma pasta, mas não é necessário para editar ou imprimir.

Para editar em código, altere o JSON no bloco `card-config`. O CSS está no próprio arquivo. O nome da empresa no verso é editável; o logotipo permanece o desenho original da Pratic Limp. A descrição tem menos espaço na opção Editorial. Um aviso vermelho identifica conteúdo que ultrapassa a área segura; reduza o texto antes de imprimir. O botão de impressão bloqueia a exportação quando há esse aviso ou destino de QR inválido.

O telefone impresso é editável. Números sem sinal `+` recebem o código brasileiro `55` no link. Para números fora do Brasil, informe `+` seguido do código do país; o QR utiliza exclusivamente o endereço definido no seu próprio campo.

## Exportar e imprimir

- Use **Imprimir / salvar PDF** em Chrome ou Edge e escolha **Salvar como PDF**.
- Escala: **100%**. Margens: **Nenhuma**. Ative **Gráficos de fundo**. Desative **Cabeçalhos e rodapés**.
- O arquivo terá **duas páginas de 96 × 56 mm**: frente primeiro, verso depois.
- Corte final: **90 × 50 mm**, centrado. Sangria: **3 mm por lado**. Conteúdo importante a pelo menos **4 mm do corte**.
- A linha tracejada aparece apenas na prévia. Não há marcas de corte no PDF.
- Não use captura de tela, JPEG, impressão “como imagem” ou ajuste ao papel: isso pode reduzir a nitidez ou alterar as dimensões.
- Os PDFs entregues são de conferência, com texto e formas vetoriais, em RGB. A gráfica deve confirmar gabarito e exigências de cores. Se exigir CMYK ou PDF/X, faça a conversão com o perfil fornecido pela gráfica em ferramenta de pré-impressão; o navegador não garante esses padrões.
- Os PDFs entregues têm página exata de 96 × 56 mm, TrimBox de 90 × 50 mm centrada e BleedBox de 96 × 56 mm. Ao exportar diretamente pelo navegador, pode haver arredondamento de frações de milímetro e ausência dessas caixas; o exportador incluído normaliza as medidas sem rasterizar.
- Para várias unidades ou impressão doméstica em folha A4, a imposição e o registro frente/verso são etapas separadas. Os arquivos entregues contêm uma face por página.
- Confira uma prova física e teste o QR no papel antes da tiragem.

## Fontes e recursos

Paleta do site: azul `#006baa`, azul escuro `#102f43`, verde-lima `#a8cf16`. Logotipo original em SVG, preservando suas próprias cores. Fontes DM Sans (400/600) e Manrope (600/700), sob SIL Open Font License; licenças em `assets/`. QR code preto sobre branco com quatro módulos de margem livre, correção de erros M e endereço `https://wa.me/5519974163336`.

Referências de design: [Adobe: What makes a business card work?](https://www.adobe.com/express/learn/blog/business-card-design-tips). Preparação de cores: [Adobe: Color-managing documents](https://helpx.adobe.com/acrobat/using/color-managing-documents.html).

## Regenerar os arquivos

Na raiz do repositório, execute:

```powershell
node docs/cartao-de-visitas/tools/build.mjs
node docs/cartao-de-visitas/tools/export-pdf.mjs
```

O primeiro comando reconstrói os HTMLs a partir do gerador e dos recursos locais, sobrescrevendo edições feitas diretamente nos arquivos gerados. O segundo exporta os HTMLs atuais com Playwright/Chromium e normaliza as dimensões com Python e `pypdf`. Usa as dependências de desenvolvimento do repositório e requer `pypdf` no Python selecionado. A variável `CARD_PYTHON` permite indicar outro executável Python. Não é necessário executar esses comandos para editar e imprimir um HTML entregue.
