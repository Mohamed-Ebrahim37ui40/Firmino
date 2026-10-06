// main.js — application bootstrap and event wiring.
function persistInputValues(){
  const ids=["pivotArea","spanWidth","avgJumboWeight","totalJumbos","harvestedJumbos","needWeight","needArea","needPlantRate","needHarvestRate","needHarvestArea","truckCapacity"];
  const data={};
  ids.forEach(id=>{const el=document.getElementById(id);if(el)data[id]=el.value});
  try{localStorage.setItem("pivotcalc-inputs",JSON.stringify(data))}catch(e){}
}
function restoreInputValues(){
  try{
    const data=JSON.parse(localStorage.getItem("pivotcalc-inputs")||"{}");
    Object.entries(data).forEach(([id,v])=>{const el=document.getElementById(id);if(el && v!==undefined)el.value=v});
  }catch(e){}
}
function validateAndRender(){
  const area=n(document.getElementById("pivotArea").value);
  const span=n(document.getElementById("spanWidth").value);
  if(area<=0){document.getElementById("pivotArea").setCustomValidity(t("minArea"));document.getElementById("radiusOut").textContent="—";return false}
  document.getElementById("pivotArea").setCustomValidity("");
  if(span<=0){document.getElementById("spanWidth").setCustomValidity(t("minSpan"));return false}
  document.getElementById("spanWidth").setCustomValidity("");
  renderAll();persistInputValues();return true;
}

function setupInstallButton(){
  let deferred=null;
  window.addEventListener("beforeinstallprompt",e=>{
    e.preventDefault();deferred=e;
    let btn=document.getElementById("installBtn");
    if(!btn){
      btn=document.createElement("button");btn.id="installBtn";btn.className="btn primary";
      btn.textContent=currentLang==="ar"?"＋ تثبيت التطبيق":"＋ Install app";
      document.querySelector(".hero-text")?.appendChild(btn);
      btn.addEventListener("click",async()=>{
        if(!deferred)return;
        deferred.prompt();
        await deferred.userChoice;
        deferred=null;btn.remove();
      });
    }
  });
}

function initTabs(){
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".tab").forEach(x=>{x.classList.remove("active");x.setAttribute("aria-selected","false")});
      document.querySelectorAll(".tab-panel").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");btn.setAttribute("aria-selected","true");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function init(){
  restoreInputValues();
  renderBrandOptions();
  const sel=document.getElementById("brandSelect");
  if(Array.from(sel.options).some(o=>o.value===previousBrand))sel.value=previousBrand;else sel.value="zimmatic";

  applyTheme();applyLanguage();
  initTabs();setupInstallButton();

  document.getElementById("langBtn").addEventListener("click",()=>{
    currentLang=currentLang==="ar"?"en":"ar";localStorage.setItem("pivotcalc-lang",currentLang);applyLanguage();
  });
  document.getElementById("themeBtn").addEventListener("click",()=>{
    currentTheme=currentTheme==="dark"?"light":"dark";localStorage.setItem("pivotcalc-theme",currentTheme);applyTheme();
  });
  document.getElementById("ideaBtn").addEventListener("click",()=>{
    document.getElementById("infoTitle").textContent=t("ideaTitle");
    document.getElementById("infoBody").innerHTML=`<p>${t("customExplain")}</p>${I18N[currentLang].infoBody}`;
    openModal("infoOverlay");
  });
  document.getElementById("aboutBtn").addEventListener("click",showInfo);
  document.getElementById("verseBtn").addEventListener("click",()=>openModal("verseOverlay"));

  document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.dataset.close)));
  document.querySelectorAll(".modal-overlay").forEach(overlay=>overlay.addEventListener("click",e=>{if(e.target===overlay)closeModal(overlay.id)}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-overlay.active").forEach(x=>closeModal(x.id))});

  document.getElementById("pivotArea").addEventListener("input",validateAndRender);
  document.getElementById("spanWidth").addEventListener("input",()=>{
    // Keep saved custom brands as track counts; only the visible length representation changes.
    validateAndRender();renderCustomGrid();
  });
  ["avgJumboWeight","totalJumbos","harvestedJumbos","needWeight","needArea","needPlantRate","needHarvestRate","needHarvestArea","truckCapacity"]
    .forEach(id=>document.getElementById(id).addEventListener("input",()=>{renderPlanting();renderHarvest();renderNeeds();persistInputValues()}));

  document.getElementById("brandSelect").addEventListener("change",()=>{
    const v=document.getElementById("brandSelect").value;
    if(v==="custom"){
      document.getElementById("brandSelect").value=previousBrand;
      openCustom();
      return;
    }
    previousBrand=v;localStorage.setItem("pivotcalc-brand",v);renderAll();
  });
  document.getElementById("autoFillBtn").addEventListener("click",()=>{
    if(validateAndRender())renderAll();
  });
  document.getElementById("clearAreaBtn").addEventListener("click",()=>{
    document.getElementById("pivotArea").value="";
    validateAndRender();
  });

  document.getElementById("customMode").addEventListener("change",()=>{
    customMode=document.getElementById("customMode").value;
    renderCustomGrid();
  });
  document.getElementById("customAutoBtn").addEventListener("click",customAutoFill);
  document.getElementById("customClearBtn").addEventListener("click",customClear);
  document.getElementById("saveCustomBtn").addEventListener("click",saveCustom);
  document.getElementById("deleteCustomBtn").addEventListener("click",deleteCustom);
  document.getElementById("closeCustomBtn").addEventListener("click",()=>closeModal("customOverlay"));
  document.getElementById("cancelCustomBtn").addEventListener("click",()=>closeModal("customOverlay"));

  renderAll();
}

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
document.addEventListener("DOMContentLoaded",init);
