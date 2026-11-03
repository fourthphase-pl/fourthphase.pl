/* Zachowanie strony: formularz wyceny, zgoda na cookies i Microsoft Clarity.
   Teksty strony są w index.html. Ten plik nie wymaga zmian przy edycji treści. */
(function(){
  var CFG = window.FP_CONFIG || {};
  var $ = function(id){ return document.getElementById(id); };
  var KEY_OK = function(v){ return v && v.indexOf('WKLEJ_') !== 0; };

  /* ===== Formularz wyceny ===== */
  var form = $('quote');
  if (form) {
    var submit = $('q-submit'), err = $('q-error');
    var val = function(id){ return (($(id).value) || '').trim(); };
    var check = function(el, ok, msg){
      if (ok) { el.removeAttribute('invalid'); } else { el.setAttribute('invalid', ''); el.setAttribute('invalid-text', msg); }
      return ok;
    };
    var showError = function(text){ err.textContent = text; err.hidden = false; };
    var done = function(){ form.hidden = true; $('q-ok').hidden = false; $('q-ok').scrollIntoView({block:'center'}); };

    submit.addEventListener('click', function(){
      var a = check($('q-name'), val('q-name') !== '', 'Wpisz imię i nazwisko');
      var b = check($('q-company'), val('q-company') !== '', 'Wpisz nazwę firmy');
      var c = check($('q-email'), /^\S+@\S+\.\S+$/.test(val('q-email')), 'Wpisz poprawny adres e-mail');
      var d = check($('q-msg'), val('q-msg') !== '', 'Opisz krótko, czego dotyczy zapytanie');
      if (!(a && b && c && d)) { showError('Uzupełnij zaznaczone pola.'); return; }
      err.hidden = true;

      // Pole-pułapka dla botów: człowiek go nie widzi, więc nie zaznaczy.
      if (form.querySelector('[name=botcheck]').checked) { done(); return; }

      if (!KEY_OK(CFG.formAccessKey)) {
        showError('Formularz nie jest jeszcze uruchomiony. Napisz na biuro@fourthphase.pl albo zadzwoń: +48 667 296 405.');
        return;
      }

      submit.setAttribute('disabled', '');
      var label = submit.textContent; submit.textContent = 'Wysyłanie…';
      fetch(CFG.formEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
          access_key: CFG.formAccessKey,
          subject: 'Zapytanie o wycenę ze strony fourthphase.pl',
          from_name: 'Formularz fourthphase.pl',
          name: val('q-name'),
          company: val('q-company'),
          email: val('q-email'),
          phone: val('q-phone'),
          message: val('q-msg')
        })
      }).then(function(r){ return r.json().then(function(j){ return {ok: r.ok && j.success, j: j}; }); })
        .then(function(res){
          if (res.ok) { done(); return; }
          throw new Error((res.j && res.j.message) || 'Błąd wysyłki');
        })
        .catch(function(){
          showError('Nie udało się wysłać zapytania. Spróbuj ponownie albo napisz na biuro@fourthphase.pl, ewentualnie zadzwoń: +48 667 296 405.');
        })
        .then(function(){ submit.removeAttribute('disabled'); submit.textContent = label; });
    });
  }

  /* ===== Zgoda na cookies i Microsoft Clarity ===== */
  var STORE = 'fp-cookies';
  var read = function(){ try { return localStorage.getItem(STORE); } catch (e) { return null; } };
  var write = function(v){ try { localStorage.setItem(STORE, v); } catch (e) {} };
  var BANNER = '<div class="wrap in"><p>Zbieramy statystyki odwiedzin, żeby ulepszać stronę. Robimy to tylko za Waszą zgodą, a strona działa tak samo, jeśli odmówicie. Więcej w <a href="polityka-prywatnosci.html#cookies">polityce prywatności</a>.</p>' +
    '<div class="acts"><cds-button id="cookie-reject" kind="tertiary">Odrzucam</cds-button><cds-button id="cookie-accept" kind="tertiary">Akceptuję</cds-button></div></div>';
  function makeBanner(){
    var d = document.createElement('div');
    d.className = 'cookie'; d.id = 'cookie-banner'; d.hidden = true;
    d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Pliki cookies');
    d.innerHTML = BANNER;
    document.body.appendChild(d);
    return d;
  }
  var banner = makeBanner();

  function loadClarity(){
    if (!KEY_OK(CFG.clarityId) || window.__fpClarity) return;
    window.__fpClarity = true;
    (function(c, l, a, r, i, t, y){
      c[a] = c[a] || function(){ (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CFG.clarityId);
    window.clarity('consentv2', {ad_Storage: 'denied', analytics_Storage: 'granted'});
  }
  function stopClarity(){
    if (window.clarity) { window.clarity('consent', false); }
  }
  function decide(v){
    write(v);
    banner.hidden = true;
    if (v === 'granted') loadClarity(); else stopClarity();
  }

  $('cookie-accept').addEventListener('click', function(){ decide('granted'); });
  $('cookie-reject').addEventListener('click', function(){ decide('denied'); });
  var reopen = $('cookie-settings');
  if (reopen) reopen.addEventListener('click', function(){ banner.hidden = false; });
  var saved = read();
  if (saved === 'granted') loadClarity();
  else if (saved !== 'denied') banner.hidden = false;
})();

/* ===== Delikatne animacje: pojawianie się sekcji przy przewijaniu i cień górnego paska ===== */
(function(){
  // cień pod górnym paskiem po przewinięciu strony
  var head = document.querySelector('.site-head');
  if (head) {
    var waiting = false;
    var update = function(){ head.classList.toggle('scrolled', window.scrollY > 8); waiting = false; };
    window.addEventListener('scroll', function(){ if (!waiting) { waiting = true; requestAnimationFrame(update); } }, {passive: true});
    update();
  }

  // pojawianie się bloków: tylko gdy przeglądarka to obsługuje i użytkownik nie wyłączył ruchu
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var SELECTOR = '.head, .cols4 > .audience, .audience-cta, .cols2 > *, .band .in > *, footer .in > *';
  var seen = [];
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -6% 0px'});

  Array.prototype.forEach.call(document.querySelectorAll(SELECTOR), function(el){
    if (seen.indexOf(el) !== -1) return;
    seen.push(el);
    // to, co już jest widoczne po wejściu na stronę, zostaje bez zmian (bez migotania)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    // kolejne elementy w tym samym rzędzie pojawiają się z krótkim opóźnieniem
    var n = 0, s = el.previousElementSibling;
    while (s && n < 4) { n++; s = s.previousElementSibling; }
    el.style.setProperty('--d', (n * 90) + 'ms');
    el.classList.add('reveal');
    io.observe(el);
  });
})();
