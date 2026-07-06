# Como adicionar produtos — Many Flower Arts

> Este guia foi escrito para que **qualquer pessoa ou qualquer IA** consiga
> adicionar produtos ao site. Só é preciso editar **UM arquivo**: `js/produtos.js`.
> Nunca é preciso mexer em HTML, CSS ou nos outros arquivos JS.

---

## Regras dos IDs

Cada produto tem um ID no formato `PREFIXO_NÚMERO`:

| Coleção     | Prefixo | Exemplo   |
|-------------|---------|-----------|
| Dunas       | `DNS`   | `DNS_01`  |
| Layers      | `LYR`   | `LYR_01`  |
| Popcorn     | `POP`   | `POP_01`  |
| Sem coleção | `NLL`   | `NLL_01`  |

Use sempre o próximo número livre da coleção (se já existe `DNS_02`, o novo é `DNS_03`).

---

## Passo a passo

### 1. Crie a pasta do produto

Dentro de `assets/produtos/`, crie uma pasta com o ID do produto:

```
assets/produtos/DNS_03/
```

### 2. Coloque os arquivos na pasta

- `thumb.jpg` → foto principal (aparece no catálogo). Ideal: vertical, ~900×1100.
- `foto-1.jpg`, `foto-2.jpg`... → fotos extras (quantas quiser).
- `modelo.glb` → modelo 3D **(opcional)**. É esse arquivo que ativa o botão "Ver em 3D / AR".
- `modelo.usdz` → versão do modelo 3D para iPhone **(opcional)**.

### 3. Adicione o produto em `js/produtos.js`

Abra `js/produtos.js`, encontre a lista `PRODUTOS = [ ... ]` e cole este bloco
**antes do `];` final**, preenchendo os campos:

```js
  {
    id: "DNS_03",
    nome: "Nome do vaso",
    colecao: "Dunas",
    preco: "R$ 100",
    descricao: "Descrição curta do vaso.",
    thumb: "assets/produtos/DNS_03/thumb.jpg",
    fotos: [
      "assets/produtos/DNS_03/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },
```

**Atenção aos detalhes:**
- `colecao` só aceita: `"Dunas"`, `"Layers"`, `"Popcorn"` ou `"Sem coleção"`.
- `preco`: pode deixar `""` (vazio) para não mostrar preço.
- `modelo3d`: se tiver modelo 3D, troque `null` por `"assets/produtos/DNS_03/modelo.glb"`.
- Não esqueça a **vírgula** depois do `}` do produto anterior.

### 4. Pronto

O site monta tudo sozinho: o card no catálogo, o filtro por coleção,
o modal com fotos, o botão de AR (se tiver modelo 3D) e a mensagem
do WhatsApp com o nome e código do vaso.

---

## Trocar o número do WhatsApp

No topo de `js/produtos.js`:

```js
const WHATSAPP_NUMERO = "5561900000000";
```

Formato: código do país (55) + DDD + número, **só dígitos, sem espaços**.
Exemplo: `(61) 99999-8888` vira `"5561999998888"`.

---

## Trocar as fotos das cenas da home

As 4 imagens de fundo da abertura ("Transforme sua casa / seu evento / sua festa / seu jardim")
estão em `assets/cenas/`:

| Arquivo        | Cena                 |
|----------------|----------------------|
| `casa.jpg`     | interior de casa     |
| `sinagoga.jpg` | altar de sinagoga    |
| `salao.jpg`    | salão de festas      |
| `jardim.jpg`   | jardim               |

Para trocar, basta substituir o arquivo mantendo o **mesmo nome**.
Ideal: fotos horizontais, ~1600×1000 ou maiores, com um vaso da coleção no ambiente.
As imagens atuais são placeholders — troque por fotos reais quando tiver.

---

## Remover um produto

Apague o bloco `{ ... },` dele em `js/produtos.js`. A pasta de fotos pode
ficar ou ser apagada, tanto faz.

## Publicar no GitHub Pages

O site é 100% estático (HTML + CSS + JS puro). Basta subir a pasta inteira
para um repositório e ativar o GitHub Pages nas configurações
(Settings → Pages → branch `main`, pasta `/root`).

> **Importante para o AR:** o AR do `model-viewer` só funciona em site com
> **HTTPS** — o GitHub Pages já resolve isso automaticamente.
