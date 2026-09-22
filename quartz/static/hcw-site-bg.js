/* H.cw atmosphere V2: five fixed backgrounds + unified card opacity and border flow.
   Uses Quartz's native saved-theme; does not attach another dark-mode handler. */
(()=>{
  if(window.__hcwAtmosphereV2Installed)return;
  window.__hcwAtmosphereV2Installed=true;
  const root=document.documentElement;
  const CHOICES={mist:'雾面青蓝',ocean:'深海蓝',champagne:'石墨香槟',aurora:'灰紫极光',mountain:'雪山'};
  const KEY='hcw-atmosphere-v2';
  const PREV='hcw-site-background-v1';
  const read=(k)=>{try{return localStorage.getItem(k)}catch(_){return null}};
  const write=(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}};
  let stored={};
  try{stored=JSON.parse(read(KEY)||'{}')||{}}catch(_){stored={}};
  const legacy=read(PREV);
  const state={
    palette:Object.hasOwn(CHOICES,stored.palette)?stored.palette:(legacy==='mountain'?'mountain':'mist'),
    alpha:Number.isFinite(Number(stored.alpha))?Math.max(28,Math.min(72,Math.round(Number(stored.alpha)))):42,
    flow:['subtle','vivid','off'].includes(stored.flow)?stored.flow:'subtle'
  };
  const save=()=>write(KEY,JSON.stringify(state));
  const rgba=(s,a)=>{
    const m=s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if(m)return `rgba(${m[1]},${m[2]},${m[3]},${a})`;
    const hex=s.trim().match(/^#([0-9a-f]{6})$/i);
    if(hex){const n=parseInt(hex[1],16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;}
    return s;
  };

  /* Cover colors come from the existing VOL JSON / inline gradients, not hardcoded here. */
  function recolorBook(book){
    if(!book.dataset.hcwOriginalCover1){
      const found=(book.style.backgroundImage||book.style.background).match(/(?:rgba?\([^)]*\)|#[0-9a-f]{6})/gi)||[];
      if(found.length<2)return;
      book.dataset.hcwOriginalCover1=found[0];
      book.dataset.hcwOriginalCover2=found[1];
    }
    const a=Math.min(.96,.40+state.alpha/100*.75);
    book.style.background=`linear-gradient(160deg,${rgba(book.dataset.hcwOriginalCover1,a)},${rgba(book.dataset.hcwOriginalCover2,a)})`;
  }
  function apply(){
    root.dataset.hcwBackground=state.palette;
    root.dataset.hcwFlow=state.flow;
    const a=state.alpha/100;
    root.style.setProperty('--hcw-panel-alpha',a.toFixed(2));
    root.style.setProperty('--hcw-inner-alpha',Math.max(.20,a*.78).toFixed(3));
    root.style.setProperty('--hcw-article-alpha',Math.min(.86,a+.14).toFixed(2));
    root.style.setProperty('--hcw-compact-alpha',Math.min(.86,a+.13).toFixed(2));
    document.querySelectorAll('.hcw-library-book').forEach(recolorBook);
    document.querySelectorAll('[data-hcw-palette]').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.hcwPalette===state.palette)));
    document.querySelectorAll('[data-hcw-flow]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hcwFlow===state.flow)));
    document.querySelectorAll('.hcw-atmo-toggle').forEach(b=>{
      b.textContent='◈ '+CHOICES[state.palette]+' ▾';
      b.title='背景氛围：'+CHOICES[state.palette];
    });
    const slider=document.getElementById('hcw-atmo-opacity');
    const out=document.getElementById('hcw-atmo-opacity-output');
    if(slider)slider.value=String(state.alpha);
    if(out)out.textContent=state.alpha+'%';
    save();
  }
  function photoUrl(){
    const home=document.querySelector('.hcw-site-nav .hcw-brand')?.href||new URL('./',location.href).href;
    return new URL('static/hcw-mountain.jpg',home).href;
  }
  function bindMenu(){
    const control=document.getElementById('hcw-atmo-control');
    const toggle=document.getElementById('hcw-atmo-toggle');
    const menu=document.getElementById('hcw-atmo-menu');
    if(!control||!toggle||!menu||control.dataset.hcwBound==='1')return;
    control.dataset.hcwBound='1';
    const setOpen=open=>{
      menu.hidden=!open;
      toggle.setAttribute('aria-expanded',String(open));
      if(open)menu.querySelector('.hcw-atmo-close')?.focus();
    };
    toggle.addEventListener('click',()=>setOpen(menu.hidden));
    menu.querySelector('.hcw-atmo-close')?.addEventListener('click',()=>{setOpen(false);toggle.focus()});
    menu.querySelectorAll('[data-hcw-palette]').forEach(btn=>btn.addEventListener('click',()=>{
      state.palette=btn.dataset.hcwPalette;apply();
    }));
    menu.querySelectorAll('[data-hcw-flow]').forEach(btn=>btn.addEventListener('click',()=>{
      state.flow=btn.dataset.hcwFlow;apply();
    }));
    menu.querySelector('#hcw-atmo-opacity')?.addEventListener('input',event=>{
      state.alpha=Number(event.target.value);apply();
    });
    /* Document listeners are installed only once for SPA navigation. */
  }
  document.addEventListener('pointerdown',e=>{
    const menu=document.getElementById('hcw-atmo-menu');
    if(!menu?.hidden&&!e.target.closest('#hcw-atmo-control')){
      menu.hidden=true;
      document.getElementById('hcw-atmo-toggle')?.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    const menu=document.getElementById('hcw-atmo-menu');
    if(menu&&!menu.hidden){
      menu.hidden=true;
      const toggle=document.getElementById('hcw-atmo-toggle');
      toggle?.setAttribute('aria-expanded','false');toggle?.focus();
    }
  });

  /* Exactly the real Quartz content panels, not a global selector for every div. */
  const PANEL_SELECTOR=[
    'body[data-slug="about"] .hcw-about-v2 .education-sheet',
    'body[data-slug="about"] .hcw-about-v2 .work-card',
    'body[data-slug="about"] .hcw-about-v2 .future-frame',
    'body[data-slug="系列笔记"] .hcw-library-card',
    'body[data-slug="系列笔记"] .hcw-library-stat',
    'body[data-slug="系列笔记"] .hcw-library-shelf-shell',
    'body[data-slug="系列笔记"] .hcw-library-book',
    'body.hcw-library-volume-page .hcw-volume-panel',
    'body.hcw-library-volume-page .hcw-volume-file',
    'body.hcw-library-note-page .hcw-library-side',
    'body.hcw-library-note-page .hcw-reader-content',
    'body.hcw-library-note-page .hcw-reader-compact-bar',
    'body[data-slug="同行者"] .hcw-peer-card',
    'body[data-slug="同行者"] .hcw-support-section',
    'body[data-slug="同行者"] .hcw-support-card',
    'body[data-slug="同行者"] .hcw-feedback-stage',
    'body[data-slug="关注我"] .follow-page .social-card'
  ].join(',');
  function material(el){
    if(el.matches('.hcw-library-book'))return 'cover';
    if(el.matches('.hcw-reader-content'))return 'reader';
    if(el.matches('.hcw-library-stat,.hcw-volume-file,.hcw-support-card'))return 'inner';
    return 'panel';
  }
  function decorate(){
    document.querySelectorAll(PANEL_SELECTOR).forEach(el=>{
      if(!el.classList.contains('hcw-atmo-panel')){
        el.classList.add('hcw-atmo-panel');
        el.dataset.hcwMaterial=material(el);
        if(getComputedStyle(el).position==='static')el.style.position='relative';
      }
      if(!el.querySelector(':scope > .hcw-atmo-ring')){
        const ring=document.createElement('span');
        ring.className='hcw-atmo-ring';ring.setAttribute('aria-hidden','true');
        el.appendChild(ring);
      }
      if(el.matches('.hcw-library-book'))recolorBook(el);
    });
  }
  let pending=false;
  function schedule(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{pending=false;decorate();});
  }
  function mount(){
    bindMenu();
    root.style.setProperty('--hcw-mountain-url',`url("${photoUrl()}")`);
    apply();schedule();
  }
  const observer=new MutationObserver(records=>{
    const relevant=records.some(r=>Array.from(r.addedNodes).some(n=>{
      if(n.nodeType!==1)return false;
      return !n.classList?.contains('hcw-atmo-ring');
    }));
    if(relevant)schedule();
  });
  function start(){
    mount();
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
  document.addEventListener('nav',()=>setTimeout(mount,0));
})();
