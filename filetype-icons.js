/**
 * filetype-icons.js  —  CopyParty plugin
 *
 * HOW TO INSTALL
 * ──────────────
 * 1. Save this file in any folder CopyParty serves (e.g. your root volume).
 * 2. Start CopyParty with:
 *      --html-head '<script src="/filetype-icons.js"><\/script>'
 * 3. Hard-refresh your browser (Ctrl+Shift+R) once.
 *
 * Works across SPA navigation. No external resources needed.
 */
(function () {
  'use strict';

  var EXT = {
    jpg:'img',jpeg:'img',png:'img',gif:'img',webp:'img',svg:'img',
    bmp:'img',tiff:'img',tif:'img',ico:'img',heic:'img',heif:'img',
    avif:'img',jxl:'img',raw:'img',cr2:'img',nef:'img',arw:'img',dng:'img',
    pdf:'pdf',
    doc:'doc',docx:'doc',odt:'doc',rtf:'doc',pages:'doc',wpd:'doc',
    xls:'xls',xlsx:'xls',ods:'xls',csv:'xls',tsv:'xls',numbers:'xls',
    ppt:'ppt',pptx:'ppt',odp:'ppt',key:'ppt',
    txt:'txt',md:'txt',markdown:'txt',rst:'txt',log:'txt',nfo:'txt',
    js:'code',ts:'code',jsx:'code',tsx:'code',mjs:'code',
    py:'code',pyw:'code',rb:'code',php:'code',
    java:'code',kt:'code',scala:'code',groovy:'code',
    html:'code',htm:'code',css:'code',scss:'code',sass:'code',less:'code',
    json:'code',json5:'code',xml:'code',yaml:'code',yml:'code',
    toml:'code',ini:'code',cfg:'code',
    sh:'code',bash:'code',zsh:'code',fish:'code',bat:'code',ps1:'code',
    c:'code',cc:'code',cpp:'code',cxx:'code',h:'code',hpp:'code',
    cs:'code',go:'code',rs:'code',dart:'code',swift:'code',
    lua:'code',pl:'code',r:'code',jl:'code',sql:'code',proto:'code',
    zip:'zip',tar:'zip',gz:'zip',bz2:'zip','7z':'zip',
    rar:'zip',xz:'zip',zst:'zip',lz4:'zip',iso:'zip',cab:'zip',
    mp3:'audio',flac:'audio',ogg:'audio',wav:'audio',aac:'audio',
    m4a:'audio',opus:'audio',wma:'audio',aiff:'audio',ape:'audio',
    mpc:'audio',wv:'audio',tta:'audio',s3m:'audio',xm:'audio',
    it:'audio',mod:'audio',
    mp4:'video',m4v:'video',mkv:'video',webm:'video',avi:'video',
    mov:'video',wmv:'video',flv:'video',vob:'video',
    mpg:'video',mpeg:'video',m2ts:'video',mts:'video',ogv:'video',
    rm:'video',rmvb:'video',divx:'video',
    exe:'exe',msi:'exe',dmg:'exe',pkg:'exe',appimage:'exe',
    apk:'exe',ipa:'exe',crx:'exe',
    ttf:'font',otf:'font',woff:'font',woff2:'font',eot:'font',
    obj:'3d',stl:'3d',step:'3d',stp:'3d',fbx:'3d',
    blend:'3d',glb:'3d',gltf:'3d',ply:'3d',
    db:'db',sqlite:'db',sqlite3:'db',mdb:'db',
    epub:'ebook',mobi:'ebook',azw:'ebook',azw3:'ebook',
    cbz:'ebook',cbr:'ebook',
    torrent:'torrent',
  };

  var STYLE = {
    folder:  {bg:'#f0a800',fg:'#fff',lbl:'DIR'   },
    img:     {bg:'#43a047',fg:'#fff',lbl:'IMG'   },
    pdf:     {bg:'#e53935',fg:'#fff',lbl:'PDF'   },
    doc:     {bg:'#1565c0',fg:'#fff',lbl:'DOC'   },
    xls:     {bg:'#2e7d32',fg:'#fff',lbl:'XLS'   },
    ppt:     {bg:'#e64a19',fg:'#fff',lbl:'PPT'   },
    txt:     {bg:'#546e7a',fg:'#fff',lbl:'TXT'   },
    code:    {bg:'#6a1b9a',fg:'#fff',lbl:'</>'   },
    zip:     {bg:'#5d4037',fg:'#fff',lbl:'ZIP'   },
    audio:   {bg:'#00695c',fg:'#fff',lbl:'\u266b'},
    video:   {bg:'#0277bd',fg:'#fff',lbl:'\u25b6'},
    exe:     {bg:'#e65100',fg:'#fff',lbl:'EXE'   },
    font:    {bg:'#4a148c',fg:'#fff',lbl:'FNT'   },
    '3d':    {bg:'#37474f',fg:'#fff',lbl:'3D'    },
    db:      {bg:'#1b5e20',fg:'#fff',lbl:'DB'    },
    ebook:   {bg:'#880e4f',fg:'#fff',lbl:'BOOK'  },
    torrent: {bg:'#bf360c',fg:'#fff',lbl:'TOR'   },
    file:    {bg:'#9e9e9e',fg:'#fff',lbl:'FILE'  },
  };

  function getType(filename, isFolder) {
    if (isFolder) return 'folder';
    var dot = filename.lastIndexOf('.');
    if (dot < 0) return 'file';
    var ext = filename.slice(dot + 1).toLowerCase();
    return EXT[ext] || 'file';
  }

  function makeIcon(type) {
    var s = STYLE[type] || STYLE.file, lbl = s.lbl;
    var fs = lbl.length<=1?10:lbl.length<=2?8:lbl.length<=3?7:5.5;
    var w  = lbl.length<=1?18:lbl.length<=2?20:lbl.length<=3?24:28;
    return '<svg xmlns="http://www.w3.org/2000/svg"'+
      ' width="'+w+'" height="16" viewBox="0 0 '+w+' 16"'+
      ' style="vertical-align:middle;display:inline-block;">'+
      '<rect width="'+w+'" height="16" rx="3" fill="'+s.bg+'"/>'+
      '<text x="'+(w/2)+'" y="11.5" font-size="'+fs+'"'+
      ' font-family="Arial,Helvetica,sans-serif"'+
      ' text-anchor="middle" fill="'+s.fg+'" font-weight="bold">'+
      lbl+'</text></svg>';
  }

  var DONE = 'data-fti';

  function processTable() {
    var table = document.getElementById('files');
    if (!table) return;
    var thead = table.querySelector('thead tr');
    var tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;

    // Find "C" column index
    var ths = thead.querySelectorAll('th');
    var cIdx = -1;
    for (var i = 0; i < ths.length; i++) {
      if (ths[i].textContent.trim() === 'C') { cIdx = i; break; }
    }
    if (cIdx < 0) return;

    // Insert our <th> after "C" (once)
    var nextTh = ths[cIdx].nextElementSibling;
    if (!nextTh || nextTh.getAttribute(DONE) !== '1') {
      var th = document.createElement('th');
      th.setAttribute(DONE, '1');
      th.title = 'File type';
      th.style.cssText =
        'width:32px;min-width:28px;padding:1px 3px;text-align:center;';
      ths[cIdx].insertAdjacentElement('afterend', th);
    }

    // Inject one icon cell per unprocessed row
    var rows = tbody.querySelectorAll('tr');
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (row.getAttribute(DONE) === '1') continue;
      row.setAttribute(DONE, '1');
      var tds = row.querySelectorAll('td');
      if (tds.length <= cIdx) continue;

      var filename = '', isFolder = false;
      var anchor = row.querySelector('a[href]');
      if (anchor) {
        filename = anchor.textContent.trim();
        isFolder = /\/(\?|$)/.test(anchor.getAttribute('href') || '');
      }

      var td = document.createElement('td');
      td.style.cssText =
        'padding:0 3px;text-align:center;vertical-align:middle;white-space:nowrap;';
      td.innerHTML = makeIcon(getType(filename, isFolder));
      tds[cIdx].insertAdjacentElement('afterend', td);
    }
  }

  var timer = null;
  function schedule() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { timer = null; processTable(); }, 60);
  }

  function init() {
    processTable();
    var target = document.getElementById('files') || document.body;
    new MutationObserver(schedule).observe(target, {childList:true,subtree:true});
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();
}());
