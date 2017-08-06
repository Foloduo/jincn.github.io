var sectionHeight = function () {
  var total = $(window).height(),
    $section = $('section').css('height', 'auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height', 'auto');
  }
}

$(window).resize(sectionHeight);

$(document).ready(function () {
  draw();

  function isChinese(text) {
    var re = /[^\u4e00-\u9fa5]/;
    if (re.test(text)) return false;
    return true;
  }

  function dealAnchor(text) {
    return isChinese(text)
      ? encodeURI(text).replace(/ /g, '-')
      : formatStr(text.toLowerCase())
  }

  function formatStr(str) {
    return str.replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }

  $("section h1, section h2").each(function () {
    var anchor = dealAnchor($(this).text());
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + anchor + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id", anchor.replace(/[^\w-]+/g, '').toLowerCase());
    $("nav ul li:first-child a").parent().addClass("active");
  });

  $("nav ul li").on("click", "a", function (event) {
    var position = $('#' + $(this).attr("href").replace(/[^\w-]+/g, '').toLowerCase()).offset().top - 190;
    $("html, body").animate({ scrollTop: position }, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $('img').load(sectionHeight);
});

fixScale = function (doc) {

  var addEvent = 'addEventListener',
    type = 'gesturestart',
    qsa = 'querySelectorAll',
    scales = [1, 1],
    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }

  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [.25, 1.6];
    doc[addEvent](type, fix, true);
  }
};

function draw() {
  document.addEventListener('touchmove', function (e) {
    e.preventDefault()
  })
  var c = document.getElementsByTagName('canvas')[0],
    x = c.getContext('2d'),
    pr = window.devicePixelRatio || 1,
    w = window.innerWidth,
    h = window.innerHeight,
    f = 90,
    q,
    m = Math,
    r = 0,
    u = m.PI * 2,
    v = m.cos,
    z = m.random
  c.width = w * pr
  c.height = h * pr
  x.scale(pr, pr)
  x.globalAlpha = 0.6
  function i() {
    x.clearRect(0, 0, w, h)
    q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
    while (q[1].x < w + f) d(q[0], q[1])
  }
  function d(i, j) {
    x.beginPath()
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)
    var k = j.x + (z() * 2 - 0.25) * f,
      n = y(j.y)
    x.lineTo(k, n)
    x.closePath()
    r -= u / -50
    x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
    x.fill()
    q[0] = q[1]
    q[1] = { x: k, y: n }
  }
  function y(p) {
    var t = p + (z() * 2 - 1.1) * f
    return (t > h || t < 0) ? y(p) : t
  }
  document.onclick = i
  document.ontouchstart = i
  i()
  setInterval(i, 3000)
}
