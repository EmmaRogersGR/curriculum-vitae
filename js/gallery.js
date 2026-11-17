// Simple lightbox using the native <dialog> element
(function () {
  var dlg = document.getElementById('lightbox');
  if (!dlg || !dlg.showModal) return;
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.thumb'));
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var idx = 0;

  function show(i) {
    idx = (i + thumbs.length) % thumbs.length;
    var t = thumbs[idx];
    img.src = t.getAttribute('data-full');
    img.alt = t.querySelector('img').alt;
    cap.textContent = t.getAttribute('data-cap');
  }
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(i); dlg.showModal(); });
  });
  document.getElementById('lb-prev').addEventListener('click', function () { show(idx - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(idx + 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
