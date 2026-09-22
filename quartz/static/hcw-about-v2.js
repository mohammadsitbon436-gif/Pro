/* H.cw About v2 · Quartz SPA aware, page-scoped. */
(()=>{
  if(window.__hcwAboutV2ScriptInstalled)return;
  window.__hcwAboutV2ScriptInstalled=true;
  let cleanup=()=>{};
  function init(){
    cleanup();cleanup=()=>{};
    const root=document.querySelector('body[data-slug="about"] [data-hcw-about-v2]');
    if(!root){document.body.classList.remove('hcw-about-compact');return;}
    const screens=[...root.querySelectorAll('[data-screen]')];
    const railButtons=[...root.querySelectorAll('.rail-nav [data-target]')];
    const compact=root.querySelector('#compactIdentity');
    const toast=root.querySelector('#toast');
    const dialog=root.querySelector('#wechatDialog');
    if(screens.length!==4 || !compact || !dialog)return;
    const ac=new AbortController();const signal=ac.signal;
    cleanup=()=>{ac.abort();document.body.classList.remove('hcw-about-compact');};
    let current=0,lock=false,scrollPending=false,toastTimer=0;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const fullPage=matchMedia('(min-width:1050px) and (min-height:760px)');
    const topY=el=>el.getBoundingClientRect().top+window.scrollY;
    const update=index=>{
      current=Math.max(0,Math.min(3,index));
      document.body.classList.toggle('hcw-about-compact',current>0);
      compact.setAttribute('aria-hidden',current>0?'false':'true');
      railButtons.forEach((b,i)=>{if(i===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
      screens.forEach((s,i)=>s.classList.toggle('in-view',i===current));
    };
    const go=index=>{
      index=Math.max(0,Math.min(3,index));
      update(index);
      window.scrollTo({top:Math.max(0,topY(screens[index])-72),behavior:reduced.matches?'instant':'smooth'});
    };
    root.querySelectorAll('[data-target]').forEach(el=>{
      el.addEventListener('click',()=>go(Number(el.dataset.target)),{signal});
    });
    root.querySelectorAll('[data-go]').forEach(el=>{
      el.addEventListener('click',e=>{e.preventDefault();go(Number(el.dataset.go));},{signal});
    });
    window.addEventListener('wheel',e=>{
      if(!fullPage.matches||reduced.matches||e.ctrlKey||dialog.open)return;
      if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(Math.abs(e.deltaY)<12||Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;
      if(screens[current].scrollHeight>window.innerHeight-72+12)return;
      e.preventDefault();
      if(lock)return;
      const next=Math.max(0,Math.min(3,current+Math.sign(e.deltaY)));
      if(next===current)return;
      lock=true;go(next);
      window.setTimeout(()=>{lock=false},850);
    },{passive:false,signal});
    window.addEventListener('scroll',()=>{
      if(scrollPending)return;scrollPending=true;
      requestAnimationFrame(()=>{
        scrollPending=false;
        if(!root.isConnected)return;
        const pivot=window.scrollY+window.innerHeight*.44;
        let index=0;
        screens.forEach((s,i)=>{if(topY(s)<=pivot)index=i});
        update(index);
      });
    },{passive:true,signal});
    root.querySelectorAll('[data-unset]').forEach(el=>el.addEventListener('click',()=>{
      toast.textContent=el.dataset.unset;toast.classList.add('show');
      clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
    },{signal}));
    root.querySelectorAll('[data-wechat]').forEach(el=>el.addEventListener('click',()=>{
      if(typeof dialog.showModal==='function')dialog.showModal();
    },{signal}));
    root.querySelector('#closeWechat')?.addEventListener('click',()=>dialog.close(),{signal});
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()},{signal});
    root.addEventListener('keydown',e=>{
      if(dialog.open||e.target.closest('button,a,input,textarea,select'))return;
      if(e.key==='PageDown'){e.preventDefault();go(current+1)}
      if(e.key==='PageUp'){e.preventDefault();go(current-1)}
    },{signal});
    const hash=location.hash.slice(1);
    const hIndex=screens.findIndex(s=>s.id===hash);
    update(hIndex>=0?hIndex:0);
    if(hIndex>=0)setTimeout(()=>{if(root.isConnected)go(hIndex)},90);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  document.addEventListener('nav',()=>setTimeout(init,0));
})();