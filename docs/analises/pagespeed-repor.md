# Relatório de Análise de Desempenho e Diagnóstico (PageSpeed Insights)

**URL Analisada:** `[https://ltmleo.github.io/praticlimp/](https://ltmleo.github.io/praticlimp/)`

**Dispositivo:** Mobile (Moto G Power emulado)

**Data do Teste:** 24 de outubro de 2026

---

## 1. Resumo das Pontuações

| Categoria | Pontuação | Status |
| --- | --- | --- |
| **Performance** | **73** | Necessita de melhorias |
| **Acessibilidade** | **97** | Excelente |
| **Melhores Práticas** | **100** | Excelente |
| **SEO** | **100** | Excelente |
| **Navegação Agêntica** | **2/2** | Aprovado |

---

## 2. Principais Métricas de Desempenho

* **First Contentful Paint (FCP):** `2,9 s` *(Atraso inicial de renderização)*
* **Largest Contentful Paint (LCP):** `5,0 s` *(Elemento principal demora a carregar)*
* **Total Blocking Time (TBT):** `210 ms` *(Interatividade razoável, com pequenas interrupções)*
* **Cumulative Layout Shift (CLS):** `0,023` *(Estabilidade visual muito boa)*
* **Speed Index (SI):** `3,0 s`

---

## 3. Principais Oportunidades de Melhoria

### A. Otimização e Redimensionamento de Imagens

* **Economia Estimada:** `~203 KiB`
* **Diagnóstico:**
* **Hero Image (`terceirizacao.png`):** Arquivo com `120,4 KiB`. O tamanho original (472x316) está acima do tamanho de exibição no mobile (318x213).
* **Logotipos de parceiros/marcas (`divelp.png`, `metalfarma.png`, `fatex.jpg`, `volcano.png`, `bandini.jpg`):** Estão sendo servidos em dimensões muito maiores do que o tamanho exibido na tela (ex.: imagem de 300x200 exibida em 63x42).


* **Ações Recomendadas:**
* Converter imagens PNG/JPG para formatos modernos e eficientes como **WebP** ou **AVIF**.
* Redimensionar as imagens para as dimensões exatas de exibição ou implementar imagens responsivas (`srcset`).



### B. Recursos de Bloqueio de Renderização

* **Economia Estimada:** `~1.300 ms` no tempo de renderização inicial.
* **Diagnóstico:**
* O arquivo CSS principal (`assets/index--Jt8xmVq.css`) e o carregamento do Google Fonts (`fonts.googleapis.com`) bloqueiam a renderização da página.


* **Ações Recomendadas:**
* Aplicar adiantamento (`preload`) para fontes e CSS críticos.
* Adicionar conexões prévias (`preconnect`) para domínios de terceiros como `fonts.googleapis.com` e `fonts.gstatic.com`.



### C. Redução de JavaScript Não Utilizado e Scripts de Terceiros

* **Economia Estimada:** `~134 KiB`
* **Diagnóstico:**
* O script do **Google Tag Manager** (`gtag/js`) consome `178 KiB` de transferência e adiciona `241 ms` de tempo de execução na *main thread*.
* O bundle JS principal (`assets/index-Bm3tTjUc.js`) possui cerca de `60 KiB` de código não utilizado no carregamento inicial.


* **Ações Recomendadas:**
* Adiante a execução do Google Tag Manager / Analytics para disparar após a interação do usuário ou utilize estratégias de carregamento diferido (`defer` / `async`).
* Aplicar *code-splitting* ou *tree-shaking* no pacote JS do projeto.



### D. Política de Cache

* **Diagnóstico:**
* Diversos recursos estáticos (JS, CSS e imagens) estão configurados com um tempo de vida em cache muito curto (`Cache TTL: 10 min`).


* **Ação Recomendada:**
* Configurar cabeçalhos de cache de longa duração (`Cache-Control: max-age=31536000`) para ativos estáticos imutáveis.



---

## 4. Plano de Ação Priorizado

1. **Prioridade Alta:** Converter imagens para `.webp` e ajustar o redimensionamento na tag `<img>` para resolver o gargalo do LCP (5.0s).
2. **Prioridade Média:** Adiar scripts não críticos e otimizar a entrega do CSS para eliminar o bloqueio de renderização de 1,3s.
3. **Prioridade Baixa:** Ajustar cabeçalhos de cache no servidor/hospedagem para melhorar a velocidade em visitas de retorno.