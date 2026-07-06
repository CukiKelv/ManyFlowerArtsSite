/* Lógica da página de produtos. Não precisa editar este arquivo
   para adicionar produtos — edite apenas js/produtos.js.       */

(function () {
  "use strict";

  var grade = document.getElementById("catalogo-grade");
  var filtros = document.getElementById("filtros");
  var vazio = document.getElementById("catalogo-vazio");

  var modal = document.getElementById("modal");
  var modalFundo = document.getElementById("modal-fundo");
  var modalFechar = document.getElementById("modal-fechar");
  var modalVisor = document.getElementById("modal-visor");
  var modalThumbs = document.getElementById("modal-thumbs");
  var modalColecao = document.getElementById("modal-colecao");
  var modalNome = document.getElementById("modal-nome");
  var modalId = document.getElementById("modal-id");
  var modalPreco = document.getElementById("modal-preco");
  var modalDescricao = document.getElementById("modal-descricao");
  var modalComprar = document.getElementById("modal-comprar");
  var modalVer3d = document.getElementById("modal-ver3d");
  var modalDicaAr = document.getElementById("modal-dica-ar");

  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var produtoAberto = null;
  var visor3dLigado = false;

  /* ---------- filtros ---------- */

  var ORDEM = ["Dunas", "Layers", "Popcorn", "Sem coleção"];
  var colecoesExistentes = ORDEM.filter(function (c) {
    return PRODUTOS.some(function (p) { return p.colecao === c; });
  });
  var abas = ["Todas"].concat(colecoesExistentes);
  var abaAtiva = "Todas";

  // permite abrir já filtrado: produtos.html?colecao=Dunas
  var params = new URLSearchParams(window.location.search);
  var colecaoUrl = params.get("colecao");
  if (colecaoUrl && abas.indexOf(colecaoUrl) !== -1) abaAtiva = colecaoUrl;

  function desenhaFiltros() {
    filtros.innerHTML = "";
    abas.forEach(function (nome) {
      var b = document.createElement("button");
      b.className = "filtro-pill" + (nome === abaAtiva ? " ativo" : "");
      b.type = "button";
      b.textContent = nome;
      b.addEventListener("click", function () {
        abaAtiva = nome;
        desenhaFiltros();
        desenhaGrade();
      });
      filtros.appendChild(b);
    });
  }

  /* ---------- grade de produtos ---------- */

  function desenhaGrade() {
    grade.innerHTML = "";
    var lista = PRODUTOS.filter(function (p) {
      return abaAtiva === "Todas" || p.colecao === abaAtiva;
    });
    vazio.hidden = lista.length > 0;

    lista.forEach(function (p) {
      var card = document.createElement("button");
      card.className = "produto-card";
      card.type = "button";
      card.setAttribute("data-tilt", "");
      card.innerHTML =
        '<img src="' + p.thumb + '" alt="' + p.nome + '" loading="lazy">' +
        '<div class="produto-card-info">' +
          '<p class="produto-card-colecao">' + p.colecao + "</p>" +
          '<p class="produto-card-nome">' + p.nome + "</p>" +
          (p.preco ? '<p class="produto-card-preco">' + p.preco + "</p>" : "") +
          (p.modelo3d ? '<span class="selo-3d">Ver em AR</span>' : "") +
        "</div>";
      card.addEventListener("click", function () { abreModal(p); });
      grade.appendChild(card);
    });

    var podeTilt = !reduzMovimento && window.matchMedia("(hover: hover)").matches;
    if (podeTilt && window.VanillaTilt) {
      VanillaTilt.init(grade.querySelectorAll("[data-tilt]"), {
        max: 7, speed: 500, glare: true, "max-glare": 0.12, scale: 1.015
      });
    }
  }

  /* ---------- modal ---------- */

  function linkWhatsApp(p) {
    var msg = "Olá! Tenho interesse no vaso " + p.nome + " (" + p.id + ")" +
              (p.preco ? " — " + p.preco : "") + ". Ele está disponível?";
    return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg);
  }

  function mostraFoto(src) {
    visor3dLigado = false;
    modalVer3d.classList.remove("ativo");
    modalVer3d.textContent = "Ver em 3D / AR";
    modalDicaAr.hidden = true;
    modalVisor.innerHTML = "";
    var img = document.createElement("img");
    img.src = src;
    img.alt = modalNome.textContent;
    modalVisor.appendChild(img);
    Array.prototype.forEach.call(modalThumbs.children, function (b) {
      b.classList.toggle("ativo", b.getAttribute("data-src") === src);
    });
  }

  function mostra3d(p) {
    visor3dLigado = true;
    modalVer3d.classList.add("ativo");
    modalVer3d.textContent = "Voltar às fotos";
    modalDicaAr.hidden = false;
    modalVisor.innerHTML = "";
    var mv = document.createElement("model-viewer");
    mv.setAttribute("src", p.modelo3d);
    if (p.modelo3dIos) mv.setAttribute("ios-src", p.modelo3dIos);
    mv.setAttribute("alt", "Modelo 3D de " + p.nome);
    mv.setAttribute("ar", "");
    mv.setAttribute("ar-modes", "scene-viewer webxr quick-look");
    mv.setAttribute("camera-controls", "");
    mv.setAttribute("auto-rotate", "");
    mv.setAttribute("shadow-intensity", "1");
    modalVisor.appendChild(mv);
    Array.prototype.forEach.call(modalThumbs.children, function (b) {
      b.classList.remove("ativo");
    });
  }

  function abreModal(p) {
    produtoAberto = p;
    modalColecao.textContent = p.colecao;
    modalNome.textContent = p.nome;
    modalId.textContent = "Cód. " + p.id;
    modalPreco.textContent = p.preco || "";
    modalPreco.hidden = !p.preco;
    modalDescricao.textContent = p.descricao || "";
    modalComprar.href = linkWhatsApp(p);
    modalVer3d.hidden = !p.modelo3d;

    // galeria: thumb + fotos extras, sem repetir
    var fotos = [p.thumb].concat(p.fotos || []).filter(function (f, i, arr) {
      return f && arr.indexOf(f) === i;
    });
    modalThumbs.innerHTML = "";
    fotos.forEach(function (src) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-src", src);
      b.innerHTML = '<img src="' + src + '" alt="">';
      b.addEventListener("click", function () { mostraFoto(src); });
      modalThumbs.appendChild(b);
    });
    modalThumbs.style.display = fotos.length > 1 || p.modelo3d ? "" : "none";

    mostraFoto(fotos[0]);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalFechar.focus();
  }

  function fechaModal() {
    modal.hidden = true;
    produtoAberto = null;
    document.body.style.overflow = "";
    modalVisor.innerHTML = "";
  }

  modalVer3d.addEventListener("click", function () {
    if (!produtoAberto) return;
    if (visor3dLigado) {
      mostraFoto(produtoAberto.thumb);
    } else {
      mostra3d(produtoAberto);
    }
  });

  modalFundo.addEventListener("click", fechaModal);
  modalFechar.addEventListener("click", fechaModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) fechaModal();
  });

  /* ---------- inicia ---------- */

  desenhaFiltros();
  desenhaGrade();

  // permite abrir direto um produto: produtos.html?produto=DNS_01
  var idUrl = params.get("produto");
  if (idUrl) {
    var alvo = PRODUTOS.filter(function (p) { return p.id === idUrl; })[0];
    if (alvo) abreModal(alvo);
  }
})();
