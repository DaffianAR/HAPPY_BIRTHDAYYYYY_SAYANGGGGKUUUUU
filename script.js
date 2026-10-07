// ================= EDIT BAGIAN INI =================
const CONFIG = {
  // ---------- PASSWORD (kode saat ini: 112820) ----------
  kodeHash: "eb0336dd1586f9d72136aabc20c729c8243998586e5cced7aa9755650b4f653e",
  petunjuk: "Petunjuk: angka spesial kita 💗",

  // ---------- TEKS ----------
  nama: "SELI OKSTAVIA",
  quote: "jangan lupa dibuka... ada kejutan buat kamu 💗",
  surat:
`Selamat ulang tahun, sayang 🎂

Selamat ulang tahun yaa. Semoga di umur kamu yang sekarang, 
semakin banyak hal baik yang datang ke kamu. Semoga apa yang kamu semogakan satu-satu bisa tercapai, urusan kamu dimudahkan, dan kamu selalu dikelilingi orang-orang yang sayang sama kamu.

Di hari ulang tahun kamu ini, aku cuma berharap kamu bisa selalu bahagia, bukan cuma hari ini, tapi juga di hari-hari berikutnya. Kalau nanti ada hari yang berat, semoga kamu selalu punya alasan buat bertahan dan tetap tersenyum.

Aku juga mau bilang makasih karena selama ini kamu udah hadir di hidup aku. Makasih udah selalu berusaha ngerti aku, perhatian sama aku, dan nemenin aku di banyak hal. Mungkin aku nggak selalu bisa nunjukin semuanya dengan cara yang sempurna, tapi aku bener-bener bersyukur bisa kenal dan punya kamu.

Semoga kita juga bisa terus punya banyak cerita, banyak momen kecil yang nantinya bisa kita inget bareng-bareng. Aku seneng bisa jadi salah satu orang yang bisa nemenin kamu sampai sejauh ini.

I love you, today and always 💕`,

  // ---------- TANDA TANGAN DI SURAT ----------
  tandaTangan: "foto/ttd.png",
  ttdTeks: "Dengan cinta,",

  // ---------- LAGU ----------
  lagu: "lagu.mp3",
  judulLagu: "Judul Lagu",
  artis: "Nama Artis",
  cover: "foto/cover.jpg",

  // ---------- PUZZLE ----------
  fotoPuzzle: "foto/puzzle.jpg",

  // ---------- BACKGROUND (satu file untuk tiap halaman) ----------
  // Kalau file halaman tertentu tidak ada, otomatis memakai "default".
  latar: {
    default: "foto/bg.jpg",
    gate:   "foto/bg-kode.jpg",    // halaman kode rahasia
    cerita: "foto/bg-cerita.jpg",  // halaman hai, siap buka, dst
    intro:  "foto/bg-intro.jpg",   // halaman Happy Birthday
    menu:   "foto/bg-menu.jpg",    // halaman pilih hadiah
    surat:  "foto/bg-surat.jpg",   // (tertutup kertas surat)
    bunga:  "foto/bg-bunga.jpg",   // halaman Bunga
    foto:   "foto/bg-foto.jpg"     // halaman Foto
  },
  gelapLatar: 0.5,   // 0 = foto latar terang apa adanya, 1 = sangat gelap

  // ---------- HALAMAN BUNGA ----------
  fotoBunga: ["foto/bunga1.jpg", "foto/bunga2.jpg", "foto/bunga3.jpg", "foto/bunga4.jpg"],
  buket: "foto/buket.png",   // gambar buket (ganti sesukamu)
  ukuranBuket: 52,           // tinggi buket dalam % layar (naikkan = lebih besar, contoh 60)
  buketBingkai: true,        // true = ada bingkai putih, false = tanpa bingkai (cocok untuk PNG transparan)
  bungaTransisi: [],         // kosong = emoji. Contoh: ["foto/mawar1.png", "foto/mawar2.png"]

  // ---------- HALAMAN FOTO ----------
  foto: ["foto/1.jpg", "foto/2.jpg", "foto/3.jpg", "foto/4.jpg", "foto/5.jpg", "foto/6.jpg","foto/7.jpg", "foto/8.jpg", "foto/9.jpg", "foto/10.jpg", "foto/11.jpg", "foto/12.jpg","foto/13.jpg", "foto/14.jpg", "foto/15.jpg","foto/16.jpg", "foto/17.jpg", "foto/18.jpg", "foto/19.jpg", "foto/20.jpg", "foto/21.jpg"],
  video: "foto/video.mp4",                 // video atas (landscape)
  videoPotret: "foto/video-potret.mp4",    // video paling bawah (potret)

  // ---------- LAYAR CERITA SETELAH PASSWORD ----------
  cerita: [
    { emoji: "🐱", teks: "Hai, cantik 👋", tombol: "ketuk sini <3" },
    { emoji: "🧸", teks: "Kamu sudah siap buka ini?", pilihan: ["Iya", "Nggak"] },
    { emoji: "🎉", teks: "Hari ini adalah harinya cewek paling cantik sedunia!! Selamat ulang tahun, sayangku 🤍", tombol: "buka <3" },
    { emoji: "💐", teks: "Selamat ulang tahun untuk pacarku yang paling cantik, penyayang, dan perhatian. Aku sayang kamu banyak banget!!", tombol: "Aku punya sesuatu buat kamu 🎁" },
    { emoji: "💌", teks: "Oke, yang terakhir. Aku bikin sesuatu buat ulang tahunmu, bacanya pelan-pelan yaa", tombol: "<3" }
  ]
};
// ===================================================

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const fase = f => document.documentElement.dataset.fase = f;
const cekFoto = src => new Promise(r => { const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false); i.src = src; });
const cache = {}, ada = s => s ? (cache[s] ??= cekFoto(s)) : Promise.resolve(false);

document.documentElement.style.setProperty('--gelap', CONFIG.gelapLatar);
document.documentElement.style.setProperty('--tb', CONFIG.ukuranBuket);

// ---------- musik ----------
const lagu = $('#lagu');
let manualPause = false;
lagu.src = CONFIG.lagu; lagu.volume = 1;
const fmt = t => isFinite(t) ? `${t / 60 | 0}:${String(t % 60 | 0).padStart(2, '0')}` : '0:00';
function mulaiMusik() { if (lagu.paused && !manualPause) lagu.play().catch(() => {}); }
function bukaKunciAudio() {   // dipanggil saat ketukan pertama agar HP mengizinkan suara
  lagu.muted = true;
  lagu.play().then(() => { lagu.pause(); lagu.currentTime = 0; lagu.muted = false; }).catch(() => { lagu.muted = false; });
}
lagu.onerror = () => $('#art').textContent = '⚠ File lagu tidak ditemukan: ' + CONFIG.lagu;
lagu.onplay = () => $('#playBtn').textContent = '❚❚';
lagu.onpause = () => $('#playBtn').textContent = '▶';
lagu.onloadedmetadata = () => $('#t2').textContent = fmt(lagu.duration);
lagu.ontimeupdate = () => {
  $('#prog').style.width = (lagu.currentTime / (lagu.duration || 1) * 100) + '%';
  $('#t1').textContent = fmt(lagu.currentTime);
};
$('#playBtn').onclick = () => {
  if (lagu.paused) { manualPause = false; lagu.play().catch(() => { $('#art').textContent = '⚠ Lagu belum bisa diputar, cek file ' + CONFIG.lagu; }); }
  else { manualPause = true; lagu.pause(); }
};
$('#prev').onclick = () => lagu.currentTime = 0;
$('#next').onclick = () => lagu.currentTime = Math.min(lagu.duration || 0, lagu.currentTime + 10);
$('#bar').onclick = e => {
  const r = e.currentTarget.getBoundingClientRect();
  if (lagu.duration) lagu.currentTime = (e.clientX - r.left) / r.width * lagu.duration;
};

// ---------- isi konten ----------
$('#nama').textContent = CONFIG.nama;
$('#quote').textContent = CONFIG.quote;
$('#petunjuk').textContent = CONFIG.petunjuk;
$('#jdl').textContent = CONFIG.judulLagu;
$('#art').textContent = CONFIG.artis;

// tanda tangan di surat (kotak disembunyikan kalau filenya belum ada)
$('#ttdTeks').textContent = CONFIG.ttdTeks;
const tt = $('#ttd'); tt.onerror = () => $('#ttdBox').style.display = 'none'; tt.src = CONFIG.tandaTangan;

// 4 foto di halaman Bunga
$$('img[data-bunga]').forEach(img => {
  img.onerror = () => { img.removeAttribute('src'); img.parentElement.classList.add('kosong'); };
  img.src = CONFIG.fotoBunga[+img.dataset.bunga];
});
// gambar buket
const bk = $('#buket');
bk.classList.toggle('polos', !CONFIG.buketBingkai);
bk.onerror = () => bk.removeAttribute('src');
bk.src = CONFIG.buket;
// cover lagu
$('#cover').onerror = e => e.target.removeAttribute('src');
ada(CONFIG.cover).then(ok => $('#cover').src = ok ? CONFIG.cover : CONFIG.foto[0]);

// hiasan mawar di tepi halaman foto
$$('.tepi').forEach(t => t.innerHTML = '<svg viewBox="0 0 100 100"><use href="#rose"/></svg>'.repeat(14));

// galeri foto: bingkai selalu tampil, walau fotonya belum ada
CONFIG.foto.forEach((src, i) => {
  const d = document.createElement('div'); d.className = 'pol';
  d.style.setProperty('--r', ((i % 2 ? 1 : -1) * (2 + Math.random() * 4)).toFixed(1) + 'deg');
  const im = new Image(); im.alt = '';
  im.onerror = () => { im.remove(); d.classList.add('kosong'); };
  im.src = src; d.appendChild(im); $('#sebar').appendChild(d);
});

// dua video: atas (landscape) dan bawah (potret)
[['#vid', '#vwrap', CONFIG.video], ['#vid2', '#vwrap2', CONFIG.videoPotret]].forEach(([v, w, src]) => {
  const el = $(v);
  el.onerror = () => $(w).classList.add('kosong');
  el.src = src;
  el.onplay = () => { lagu.pause(); $$('video').forEach(o => { if (o !== el) o.pause(); }); };
});

// foto diperbesar saat diketuk
document.addEventListener('click', e => {
  const im = e.target.closest('.pol img, .polaroid img, .buket-img');
  if (im && im.getAttribute('src')) { $('#lb img').src = im.src; $('#lb').classList.add('on'); }
});
$('#lb').onclick = () => $('#lb').classList.remove('on');

// ---------- latar foto per halaman ----------
async function setLatar(id) {
  const bg = $('#bg-foto');
  for (const s of [CONFIG.latar[id], CONFIG.latar.default]) {
    if (await ada(s)) { bg.style.backgroundImage = `url(${s})`; bg.classList.add('ada'); return; }
  }
  bg.style.backgroundImage = 'none'; bg.classList.remove('ada');
}

// ---------- pindah layar ----------
function go(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  if (id !== 'gift' && id !== 'puzzle') setLatar(id);
  if (id !== 'foto') $$('video').forEach(v => v.pause());
  if (id === 'surat') ketik();
  if (!['gift', 'puzzle', 'gate'].includes(id)) mulaiMusik();
}
$$('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));

// ---------- transisi bunga ----------
let bungaOK = [];
Promise.all((CONFIG.bungaTransisi || []).map(s => ada(s).then(ok => ok && s))).then(r => bungaOK = r.filter(Boolean));

function transisiBunga(tengah) {
  const o = document.createElement('div'); o.className = 'mawar';
  const emoji = ['🌹', '🌷', '🌸', '🌺', '🪷', '🌹', '🌷'];
  const cols = 4, cw = innerWidth / cols, rows = Math.ceil(innerHeight / cw) + 1;
  const lapis = [{ k: 'l0', u: 1.4, lewati: 0 }, { k: 'l1', u: 1.8, lewati: 0 }, { k: 'l2', u: 2.6, lewati: .5 }];
  lapis.forEach(L => {
    const wadah = document.createElement('div'); wadah.className = 'lapis ' + L.k;
    for (let r = 0; r < rows; r++) for (let c = 0; c <= cols; c++) {
      if (Math.random() < L.lewati) continue;
      const u = cw * L.u * (.85 + Math.random() * .3);
      const x = c * cw + (Math.random() - .5) * cw * .6, y = r * cw - cw / 2 + (Math.random() - .5) * cw * .6;
      const e = document.createElement('span');
      if (bungaOK.length) e.innerHTML = `<img src="${bungaOK[Math.random() * bungaOK.length | 0]}" alt="">`;
      else e.textContent = emoji[Math.random() * emoji.length | 0];
      e.style.cssText = `left:${x}px;top:${y}px;width:${u}px;height:${u}px;font-size:${u * .85}px;--dx:${(x - innerWidth / 2) * 1.6}px;--dy:${(y - innerHeight / 2) * 1.6}px;--d2:${(Math.random() * .7).toFixed(2)}s;--r:${Math.random() * 80 - 40}deg`;
      wadah.appendChild(e);
    }
    o.appendChild(wadah);
  });
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('i'); p.className = 'kelopak';
    p.textContent = ['🌸', '🌸', '🪷'][Math.random() * 3 | 0];
    p.style.cssText = `left:${Math.random() * 100}%;font-size:${14 + Math.random() * 16}px;--sw:${(Math.random() - .5) * 160}px;animation-duration:${2 + Math.random()}s;animation-delay:${(Math.random() * .8).toFixed(2)}s`;
    o.appendChild(p);
  }
  document.body.appendChild(o);
  setTimeout(() => { tengah(); o.classList.add('buka'); }, 1500);
  setTimeout(() => o.remove(), 3800);
}
let kadoDibuka = false;
$('#gift').onclick = () => {
  if (kadoDibuka) return; kadoDibuka = true;
  bukaKunciAudio();
  transisiBunga(() => { go('puzzle'); mulaiPuzzle(); });
};

// ---------- puzzle foto ----------
const N = 3; let urut = [], pilih = -1, fotoSrc = null;
function kotakkan(src) {
  return new Promise(r => {
    const i = new Image();
    i.onload = () => {
      try {
        const s = Math.min(i.width, i.height), c = document.createElement('canvas');
        c.width = c.height = Math.min(s, 900);
        c.getContext('2d').drawImage(i, (i.width - s) / 2, (i.height - s) / 2, s, s, 0, 0, c.width, c.height);
        r(c.toDataURL('image/jpeg', .9));
      } catch (e) { r(src); }
    };
    i.onerror = () => r(null);
    i.src = src;
  });
}
async function mulaiPuzzle() {
  fotoSrc = await kotakkan(CONFIG.fotoPuzzle);
  $('#papan').style.backgroundImage = fotoSrc ? `url(${fotoSrc})` : 'none';
  $('#intip').style.display = fotoSrc ? '' : 'none';
  do { urut = [...Array(N * N).keys()].sort(() => Math.random() - .5); } while (urut.every((v, i) => v === i));
  pilih = -1; gambarPapan();
}
function gambarPapan() {
  const p = $('#papan'); p.innerHTML = '';
  urut.forEach((t, pos) => {
    const d = document.createElement('button');
    d.className = 'tile' + (pos === pilih ? ' pilih' : '');
    if (fotoSrc) {
      d.style.backgroundImage = `url(${fotoSrc})`;
      d.style.backgroundSize = `${N * 100}% ${N * 100}%`;
      d.style.backgroundPosition = `${(t % N) * 100 / (N - 1)}% ${Math.floor(t / N) * 100 / (N - 1)}%`;
    } else d.textContent = t + 1;
    d.onclick = () => tap(pos);
    p.appendChild(d);
  });
}
function tap(pos) {
  if (pilih < 0) pilih = pos;
  else { if (pilih !== pos) [urut[pilih], urut[pos]] = [urut[pos], urut[pilih]]; pilih = -1; }
  gambarPapan();
  if (urut.every((v, i) => v === i)) {
    $('#info').textContent = 'Berhasil! ♥';
    setTimeout(() => { fase('foto'); go('gate'); }, 1400);
  }
}
$('#intip').onclick = () => { const p = $('#papan'); p.classList.add('lihat'); setTimeout(() => p.classList.remove('lihat'), 1500); };

// ---------- kode rahasia ----------
async function sha256(t) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
async function cekKode() {
  const input = $('#kode'), masuk = input.value.trim().toLowerCase();
  if (!masuk) return;
  let hash = '';
  try { hash = await sha256(masuk); } catch (e) { $('#pesanSalah').textContent = 'Buka lewat https atau localhost ya 🙏'; return; }
  if (hash === CONFIG.kodeHash) {
    $('#pesanSalah').textContent = ''; input.value = '';
    mulaiMusik();
    go('cerita'); tampil(0);
  } else {
    $('#pesanSalah').textContent = 'Kodenya belum tepat, coba lagi ya 💔';
    const k = $('.glass'); k.classList.remove('goyang'); void k.offsetWidth; k.classList.add('goyang');
    if (navigator.vibrate) navigator.vibrate(200);
    input.value = '';
  }
}
$('#btnBuka').onclick = cekKode;
$('#kode').onkeydown = e => { if (e.key === 'Enter') cekKode(); };

// ---------- cerita ----------
function tombol(t, f, c) { const b = document.createElement('button'); b.className = c; b.textContent = t; b.onclick = f; return b; }
function tampil(i) {
  const s = CONFIG.cerita[i], box = $('#cerita'), aksi = $('#cAksi');
  $('#cEmoji').textContent = s.emoji; $('#cTeks').textContent = s.teks; aksi.innerHTML = '';
  box.classList.remove('ganti'); void box.offsetWidth; box.classList.add('ganti');
  const berikut = () => { mulaiMusik(); i + 1 < CONFIG.cerita.length ? tampil(i + 1) : go('intro'); };
  if (s.pilihan) {
    let n = 0;
    const ya = tombol(s.pilihan[0], () => { ya.remove(); berikut(); }, 'btn');
    const tdk = tombol(s.pilihan[1], null, 'btn ghost');
    tdk.onclick = () => {
      n++;
      tdk.textContent = ['yakin? 🥺', 'beneran? 😢', 'ayolah 🥹'][n - 1] || '😭';
      if (n >= 4) { ya.classList.add('penuhYa'); ya.textContent = s.pilihan[0] + ' 💗'; document.body.appendChild(ya); }
      else ya.style.transform = `scale(${1 + n * .45})`;
    };
    aksi.append(ya, tdk);
  } else aksi.append(tombol(s.tombol, berikut, 'btn'));
}

// ---------- surat: efek mengetik ----------
let typing;
function ketik() {
  const el = $('#isiSurat'); el.textContent = ''; clearInterval(typing); let i = 0;
  typing = setInterval(() => {
    el.textContent += CONFIG.surat[i++] ?? '';
    el.scrollTop = el.scrollHeight;
    if (i >= CONFIG.surat.length) clearInterval(typing);
  }, 40);
}

// ---------- hati melayang ----------
setInterval(() => {
  const h = document.createElement('div'); h.className = 'heart';
  h.textContent = ['💖', '💕', '💗', '🌸', '✨'][Math.random() * 5 | 0];
  h.style.cssText = `left:${Math.random() * 100}vw;font-size:${14 + Math.random() * 18}px;animation-duration:${6 + Math.random() * 5}s`;
  $('#hearts').appendChild(h); setTimeout(() => h.remove(), 11000);
}, 700);

// ---------- kanvas: bintang & bola cahaya ----------
const cv = $('#bg'), ctx = cv.getContext('2d'); let W, H, bintang = [], bola = [];
function ukuran() {
  const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
  cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  bintang = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .4, p: Math.random() * 6.28, v: Math.random() * .03 + .01 }));
  bola = Array.from({ length: 14 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 50 + 25, vy: -(Math.random() * .3 + .1), vx: (Math.random() - .5) * .2, a: Math.random() * .12 + .05 }));
}
ukuran(); addEventListener('resize', ukuran);
(function gambar() {
  ctx.clearRect(0, 0, W, H);
  for (const b of bola) {
    b.x += b.vx; b.y += b.vy; if (b.y < -b.r) { b.y = H + b.r; b.x = Math.random() * W; }
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    g.addColorStop(0, `rgba(232,160,187,${b.a})`); g.addColorStop(1, 'rgba(232,160,187,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.28); ctx.fill();
  }
  for (const s of bintang) {
    s.p += s.v; ctx.fillStyle = `rgba(255,241,245,${.3 + Math.abs(Math.sin(s.p)) * .7})`;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
  }
  requestAnimationFrame(gambar);
})();