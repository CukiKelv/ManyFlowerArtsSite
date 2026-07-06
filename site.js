/* Lógica da página inicial. Não precisa editar este arquivo
   para adicionar produtos — edite apenas js/produtos.js.   */

(function () {
  "use strict";

  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- cenas: troca da palavra ---------- */

  var palavraEl = document.getElementById("cenas-palavra");
  var cenas = Array.prototype.slice.call(document.querySelectorAll(".cena"));
  var pontos = Array.prototype.slice.call(document.querySelectorAll(".rail-ponto"));

  function trocaPalavra(nova, indice) {
    if (palavraEl.textContent === nova) return;
    pontos.forEach(function (p, i) { p.classList.toggle("ativo", i === indice); });
    if (reduzMovimento) {
      palavraEl.textContent = nova;
      return;
    }
    palavraEl.classList.add("trocando");
    setTimeout(function () {
      palavraEl.textContent = nova;
      palavraEl.classList.remove("trocando");
    }, 220);
  }

  if ("IntersectionObserver" in window && palavraEl) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          var i = cenas.indexOf(e.target);
          trocaPalavra(e.target.getAttribute("data-palavra"), i);
        }
      });
    }, { threshold: 0.55 });
    cenas.forEach(function (c) { obs.observe(c); });
  }

  /* ---------- peças em destaque (3 primeiras) ---------- */

  var grade = document.getElementById("destaques-grade");
  if (grade && typeof PRODUTOS !== "undefined") {
    // prioriza produtos com modelo 3D, depois completa com os primeiros
    var com3d = PRODUTOS.filter(function (p) { return p.modelo3d; });
    var sem3d = PRODUTOS.filter(function (p) { return !p.modelo3d; });
    var destaque = com3d.concat(sem3d).slice(0, 3);

    destaque.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "produto-card";
      a.href = "produtos.html?produto=" + encodeURIComponent(p.id);
      a.setAttribute("data-tilt", "");
      a.style.textDecoration = "none";
      a.innerHTML =
        '<img src="' + p.thumb + '" alt="' + p.nome + '" loading="lazy">' +
        '<div class="produto-card-info">' +
          '<p class="produto-card-colecao">' + p.colecao + "</p>" +
          '<p class="produto-card-nome">' + p.nome + "</p>" +
          (p.preco ? '<p class="produto-card-preco">' + p.preco + "</p>" : "") +
          (p.modelo3d ? '<span class="selo-3d">Ver em AR</span>' : "") +
        "</div>";
      grade.appendChild(a);
    });
  }

  /* ---------- CTA WhatsApp ---------- */

  var cta = document.getElementById("cta-whatsapp");
  if (cta && typeof WHATSAPP_NUMERO !== "undefined") {
    var msg = "Olá! Vi o site da Many Flower Arts e gostaria de saber mais sobre os vasos.";
    cta.href = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- tilt 3D nos cards ---------- */

  var podeTilt = !reduzMovimento && window.matchMedia("(hover: hover)").matches;
  if (podeTilt && window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 7,
      speed: 500,
      glare: true,
      "max-glare": 0.12,
      scale: 1.015
    });
  }
})();
