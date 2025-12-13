# Windows - Apple HIG 2025

> Resumo acionável das diretrizes de janelas (iPadOS, macOS, visionOS) para o WellWave. Use isto ao desenhar fluxos multi-janela, modais avançados ou quando levar a UI para macOS/iPadOS/visionOS.

## Essenciais (todas as plataformas)
- Priorize layouts fluidos que escalem bem em larguras/alturas variáveis; sempre defina tamanho inicial + limites mínimos/máximos para evitar UI quebrada.
- Abra uma nova janela apenas quando ajuda a multitarefa (ex.: Compose, comparar documentos). Exponha “Abrir em nova janela” via menu/contexto, nunca como padrão automático.
- Use janelas do sistema: não recrie molduras, barras de título ou controles. Mantém comportamento esperado e diferenças de estado (ativa/inativa).
- Evite inventar termos: em texto visível para o usuário, use “janela”.

## Aplicação ao WellWave
- Web/desktop: planeje layouts responsivos que sobrevivam a redimensionamento agressivo (breakpoints para largura mínima das colunas clínicas e preservação de botões críticos). Evite dependência de altura fixa; degrade para scroll.
- Componentes de topo (toolbars) devem reservar espaço para controles de janela no canto líder (ex.: macOS/iPadOS windowed). Desloque botões iniciais ~80px para dentro quando uma janela renderizar controles do sistema.
- Para fluxos que exigem paralelismo (ex.: preencher ficha enquanto consulta histórico), ofereça ação explícita “Abrir em nova janela” em menus de contexto ou ações secundárias.
- Não use barras inferiores para ações críticas; prefira side panels/inspector ou toolbar. Se houver bottom bar, limite a status/contexto leve.
- Plataformas sem suporte de janela (iOS/tvOS/watchOS): mantenha experiência single-window e evite cópias de linguagem sobre “janelas”.

## iPadOS
- Modos: Tela cheia vs. Janela flutuante (resizable). O app precisa suportar múltiplas janelas para usar features como QLPreviewSceneActivationConfiguration.
- Garanta que controles de janela não cubram botões do toolbar: mantenha margem líder livre; reposicione ações iniciais quando window controls aparecerem.
- Permita gesto/ação para abrir conteúdo em nova janela (ex.: pinch em lista de notas → nova janela) ou menu de contexto “Abrir em nova janela”.
- O sistema memoriza tamanho/posição; mantenha layout estável entre sessões.

## macOS
- Estados: main (frente do app), key (ativa, recebe input), inactive. Aparência muda por estado; use aparências do sistema para herdar cores e vibrancy corretos.
- Não personalize controles de janela; deixe o sistema gerir close/minimize/zoom.
- Defina tamanho inicial coerente com o conteúdo (ex.: formulários verticais podem ser mais altos que largos) e limites min/max para não colapsar inputs nem estourar em telas menores.
- Evite concentrar ações essenciais em bottom bars (frequentemente ocultas ao mover/janela). Use barra superior ou inspetores laterais para controles principais.

## visionOS
- Estilos: janela padrão (vidro), plain (sem vidro) e volume (volumétrico). Prefira vidro para UI familiar; use volume para 3D rico.
- Mantenha o fundo de vidro para legibilidade e ligação com o ambiente; remover vidro reduz contraste e coesão.
- Escolha tamanho/forma inicial que minimize espaços vazios; respeite min/max para manter UI usável ao redimensionar.
- Limite profundidade 3D dentro de janelas (o sistema faz clipping). Para conteúdo profundo, use volume.
- Use escala dinâmica por padrão; baseplate glow (v2+) ajuda a indicar limites do volume. Ornaments são opcionais—não sobreponha toolbar/tab bar e use no máximo um extra.

## Checklist de revisão
- A decisão de abrir em nova janela é opcional e motivada por multitarefa/contexto.
- Há min/max size definidos e layout responsivo sem sobreposição de controles do sistema.
- Nenhum controle crítico está em bottom bar; toolbars respeitam a área dos window controls.
- Terminologia nas strings: “janela” (não “scene”/“view”).
- Para visionOS: escolha correta entre janela (UI 2D) vs. volume (3D profundo) e mantenha fundo de vidro ativo.
