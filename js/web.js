/* Fermat Òptics — l'únic JavaScript de la web.
   Dues coses, totes dues opcionals: si el fitxer no carrega, la pàgina
   segueix funcionant igual (el carrusel el mou el CSS i els vídeos van sols).
   Es carrega amb defer des d'index.html i serveis.html. */

(function () {
  'use strict';

  var senseMoviment = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Qui ha demanat menys moviment al sistema veu el fotograma fix
        en comptes del vídeo en bucle. */
  if (senseMoviment) {
    var clips = document.querySelectorAll('.mosaic__clip');
    for (var i = 0; i < clips.length; i++) {
      clips[i].removeAttribute('autoplay');
      clips[i].pause();
    }
  }

  /* 2. Els vídeos només es reprodueixen quan es veuen. Descodificar vídeo
        mentre fas scroll per una altra part de la pàgina fa saltar l'scroll,
        i a més gasta bateria per res. */
  if (!senseMoviment && 'IntersectionObserver' in window) {
    var vigilant = new IntersectionObserver(function (entrades) {
      for (var j = 0; j < entrades.length; j++) {
        var video = entrades[j].target;
        if (entrades[j].isIntersecting) {
          var promesa = video.play();
          if (promesa && promesa.catch) { promesa.catch(function () {}); }
        } else if (!video.paused) {
          video.pause();
        }
      }
    }, { threshold: 0.15 });

    var videos = document.querySelectorAll('.mosaic__clip');
    for (var k = 0; k < videos.length; k++) {
      vigilant.observe(videos[k]);
    }
  }

  /* 3. Paral·laxi de la foto del mosaic. Només movem un transform, i només
        mentre la cel·la es veu, dins de requestAnimationFrame. */
  var cel = document.querySelector('.mosaic__foto');
  var foto = cel && cel.querySelector('img');

  if (foto && !senseMoviment && 'IntersectionObserver' in window) {
    var visible = false;
    var demanat = false;
    var RECORREGUT = 60; /* píxels que es desplaça la foto, de dalt a baix */

    function situa() {
      demanat = false;
      var caixa = cel.getBoundingClientRect();
      var centre = caixa.top + caixa.height / 2;
      /* -1 quan la cel·la entra per baix, +1 quan surt per dalt */
      var avanc = (centre - window.innerHeight / 2) / window.innerHeight;
      avanc = Math.max(-1, Math.min(1, avanc));
      foto.style.transform = 'translate3d(0,' + (avanc * RECORREGUT).toFixed(1) + 'px,0)';
    }

    function apunta() {
      if (!demanat && visible) {
        demanat = true;
        window.requestAnimationFrame(situa);
      }
    }

    new IntersectionObserver(function (entrades) {
      visible = entrades[0].isIntersecting;
      if (visible) { situa(); }
    }).observe(cel);

    window.addEventListener('scroll', apunta, { passive: true });
    window.addEventListener('resize', apunta, { passive: true });
    situa();
  }

  /* 4. Franja de cartells: canvi automàtic cada 10 s i fletxes per passar-ne
        un. Sense JavaScript la rotació la continua fent el CSS; el que aporta
        això són les fletxes i reiniciar el comptador quan s'hi clica. */
  var faixa = document.querySelector('.faixa-slider');
  if (!faixa) return;

  var fotos = faixa.querySelectorAll('.faixa-slider__foto');
  var enrere = faixa.querySelector('.faixa-slider__fletxa--enrere');
  var endavant = faixa.querySelector('.faixa-slider__fletxa--endavant');
  if (fotos.length < 2 || !enrere || !endavant) return;

  var actual = 0;
  var comptador;

  faixa.setAttribute('data-js', '');
  fotos[0].classList.add('es-veu');

  function mostra(i) {
    fotos[actual].classList.remove('es-veu');
    actual = (i + fotos.length) % fotos.length;
    fotos[actual].classList.add('es-veu');
  }

  function arrenca() {
    clearInterval(comptador);
    if (senseMoviment) return;
    comptador = setInterval(function () { mostra(actual + 1); }, 10000);
  }

  enrere.addEventListener('click', function () {
    mostra(actual - 1);
    arrenca();
  });

  endavant.addEventListener('click', function () {
    mostra(actual + 1);
    arrenca();
  });

  arrenca();
})();
