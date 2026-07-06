/* ============================================================
   CATÁLOGO — Many Flower Arts
   ============================================================
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA:
     1. Trocar o número do WhatsApp
     2. Adicionar, editar ou remover produtos

   COMO ADICIONAR UM PRODUTO:
     1. Crie uma pasta em  assets/produtos/  com o ID do produto
        (ex.: assets/produtos/DNS_03/)
     2. Coloque as fotos dentro dela (thumb.jpg + outras fotos)
     3. Copie o MODELO no fim deste arquivo, cole antes do  ];
        e preencha os campos.

   IDs seguem o padrão:
     DNS_01, DNS_02... → coleção Dunas
     LYR_01, LYR_02... → coleção Layers
     POP_01, POP_02... → coleção Popcorn
     NLL_01, NLL_02... → sem coleção
   ============================================================ */

// Número do WhatsApp que recebe os pedidos.
// Formato: código do país + DDD + número, só dígitos.
// Exemplo Brasília: "5561999998888"
const WHATSAPP_NUMERO = "5511993533153";

const PRODUTOS = [

  {
    id: "DNS_01",
    nome: "Vaso Duna I",
    colecao: "Dunas",                       // "Dunas", "Layers", "Popcorn" ou "Sem coleção"
    preco: "R$ 120",                        // deixe "" para não mostrar preço
    descricao: "Vaso de bojo amplo com exterior de areia natural, feito à mão.",
    thumb: "assets/produtos/DNS_01/thumb.jpg",
    fotos: [
      "assets/produtos/DNS_01/foto-1.jpg"
    ],
    modelo3d: null,                         // caminho do arquivo .glb, ou null se não tiver
    modelo3dIos: null                       // caminho do arquivo .usdz (iPhone), ou null
  },

  {
    id: "DNS_02",
    nome: "Vaso Duna II",
    colecao: "Dunas",
    preco: "R$ 95",
    descricao: "Formato baixo e largo, textura de areia em tom quente.",
    thumb: "assets/produtos/DNS_02/thumb.jpg",
    fotos: [
      "assets/produtos/DNS_02/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

  {
    id: "LYR_01",
    nome: "Vaso Layers I",
    colecao: "Layers",
    preco: "R$ 140",
    descricao: "Cilindro alto com camadas sobrepostas em tons terrosos.",
    thumb: "assets/produtos/LYR_01/thumb.jpg",
    fotos: [
      "assets/produtos/LYR_01/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

  {
    id: "LYR_02",
    nome: "Vaso Layers II",
    colecao: "Layers",
    preco: "R$ 160",
    descricao: "Ânfora com efeito de camadas, peça única.",
    thumb: "assets/produtos/LYR_02/thumb.jpg",
    fotos: [
      "assets/produtos/LYR_02/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

  {
    id: "POP_01",
    nome: "Vaso Popcorn I",
    colecao: "Popcorn",
    preco: "R$ 110",
    descricao: "Gesso com textura craquelada, acabamento branco natural.",
    thumb: "assets/produtos/POP_01/thumb.jpg",
    fotos: [
      "assets/produtos/POP_01/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

  {
    id: "POP_02",
    nome: "Vaso Popcorn II",
    colecao: "Popcorn",
    preco: "R$ 130",
    descricao: "Cilindro em gesso craquelado, ideal para arranjos secos.",
    thumb: "assets/produtos/POP_02/thumb.jpg",
    fotos: [
      "assets/produtos/POP_02/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

  {
    id: "NLL_01",
    nome: "Vaso Avulso I",
    colecao: "Sem coleção",
    preco: "",
    descricao: "Peça única fora de coleção. Consulte disponibilidade.",
    thumb: "assets/produtos/NLL_01/thumb.jpg",
    fotos: [
      "assets/produtos/NLL_01/foto-1.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  }

];

/* ============================================================
   MODELO PARA COPIAR (novo produto):
   — copie daqui —

  {
    id: "DNS_03",
    nome: "Nome do vaso",
    colecao: "Dunas",
    preco: "R$ 100",
    descricao: "Descrição curta do vaso.",
    thumb: "assets/produtos/DNS_03/thumb.jpg",
    fotos: [
      "assets/produtos/DNS_03/foto-1.jpg",
      "assets/produtos/DNS_03/foto-2.jpg"
    ],
    modelo3d: null,
    modelo3dIos: null
  },

   — até aqui —
   Cole ANTES do  ];  que fecha a lista PRODUTOS.
   Não esqueça a vírgula depois do  }  anterior.
   ============================================================ */
