/* main.js
   Grundlogik: Info / Projekte / Kategorien / Projekt-Preview
*/

const dynamic = document.querySelector('.dynamic-area');
const preview = document.querySelector('.preview-area');
const previewAreaContainer = preview; // Alias

// Utility: leert beide Bereiche
function clearAllProjectUI() {
  dynamic.innerHTML = '';
  preview.innerHTML = '';
  // sicherstellen, dass Preview sichtbar ist (kann durch Info ausgeblendet werden)
  preview.style.display = 'flex';
}

// Initial state: zeige neutralen Start (z. B. Kurzintro)
function showInitial() {
  dynamic.innerHTML = '';
  preview.innerHTML = '';
  preview.style.display = 'flex';
}
showInitial();

/* -----------------------------
   NAVIGATION: Info & Projekte
   ----------------------------- */
document.querySelectorAll('.start-links .link').forEach(el => {
  el.addEventListener('click', (e) => {
    const target = el.dataset.target;
    if (!target) return;

    if (target === 'info') {
      // Info: mittlere Spalte zeigt Text; komplette Projekt-UI verschwindet
      preview.style.display = 'none'; // Preview & Index sollen verschwinden
      dynamic.innerHTML = `
        <div class="info-block">
          <p>Gender Panik aka kitschkai aka Kai Krämer is a poet, performance artist & gender pirate. Currently based in Leipzig. Since re-discovering their visual art practice, a part also lies in creating visual artwork and design for people.</p>
          <p>Study biography: studying Fine Arts and Art Education (B.F.A.) at the Academy for Fine Arts in Stuttgart (Akademie der Bildenden Künste Stuttgart) plus German Studies at University of Stuttgart (2016-2021) / Body, Theory and the Poetics of the Performative (M.F.A.) at ABK Stuttgart (2021-2024) / German Studies and Literature Studies (M.A.) University Leipzig (since 2024)</p>
          <p>In the past years learning from and working with Discoteca Flaming Star (Cristina Gómez-Barrio & Wolfgang Mayer), Paula Kohlmann, Sergio Zevallos, Ines Kleesattel, Niall Jones, Liz Rosenfeld, Yara Richter, Toni Böckle, Stella Ruszkowski, Ludgi Porto, Moriz Stangl, Mona Gablenz, Mara Engelsberger, Aline Xavier Mineiro, Madeleine Bovidae, Una Herbst, Lea Lenk, Vesna Hetzel, Rainer Ganahl, Iris Eckert, Anne-Marie Herda and others.</p>
        </div>
      `;
    }
    if (target === 'projekte') {
      // Projekte: zeige Kategorien in der mittleren Spalte, Preview sichtbar (leer)
      preview.style.display = 'flex';
      dynamic.innerHTML = buildProjectCategories();
      hookCategoryListeners(); // Setzt Listener nach Einfügen
      // Clear preview
      preview.innerHTML = '';
    }
    if (target === 'upcoming') {
  preview.style.display = 'none';
  preview.innerHTML = '';
  dynamic.innerHTML = buildUpcoming();
    }
  });
});

/* -----------------------------
   Kategorien (Accordion)
   ----------------------------- */
function buildProjectCategories() {
  return `
    <div class="category" data-cat="performance">Performance + Text</div>
    <div class="project-list" data-list="performance">
      <div class="project-item" data-key="dragking">Autorschaft ist DragKing (2025)</div>
      <div class="project-item" data-key="knutschen">KNUTSCHEN IST WICHTIGER ALS DEUTSCHLAND (2024 ongoing)</div>
<div class="project-item" data-key="cassandra">KASSANDRA • choose the truth (2024-2025)</div>
      <div class="project-item" data-key="pirates">INTIMACY PIRATES (2024)</div>
      <div class="project-item" data-key="depersona">DEPERSONA (2024)</div>
      <div class="project-item" data-key="words">(WORDS) Ich will Nein sagen (2024)</div>
      <div class="project-item" data-key="rivers">RUNNING RIVERS & SKINNED WORDS. The pressure to perform and the attempt to love. (2024)</div>
      <div class="project-item" data-key="saynosayyes">SAY NO/SAY YES (2023)</div>
      <div class="project-item" data-key="apotheca">APOTHECA SHADY HEARTS (2023)</div>
      <div class="project-item" data-key="tba">TEXT BODY PRACTICE (2022-ongoing, continuous research)</div>
      <div class="project-item" data-key="edging">edging the self (2022-2023)</div>
    </div>

    <div class="category" data-cat="visuals">Visual Art + Grafik</div>
    <div class="project-list" data-list="visuals">
      <div class="project-item" data-key="grwl">grwl: Bodies and Monsters (2025)</div>
      <div class="project-item" data-key="eckert">ECKERT (2025)</div>
      <div class="project-item" data-key="figure">A figure (Collab. mit Vanessa Rukh) (2025)</div>
      <div class="project-item" data-key="kwadbilder">Knutschen ist wichtiger als Deutschland (2023)</div>
      <div class="project-item" data-key="jazzkabinett">Jazzkabinett Stuttgart (2024)</div>
      <div class="project-item" data-key="drawings">drawings (ongoing)</div>
    </div>

    <div class="category" data-cat="bildung">Bildung + Netzwerk</div>
    <div class="project-list" data-list="bildung">
      <div class="project-item" data-key="transfem">transfem0711 (2023-2024)</div>
      <div class="project-item" data-key="cuteartsy">cute&artsy (2021-2023)</div>
      <div class="project-item" data-key="matratze">MATRATZE MAGAZIN (2018-2023)</div>
    </div>

    <div class="category" data-cat="theater">Theater</div>
    <div class="project-list" data-list="theater">
      <div class="project-item" data-key="universum">Kostüm 'Das hässliche Universum' (2026)</div>
      <div class="project-item" data-key="rombo">Regie-Assistenz 'ROMBO' (2026)</div>
    </div>
  `;
}

function hookCategoryListeners() {
  document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('click', () => {
      const key = cat.dataset.cat;
      toggleCategory(key);
    });
  });

  document.querySelectorAll('.project-item').forEach(pi => {
    pi.addEventListener('click', () => {
      const key = pi.dataset.key;
      showProjectPreview(key);
      // opt. mark active project visually
      document.querySelectorAll('.project-item').forEach(x => x.classList.remove('active'));
      pi.classList.add('active');
    });
  });
}

function toggleCategory(catKey) {
  const list = document.querySelector(`[data-list="${catKey}"]`);
  if (!list) return;
  const isHidden = getComputedStyle(list).display === 'none';
  // close all lists first
  document.querySelectorAll('.project-list').forEach(pl => pl.style.display = 'none');
  list.style.display = isHidden ? 'block' : 'none';
}

/* -----------------------------
   Projekt-Preview (Bilder + Beschreibung)
   ----------------------------- */
function showProjectPreview(key) {
  // Mapping: jedes Projekt hat text + bilder + kleine meta pro bild
  const projects = {
    'dragking': {
      title: 'Autorschaft ist DragKing',
      year: '2025',
      desc: 'An essay published in [kon] paper, a magazine for literature and culture, edition 11 "HYBRID". It deals with authorship being a performance of white masculinity. This essays is based on fragments of my master thesis "(WORDS) Ich will Nein sagen".',
      link: 'https://kon-paper.com/ausgabe-hybrid',
      images: [
      ]
    },
    'knutschen': {
      title: 'KNUTSCHEN IST WICHTIGER ALS DEUTSCHLAND',
      year: '2024 — ongoing',
      desc: '[Stage Name: (Kai) Gender Panik] A working process in the neccessity and privilege to feel. Dealing with fragility, desire, shame and trust, queering the own body and relationships. Performances containing own writing and songs (mostly german), DJing, Drag. Performances in various spaces including: KKT (Stuttgart), Laden auf Zeit (Leipzig), das anarchistische Wohnzimmer @ Wxssxrschxdxn (Leipzig), Pixi (Leipzig), Dieski44 (Leipzig), das anarchistische Wohnzimmer @ helmut.space (Leipzig)',
      images: [
        { src: 'images/knutschen_6.jpg', meta: 'Studioaufnahme, 2025' },
        { src: 'images/knutschen_4.JPG', meta: 'Dokumentation Performance Dieski44, 2025' },
        { src: 'images/knutschen_5.jpg', meta: 'Dokumentation Performance helmut.space, 2025' },
        { src: 'images/knutschen_1.jpg', meta: 'Studioaufnahme, 2025' },
        { src: 'images/knutschen_2.jpg', meta: 'Dokumentation Performance KKT, 2024 (c) Mona Gablenz' },
        { src: 'images/knutschen_3.jpg', meta: 'Dokumentation Performance Wxssxrschxdxn, 2025' },
      ]
    },
    'cassandra': {
      title: 'KASSANDRA • choose the truth',
      year: '2024-2025',
      desc: '„A musical and theatrical perormance with democrately elected truth“. Collaboratively developed with performer Jule Lotte Bröcker and musicians Vili Polajnar, Martijn Susla & Reto Weiche. I contributed mainly in creating the Text together with Jule Lotte Bröcker. Premier in St. Maria als (Stuttgart). Duration ca. 1,5 h.',
      link: 'https://www.stmariaals.de/veranstaltung/kassandra-choose-the-truth-2/',
      images: [
      ]
    },
    'pirates': {
      title: 'INTIMACY PIRATES',
      year: '2024',
      desc: 'Lecture Performance on a raft, starting on land with a short poetic introduction and activation of the audience. The text tells of anxieties and fear, anger, love and friendship and the capicity of letting go to meet anew. The work was created for the JETZT! Festival of Kulturregion Stuttgart, in cooperation with Kulturkabinett Stuttgart and performed three times at different stages of the raft’s travel. Duration 1-1,5 h.',
      link: 'https://www.kontextwochenzeitung.de/schaubuehne/704/piratinnen-der-intimitaet-9750.html',
      images: [
        { src: 'images/pirates_1.jpg', meta: 'Dokumentation, 2024 (c) Dominique Brewing' },
        { src: 'images/pirates_2.jpg', meta: 'Dokumentation, 2024 (c) Dominique Brewing' }, 
        { src: 'images/pirates_3.jpg', meta: 'Dokumentation, 2024' },
        { src: 'images/pirates_4.jpg', meta: 'Dokumentation, 2024 (c) Dominique Brewing' }
      ]
    },
    'depersona': {
      title: 'DEPERSONA',
      year: '2024',
      desc: 'Performing in a short film by Kira Held and Leon Liehr. Length of film: 7 min.',
      images: [
        { src: 'images/depersona_1.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' },
        { src: 'images/depersona_2.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' }, 
        { src: 'images/depersona_4.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' },
        { src: 'images/depersona_5.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' },
        { src: 'images/depersona_6.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' },
        { src: 'images/depersona_7.jpg', meta: 'Videostill, 2024 (c) Kira Held & Leon Liehr' }
      ]
    },
    'words': {
      title: '(WORDS) Ich will Nein sagen',
      year: '2024',
      desc: 'An anthology of multiple of my voices. It deals with the performance of art production, academia and gender, and searches for a writing beyond heteropatriarchal structures. I developed this piece as my master thesis. PDF, 102 pages.',
      images: [
        { src: 'images/words_1.jpeg', meta: 'Dokumentation, 2024' },
        { src: 'images/words_2.jpeg', meta: 'Dokumentation, 2024' }, 
        { src: 'images/words_3.jpeg', meta: 'Dokumentation, 2024' }
      ]
    },
    'rivers': {
      title: 'RUNNING RIVERS & SKINNED WORDS – The pressure to perform and the attempt to love',
      year: '2024',
      desc: 'A collaborative Performance with Mona Gablenz, serving as final exam in the Master program MFA KTPP. It was created site-specific, at and for the Heusteigtheater in Stuttgart where we studied and worked the two previous years. The performance contained reading passages from my work "(WORDS) Ich will Nein sagen". Duration ca. 2,5 h.',
      images: [
        { src: 'images/rivers_1.jpeg', meta: 'Dokumentation Performance, 2024' },
        { src: 'images/rivers_2.jpeg', meta: 'Dokumentation Performance, 2024' },
        { src: 'images/rivers_3.jpg', meta: 'Dokumentation Performance, 2024' },
        { src: 'images/rivers_4.jpg', meta: 'Dokumentation Performance, 2024' },
        { src: 'images/rivers_5.jpeg', meta: 'Plakat zur Performance, 2024' }
      ]
    },
    'saynosayyes': {
      title: 'SAY NO/SAY YES',
      year: '2023',
      desc: 'The text & performance ‚to say no, to say yes’ was the product of a artistic research phase I spent at hangar.org, as part of the exchange grant between Baden-Württemberg and Catalunya, made possible by the Kunststiftung Baden-Württemberg and Goethe Institut Barcelona. The research focussed on the mouth as a political and sensual knot in critical times – as the space in which no and yes is articulated. It is a lecture performance ending with a collective humming with the audience. Along with the performance I published a mini-zine. I performed the this piece afterwards in other spaces. Duration ca. 20 min.',
      images: [
        { src: 'images/sayyessayno_1.jpeg', meta: 'Studio, 2023' },
        { src: 'images/sayyessayno_2.jpeg', meta: 'Performance-Vorbereitung, 2023' },
        { src: 'images/sayyessayno_3.jpeg', meta: 'Ausschnitt aus Textdatei' },
        { src: 'images/sayyessayno_4.jpeg', meta: 'Dokumentation Performance, 2023' }
      ]
    },
    'apotheca': {
      title: 'APOTHECA SHADY HEARTS',
      year: '2023',
      desc: '‚Apotheca Shady Hearts‘ was a collective performance with Toni Böckle, Una Herbst, Mona Gablenz, Stella Ruszkowski and Mara Engelsberger at the ABK Stuttgart Rundgang. Several happenings and participatory performances took place over the course of three days (see the poster with the time schedule) which dealed parallely with heteronormative romance narratives and institutional power structures.',
      images: [
        { src: 'images/apotheca_0.jpg', meta: 'Timetable der Apotheca Shady Hearts, 2023' },
        { src: 'images/apotheca_1.jpg', meta: 'Dokumentation der Opening-Performance, 2023' },
        { src: 'images/apotheca_2.png', meta: 'Flyer für Happening "Collective Crushing"' },
        { src: 'images/apotheca_3.jpg', meta: 'Dokumentation Happening "Sexting", 2023' },
        { src: 'images/apotheca_4.jpg', meta: 'Dokumentation Apotheca Shady Hearts, 2023' },
        { src: 'images/apotheca_5.jpeg', meta: 'Dokumentation Apotheca Shady Hearts, 2023' },
        { src: 'images/apotheca_6.jpeg', meta: 'Dokumentation Apotheca Shady Hearts, 2023' }, 
        { src: 'images/apotheca_7.jpg', meta: 'Dokumentation Apotheca Shady Hearts, 2023' }
      ]
    },
      'tba': {
      title: 'TEXT BODY PRACTICE (continuous research)',
      year: '2022-ongoing',
      desc: 'This research is a continuous experiment with writing, reading and bodies in space. Working with performative prompts and poetic writing looking for playfulness, connection and agency. Various Performances, Happenings, and Playshops.',
      images: [
        { src: 'images/tba_1.jpg', meta: 'Dokumentation "this is a hybrid cloud", 2022' },
        { src: 'images/tba_2.jpeg', meta: 'Invitation Graphic from "text + body = action", 2022' },
        { src: 'images/tba_3.jpeg', meta: 'Ausschnitt aus "text + body = action", 2022' },
        { src: 'images/tba_4.jpg', meta: 'Dokumentation "this is a hybrid cloud", 2022' },
        { src: 'images/tba_5.jpg', meta: 'Studioaufnahme, 2022' },
        { src: 'images/tba_6.jpg', meta: 'Studioaufnahme, 2022' },
        { src: 'images/tba_7.jpeg', meta: 'Studioaufnahme, 2022' }
      ]
    },
    'edging': {
      title: 'edging the self',
      year: '2022-2023',
      desc: 'A collective performance initiated by a workshop by Liz Rosenfeld, developed with students of MFA KTPP. Performed two times, once at Heusteigtheater Stuttgart, a second time in Württembergischer Kunstverein (Stuttgart).',
      images: [
       { src: 'images/edging_1.jpg', meta: 'Invitation to the second performance, 2025' }
      ]
    },
    'grwl': {
      title: 'grwl: bodies and monsters',
      year: '2025-ongoing',
      desc: 'Paintings from 2025, dedicated to a monstrouos history of flinta* bodies.',
      images: [
        { src: 'images/grwl_1.jpg', meta: '"grwl", 2025' },
        { src: 'images/grwl_2.jpg', meta: '"grwl", 2025' },
        { src: 'images/grwl_3.jpg', meta: 'Studioaufnahme "nackt transparent", 2025' },
        { src: 'images/grwl_4.jpg', meta: 'Detail "nackt transparent", 2025' },
        { src: 'images/grwl_5.jpg', meta: 'Detail "nackt transparent", 2025' }
      ]
    },
    'eckert': {
      title: 'ECKERT (2025)',
      year: '2025',
      desc: 'Visual Art for ECKERT Band, including a poster, graphic artwork as merch and a portrait series. Artwork: A3 digital print (edition of 50).',
      images: [
        { src: 'images/eckert_1.jpg', meta: 'Artwork, 2025' },
        { src: 'images/eckert_2.jpg', meta: 'Poster, 2025' },
      ]
    },
    'figure': {
      title: 'a figure (collab. mit Vanessa Rukh)',
      year: '2025',
      desc: 'Photoseries in collaboration with Vanessa Rukh, in the process of developing a figure for possible performances',
      images: [
        { src: 'images/figure_1.jpg', meta: 'no title, 2025' },
        { src: 'images/figure_2.jpg', meta: 'no title, 2025' },
        { src: 'images/figure_3.jpg', meta: 'no title, 2025' }
      ]
    },
    'kwadbilder': {
      title: 'Knutschen ist wichtiger als Deutschland',
      year: '2024',
      desc: 'The visual side of this working process in the neccessity and privilege to feel. Dealing with fragility, shame, anger, desire, trust, and queering the body and its relationships. Materials used: old bed sheets, crayons, acrylic, carpet, trinkets, chains, etc. Exhibition in KKT Stuttgart created around a series of my paintings.',
      images: [
        { src: 'images/kwadbilder_1.jpg', meta: 'Ausstellungsdokumentation, 2024' },
        { src: 'images/kwadbilder_2.jpg', meta: 'Ausstellungsdokumentation, 2024' },
        { src: 'images/kwadbilder_3.jpg', meta: 'Detail' },
        { src: 'images/kwadbilder_4.jpg', meta: 'Ausstellungsdokumentation, 2024' },
        { src: 'images/kwadbilder_5.jpg', meta: 'Ausstellungsdokumentation, 2024' },
        { src: 'images/kwadbilder_6.jpg', meta: 'Ausstellungsdokumentation, 2024' },
        { src: 'images/kwadbilder_7.jpg', meta: 'Ausstellungsdokumentation, 2024' }
      ]
    },
    'jazzkabinett': {
      title: 'Jazzkabinett Leipzig',
      year: '2024',
      desc: 'Poster & FLyer Design for Jazzkabinett Stuttgart 2025.',
      images: [
        { src: 'images/jazzkabinett_1.jpg', meta: 'Flyer' }
      ]
    },
    'drawings': {
      title: 'drawings',
      year: 'ongoing',
      desc: 'A colletion of digital and analog drawings :3. ... coming soon',
      images: [
        { src: 'images/drawings_1.jpg', meta: 'title, 2024' }
      ]
    },
    'transfem': {
      title: 'transfem0711',
      year: '2023-2024',
      desc: 'Artistic research project with Lea Lenk. It followed the call for an international trans*feminist digital depletion strike (8th march 2023) against BigTech companies and their extractivist and exploitative dynamics. We organized an open call for imaginative zine-making in Stuttgart and maintained an exchange on local, care-based and anti-BigTech apporaches to art pedagogy and creativity.',
      images: [
        { src: 'images/transfem_1.jpg', meta: 'Flyer for zine, 2023' },
        { src: 'images/transfem_2.png', meta: 'Screenshot from zine webseite, 2023' }
      ]
    },
    'cuteartsy': {
      title: 'cute&artsy',
      year: '2021-2023',
      desc: 'Initiative of students against discriminatory structures in art academies. We created video artworks and presentations, a quantitative poll and tried to open space for exchange and dialogue. Whilst our activity was generally welcome our claims stayed unresponded.',
      images: [
        { src: 'images/cuteartsy_1.jpeg', meta: 'Dokumentation eines Treffens, 2023' },
        { src: 'images/cuteartsy_2.jpeg', meta: 'Poster calling for participation in poll, 2022' },
        { src: 'images/cuteartsy_3.png', meta: 'Videostill, 2022' },
        { src: 'images/cuteartsy_4.jpeg', meta: 'Videostill, 2022' }
      ]
    },
    'matratze': {
      title: 'MATRATZE MAGAZIN',
      year: '2018-2023',
      desc: 'Independent magazine for artitistic photo and text work by students, published once a year. We founded Matratze Magazin as a group of art and communication design students at ABK Stuttgart in 2018.',
      link: 'https://www.instagram.com/matratzemagazin/?hl=de',
      images: [
      ]
    },
      'universum': {
      title: 'Das hässliche Universum',
      year: '2026',
      desc: '(Projekt an der Akademie für Darstellende Künste Baden-Württemberg. Regie: Luca Hinrich. Premiere 12.2.26)',
      link: '',
      images: [ 
         { src: 'images/universum_1.jpeg', meta: '(c) Steven Schulz 2026' },
         { src: 'images/universum_2.jpeg', meta: '(c) Steven Schulz 2026' },
         { src: 'images/universum_3.jpeg', meta: '(c) Steven Schulz 2026' }
      ]
    },
    'rombo': {
      title: 'ROMBO',
      year: '2026',
      desc: '(Abchlussarbeit Regie von Jakob Altmayer an der Hochschule für Musik und Theater München. Premiere 4.3.26)',
      link: '',
      images: [ 

      ]
    }
  };

  const p = projects[key];
  if (!p) {
    preview.innerHTML = '<p>Kein Preview vorhanden.</p>';
    return;
  }

  // obere Beschreibung (Titel + kurzer Text + Jahr)
  const descHtml = `
    <div class="preview-desc">
      <div style="font-style: italic;">${escapeHtml(p.title)}</div>
      <div style="opacity:.8; font-size:.92rem; margin-bottom:16px;">${escapeHtml(p.desc)}</div>
    </div>
    ${p.link ? `
      <div style="margin-bottom:8px;">
        <a href="${p.link}" target="_blank" 
           style="font-size:.9rem; text-decoration:underline; color:#003;">
           → more info
        </a>
      </div>
    ` : ''}
  </div>
  `;

  // Bilder
  const imagesHtml = p.images.map(img => {
    return `
      <div class="img-card">
        <img src="${img.src}" alt="${escapeHtml(p.title)}">
        <div class="img-meta">${escapeHtml(img.meta || '')}</div>
      </div>
    `;
  }).join('');

  preview.innerHTML = `<div>${descHtml}</div><div class="preview-images">${imagesHtml}</div>`;
  // ensure preview visible (for safety)
  preview.style.display = 'flex';
}

// Aktuelles
function buildUpcoming() {
  return `
    <div class="info-box">
    <p>Upcoming / Aktuelles (für mehr Info zu einzelnen Events gerne eine Mail oder dm auf Instagram)</p>
    <p><a href="https://www.instagram.com/dieski_44?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><strong>6.12.25</strong> Performance in Leipzig @Dieski44</div></p>
    <p><a href="https://www.instagram.com/das_anarchistische_wohnzimmer?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><strong>20.12.25</strong> Performance in Leipzig (dm for location)</div></p>
    <p><a href="https://www.instagram.com/jenny_literatur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><strong>2026</strong> Release of text publication in JENNY Literaturmagazin</a></p>
     <p style="margin-top:10px; opacity:.6; font-size:.85rem;">(more soon)</p>
    </div>
  `;
}

// small HTML-escape helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(m){
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
  });
}


// ---- Footer Legal Toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const legalBtn = document.getElementById('legal-toggle');
  const legalBox = document.getElementById('legal-box');
  if (legalBtn && legalBox) {
    legalBtn.addEventListener('click', () => {
      legalBox.style.display = legalBox.style.display === 'block' ? 'none' : 'block';
    });
  }
});



