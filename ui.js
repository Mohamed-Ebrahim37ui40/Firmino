// ui.js — interface, localization, rendering and interaction helpers.
const I18N = {
  ar:{
    tagline:"حاسبة البيفوت الزراعي", idea:"فكرة البرنامج", verse:"آية كريمة", about:"تعريف بالتطبيق", theme:"الوضع الداكن",
    eyebrow:"CENTER PIVOT", mainTitle:"حاسبة مساحة البيفوت ومعدلات الزراعة والحصاد",
    heroDesc:"حسابات دقيقة وتفاعلية مبنية على المعادلات الموجودة في ملف Excel المرجعي، مع دعم العمل دون اتصال.",
    offlineReady:"جاهز للعمل أوفلاين", tabArea:"حساب المساحة", tabPlant:"معدل الزراعة", tabHarvest:"معدل الحصاد", tabNeeds:"احتياجات الزراعة والحصاد",
    inputsKicker:"المدخل الوحيد", pivotInputs:"بيانات البيفوت", pivotArea:"مساحة البيفوت (فدان)", brand:"ماركة البيفوت",
    spanWidth:"عرض الجرة (متر)", autoFill:"ملء تلقائي", clear:"مسح", radius:"نصف القطر", totalTracks:"إجمالي الجرر لنصف البيفوت",
    trackUnit:"جرة", towerLength:"طول البرج الشائع", tracksPerWheel:"جرر/عجلة", biroTitle:"معادلة بيرو المستخدمة",
    formulaNote:"حيث θ = asin(d / R)، والمساحات المتتابعة = المساحة التراكمية الحالية − السابقة.",
    resultKicker:"النتيجة", wheelDistribution:"توزيع الجرر على العجلات", activeWheels:"العجلات الفعلية",
    halfArea:"مساحة نصف البيفوت", pivotAreaResult:"إجمالي مساحة البيفوت", wheelNo:"العجلة", tracksNo:"عدد الجرر",
    wheelArea:"مساحة العجلة (فدان)", distance:"البعد التراكمي (م)", tableTotal:"الإجمالي",
    areaNote:"المساحات في الجدول محسوبة لنصف البيفوت طبقًا لجدول Excel المرجعي؛ إجمالي مساحة البيفوت الكاملة يظل مساويًا للمساحة المدخلة.",
    manualInputs:"مدخلات يدوية", plantRateTitle:"معدل الزراعة", avgJumboWeight:"متوسط وزن الجامبو (طن)",
    totalJumbos:"إجمالي عدد الجامبوهات", persistentInputs:"هذه المدخلات لا تُمسح عند إعادة حساب مساحة البيفوت.",
    outputs:"المخرجات", plantResults:"نتائج الزراعة", seedQty:"إجمالي كمية التقاوي المنزرعة", ton:"طن",
    plantRate:"معدل الزراعة", tonFeddan:"طن/فدان", usesArea:"يعتمد تلقائيًا على إجمالي مساحة البيفوت من التبويب الأول.",
    harvestBox:"الحاصد", harvestRateTitle:"معدل الحصاد", harvestedJumbos:"عدد الجامبوهات المحصودة",
    harvestRate:"معدل الحصاد", jumboFeddan:"جامبو/فدان", needsPlant:"احتياجات الزراعة", plantNeedsTitle:"حساب احتياجات الزراعة",
    avgWeightTon:"متوسط وزن الجامبو (طن)", areaFeddan:"المساحة (فدان)", plantRateTonFeddan:"معدل الزراعة (طن/فدان)",
    jumbosForArea:"عدد الجامبوهات للمساحة", quantityTon:"الكمية", needsHarvest:"احتياجات الحصاد",
    harvestNeedsTitle:"حساب احتياجات الحصاد", harvestRateInput:"معدل الحصاد (جامبو/فدان)", truckCapacity:"حمولة سيارة النقل (جامبو)",
    harvestJumbos:"عدد الجامبوهات", trucks:"عدد السيارات", designer:"تصميم مهندس محمد إبراهيم (فرمينو)",
    equationFooter:"جميع المعادلات مبنية على معادلة بيرو", call:"اتصال",
    contactNote:"الروابط تحاول فتح التطبيق المثبت، وإلا تفتح نسخة الويب المتاحة للخدمة.",
    customKicker:"اختيار آخر", customTitle:"تخصيص أطوال الأبراج أو عدد الجرر", customName:"اسم الماركة",
    customMode:"طريقة الإدخال", modeTracks:"عدد الجرر", modeLength:"طول البرج (متر)",
    customHint:"العجلة الأخيرة تُحسب تلقائيًا كالمتبقي.", saveContinue:"حفظ ومتابعة", cancel:"إلغاء", deleteBrand:"حذف الماركة",
    infoTitle:"تعريف بالتطبيق", ideaTitle:"فكرة البرنامج", verseTitle:"آية كريمة", minArea:"أدخل مساحة صحيحة أكبر من صفر.",
    minSpan:"أدخل عرض جرة صحيحًا أكبر من صفر.", customNameRequired:"اكتب اسم الماركة أولًا.", noTracks:"لا توجد جرر محسوبة لهذه المساحة.",
    confirmDelete:"هل تريد حذف هذه الماركة؟", savedBrandPrefix:"★ ",
    customExplain:"صفحة اختيار آخر تسمح بتحديد عدد الجرر أو طول البرج لكل عجلة، بينما تُحسب العجلة الأخيرة من المتبقي لنصف البيفوت.",
    infoBody:`<p><strong>PivotCalc</strong> يحوّل جداول الحساب المرجعية إلى أداة تفاعلية لحساب توزيع الجرر ومساحات العجلات ومعدلات الزراعة والحصاد.</p>
      <h3>المعادلات</h3>
      <ul>
        <li>نصف القطر: <code>R = √(المساحة × 4200 ÷ π)</code>.</li>
        <li>إجمالي جرر نصف البيفوت: <code>R ÷ عرض الجرة</code> ثم التقريب لأقرب عدد صحيح.</li>
        <li>عدد الجرر للعجلة القياسية: <code>طول البرج الشائع ÷ عرض الجرة</code> ثم التقريب لأقرب عدد صحيح.</li>
        <li>المساحة التراكمية وفق صيغة Excel: <code>(2 × θ × A ÷ 360) + (G × d ÷ 4200)</code>، حيث <code>θ = asin(d/R)</code> و<code>G = cos(θ) × R</code> داخل نصف القطر.</li>
        <li>مساحة العجلة = المساحة التراكمية الحالية − السابقة.</li>
        <li>معدل الزراعة = (عدد الجامبوهات × متوسط وزن الجامبو) ÷ إجمالي المساحة.</li>
        <li>معدل الحصاد = عدد الجامبوهات المحصودة ÷ إجمالي المساحة.</li>
        <li>احتياجات الزراعة: الجامبوهات = (معدل الزراعة × المساحة) ÷ وزن الجامبو، والكمية = الجامبوهات × الوزن.</li>
        <li>احتياجات الحصاد: الجامبوهات = معدل الحصاد × المساحة، والسيارات = الجامبوهات ÷ حمولة السيارة.</li>
      </ul>
      <p>البرنامج لا يحتاج إلى اتصال بعد تحميله لأول مرة على الاستضافة؛ ملفات التطبيق المحلية تُخزّن بواسطة Service Worker.</p>`
  },
  en:{
    tagline:"Center Pivot Calculator", idea:"Program idea", verse:"Verse", about:"About", theme:"Dark mode",
    eyebrow:"CENTER PIVOT", mainTitle:"Pivot Area, Planting & Harvest Calculator",
    heroDesc:"Accurate interactive calculations based on the formulas in the supplied Excel reference, with offline support.",
    offlineReady:"Offline ready", tabArea:"Area", tabPlant:"Planting rate", tabHarvest:"Harvest rate", tabNeeds:"Planting & harvest needs",
    inputsKicker:"Main input", pivotInputs:"Pivot data", pivotArea:"Pivot area (Feddan)", brand:"Pivot brand",
    spanWidth:"Track width (m)", autoFill:"Auto-fill", clear:"Clear", radius:"Radius", totalTracks:"Total tracks for half pivot",
    trackUnit:"tracks", towerLength:"Common tower length", tracksPerWheel:"Tracks / wheel", biroTitle:"Biro equation used",
    formulaNote:"θ = asin(d / R), and each wheel area is current cumulative area minus the previous cumulative area.",
    resultKicker:"Result", wheelDistribution:"Track distribution by wheel", activeWheels:"Active wheels",
    halfArea:"Half-pivot area", pivotAreaResult:"Total pivot area", wheelNo:"Wheel", tracksNo:"Tracks",
    wheelArea:"Wheel area (Feddan)", distance:"Cumulative distance (m)", tableTotal:"Total",
    areaNote:"Table areas are for the half pivot, matching the reference Excel sheet; the complete pivot area remains equal to the entered area.",
    manualInputs:"Manual inputs", plantRateTitle:"Planting rate", avgJumboWeight:"Average jumbo weight (ton)",
    totalJumbos:"Total jumbos", persistentInputs:"These inputs are preserved when pivot area is recalculated.",
    outputs:"Outputs", plantResults:"Planting results", seedQty:"Total planted seed quantity", ton:"ton",
    plantRate:"Planting rate", tonFeddan:"ton/Feddan", usesArea:"Uses total pivot area from the first tab automatically.",
    harvestBox:"Harvester", harvestRateTitle:"Harvest rate", harvestedJumbos:"Harvested jumbos",
    harvestRate:"Harvest rate", jumboFeddan:"jumbos/Feddan", needsPlant:"Planting needs", plantNeedsTitle:"Planting requirements",
    avgWeightTon:"Average jumbo weight (ton)", areaFeddan:"Area (Feddan)", plantRateTonFeddan:"Planting rate (ton/Feddan)",
    jumbosForArea:"Jumbos for area", quantityTon:"Quantity", needsHarvest:"Harvest needs",
    harvestNeedsTitle:"Harvest requirements", harvestRateInput:"Harvest rate (jumbos/Feddan)", truckCapacity:"Truck capacity (jumbos)",
    harvestJumbos:"Jumbos", trucks:"Trucks", designer:"Designed by Eng. Mohamed Ibrahim (Fermineo)",
    equationFooter:"All equations are based on the Biro equation", call:"Call",
    contactNote:"Links attempt to open the installed app first, otherwise the service's web version.",
    customKicker:"Other / Custom", customTitle:"Customize tower lengths or track counts", customName:"Brand name",
    customMode:"Input mode", modeTracks:"Number of tracks", modeLength:"Tower length (m)",
    customHint:"The last wheel is calculated automatically as the remaining value.", saveContinue:"Save & continue", cancel:"Cancel", deleteBrand:"Delete brand",
    infoTitle:"About the app", ideaTitle:"Program idea", verseTitle:"Verse", minArea:"Enter an area greater than zero.",
    minSpan:"Enter a track width greater than zero.", customNameRequired:"Enter a brand name first.", noTracks:"No tracks are calculated for this area.",
    confirmDelete:"Delete this brand?", savedBrandPrefix:"★ ",
    customExplain:"The Other/Custom page lets you define tracks or tower length for each wheel; the last wheel is always the remaining half-pivot tracks.",
    infoBody:`<p><strong>PivotCalc</strong> turns the supplied reference tables into an interactive calculator for track distribution, wheel areas, planting and harvest rates.</p>
      <h3>Equations</h3>
      <ul>
        <li>Radius: <code>R = √(area × 4200 ÷ π)</code>.</li>
        <li>Half-pivot tracks: <code>R ÷ track width</code>, rounded to the nearest integer.</li>
        <li>Standard tracks per wheel: <code>common tower length ÷ track width</code>, rounded to the nearest integer.</li>
        <li>Excel cumulative-area formula: <code>(2 × θ × A ÷ 360) + (G × d ÷ 4200)</code>, with <code>θ = asin(d/R)</code> and <code>G = cos(θ) × R</code> inside the radius.</li>
        <li>Wheel area = current cumulative area − previous cumulative area.</li>
        <li>Planting rate = (jumbos × average jumbo weight) ÷ total area.</li>
        <li>Harvest rate = harvested jumbos ÷ total area.</li>
        <li>Planting needs: jumbos = (planting rate × area) ÷ jumbo weight; quantity = jumbos × weight.</li>
        <li>Harvest needs: jumbos = harvest rate × area; trucks = jumbos ÷ truck capacity.</li>
      </ul>
      <p>The app works without network access after its first load on a web host because its local assets are cached by the Service Worker.</p>`
  }
};

let currentLang = localStorage.getItem("pivotcalc-lang") || "ar";
let currentTheme = localStorage.getItem("pivotcalc-theme") || "light";
let previousBrand = localStorage.getItem("pivotcalc-brand") || "zimmatic";
let customEditId = null;
let customDraftTracks = [];
let customMode = "tracks";

function t(k){return I18N[currentLang][k] ?? k}

function applyLanguage(){
  const root=document.documentElement;
  root.lang=currentLang; root.dir=currentLang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.getAttribute("data-i18n");
    if(I18N[currentLang][key]!==undefined) el.textContent=I18N[currentLang][key];
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el=>{
    const key=el.getAttribute("data-i18n-title");
    if(I18N[currentLang][key]!==undefined) el.title=I18N[currentLang][key];
  });
  document.getElementById("langBtn").textContent=currentLang==="ar"?"EN":"ع";
  document.getElementById("themeBtn").textContent=currentTheme==="dark"?"☀️":"🌙";
  renderBrandOptions();
  renderAll();
  renderCustomGrid();
}

function applyTheme(){
  document.documentElement.dataset.theme=currentTheme==="dark"?"dark":"";
  document.getElementById("themeBtn").textContent=currentTheme==="dark"?"☀️":"🌙";
}

function setValue(id,v){const el=document.getElementById(id);if(el && v!==null && v!==undefined)el.value=v}
function format(v,dec=3){return Number.isFinite(v)?v.toFixed(dec):"—"}

function renderBrandOptions(){
  const sel=document.getElementById("brandSelect");
  if(!sel)return;
  const current=sel.value || previousBrand;
  sel.innerHTML="";
  Object.entries(BRANDS).forEach(([id,b])=>{
    const o=document.createElement("option");o.value=id;
    o.textContent=currentLang==="ar"?`${b.nameAr} — ${b.length} م`:`${b.nameEn} — ${b.length} m`;
    sel.appendChild(o);
  });
  loadSavedBrands().forEach(b=>{
    const o=document.createElement("option");o.value="saved:"+b.id;o.textContent=t("savedBrandPrefix")+b.name;sel.appendChild(o);
  });
  const custom=document.createElement("option");custom.value="custom";custom.textContent=currentLang==="ar"?"اختيار آخر…":"Other / Custom…";sel.appendChild(custom);
  if(Array.from(sel.options).some(o=>o.value===current))sel.value=current;else sel.value="zimmatic";
}

function renderAll(){
  if(!document.getElementById("pivotArea"))return;
  const snap=appSnapshot();
  document.getElementById("radiusOut").textContent=format(snap.radius,3);
  document.getElementById("totalTracksOut").textContent=String(snap.totalTracksRounded);
  document.getElementById("towerLengthOut").textContent=snap.towerLength?format(snap.towerLength,1):"—";
  document.getElementById("tracksPerWheelOut").textContent=snap.tracksPerWheel?String(snap.tracksPerWheel):"مخصص";
  document.getElementById("activeWheelsOut").textContent=String(snap.activeCount);
  const half=snap.rows.length?snap.rows[snap.rows.length-1].cumulativeArea:0;
  document.getElementById("halfAreaOut").textContent=format(half,3);
  document.getElementById("totalAreaOut").textContent=format(snap.area,3);

  const body=document.getElementById("wheelTableBody");
  body.innerHTML="";
  const visible=buildVisibleRows(snap.activeCount);
  for(let i=0;i<visible;i++){
    const r=snap.rows[i];
    const tr=document.createElement("tr");
    if(i===snap.activeCount-1)tr.classList.add("last-row");
    if(!r)tr.classList.add("inactive");
    if(r){
      tr.innerHTML=`<td><strong>${r.wheel}</strong></td><td>${r.tracks}</td><td>${format(r.area,4)}</td><td>${format(r.distance,3)}</td>`;
    }else{
      tr.innerHTML=`<td>${i+1}</td><td>—</td><td>—</td><td>—</td>`;
    }
    body.appendChild(tr);
  }
  const sumTracks=snap.rows.reduce((s,r)=>s+r.tracks,0);
  const sumArea=snap.rows.reduce((s,r)=>s+r.area,0);
  document.getElementById("sumTracks").textContent=String(sumTracks);
  document.getElementById("sumHalfArea").textContent=format(sumArea,4);
  renderPlanting();
  renderHarvest();
  renderNeeds();
}

function renderPlanting(){
  const r=plantingResults();
  document.getElementById("seedQtyOut").textContent=format(r.qty,3);
  document.getElementById("plantRateOut").textContent=format(r.rate,3);
}
function renderHarvest(){
  const r=harvestResults();
  document.getElementById("harvestRateOut").textContent=format(r.rate,3);
}
function renderNeeds(){
  const p=plantingNeedsResults(), h=harvestNeedsResults();
  document.getElementById("needPlantJumbos").textContent=format(p.jumbos,2);
  document.getElementById("needPlantTons").textContent=`${format(p.tons,3)} ${t("ton")}`;
  document.getElementById("needHarvestJumbos").textContent=format(h.jumbos,2);
  document.getElementById("needTrucks").textContent=format(h.trucks,2);
}

function openModal(id){const e=document.getElementById(id);if(e){e.classList.add("active");e.setAttribute("aria-hidden","false")}}
function closeModal(id){const e=document.getElementById(id);if(e){e.classList.remove("active");e.setAttribute("aria-hidden","true")}}

function showInfo(){
  document.getElementById("infoTitle").textContent=t("infoTitle");
  document.getElementById("infoBody").innerHTML=I18N[currentLang].infoBody;
  openModal("infoOverlay");
}

function openCustom(editId=null){
  customEditId=editId;
  const saved=editId?loadSavedBrand(editId):null;
  document.getElementById("customName").value=saved?saved.name:t("customName");
  customMode=saved?.mode || "tracks";
  document.getElementById("customMode").value=customMode;
  if(saved) customDraftTracks=saved.userTracks.slice();
  else customDraftTracks=[];
  openModal("customOverlay");
  renderCustomGrid();
  if(!saved) customAutoFill();
  document.getElementById("deleteCustomBtn").classList.toggle("hidden",!saved);
}

function customActiveCount(){
  const total=appSnapshot().totalTracksRounded;
  let used=0,count=0;
  for(const v of customDraftTracks){
    const x=Math.max(0,roundInt(n(v)));
    if(x<=0)break;
    used+=x;count++;
    if(used>=total)break;
  }
  const rem=Math.max(0,total-used);
  return rem>0?count+1:Math.max(1,count);
}
function getCustomUserRows(){
  const total=appSnapshot().totalTracksRounded;
  const out=[];let used=0;
  for(let i=0;i<Math.max(0,customDraftTracks.length-1);i++){
    const x=Math.max(0,roundInt(n(customDraftTracks[i])));
    if(x<=0)break;
    const take=Math.min(x,Math.max(0,total-used));
    if(take<=0)break;
    out.push(take);used+=take;
    if(used>=total)break;
  }
  return out;
}
function customRemainder(){
  const total=appSnapshot().totalTracksRounded;
  return Math.max(0,total-getCustomUserRows().reduce((a,b)=>a+b,0));
}
function renderCustomGrid(){
  const grid=document.getElementById("customGrid"); if(!grid)return;
  const total=appSnapshot().totalTracksRounded;
  const active=Math.max(1,customActiveCount());
  const visible=Math.max(MIN_VISIBLE_WHEELS,active);
  const user=getCustomUserRows();
  const rem=customRemainder();
  grid.innerHTML="";
  for(let i=0;i<visible;i++){
    const item=document.createElement("div");item.className="custom-item";
    const isLast=i===active-1;
    if(isLast)item.classList.add("last");
    if(i>=active)item.classList.add("disabled");
    const val=isLast ? (customMode==="length"?rem*appSnapshot().spanWidth:rem) : (user[i]||"");
    item.innerHTML=`<label>${t("wheelNo")} ${i+1}</label>
      <input type="number" min="0" step="${customMode==="length"?"0.01":"1"}" ${isLast?"readonly":""} value="${val!==""?Number(val).toFixed(customMode==="length"?2:0):""}" data-index="${i}">
      <span class="unit">${customMode==="length"?"m":t("trackUnit")}</span>`;
    const input=item.querySelector("input");
    if(!isLast && i<active){
      input.addEventListener("input",()=>{
        const val=n(input.value);
        const tracks=customMode==="length"?roundInt(val/appSnapshot().spanWidth):roundInt(val);
        customDraftTracks[i]=Math.max(0,tracks);
        renderCustomGridPreserve(i);
      });
    }
    grid.appendChild(item);
  }
}
function renderCustomGridPreserve(focusIndex){
  const activeEl=document.querySelector(`#customGrid input[data-index="${focusIndex}"]`);
  const caret=activeEl?activeEl.selectionStart:null;
  renderCustomGrid();
  const next=document.querySelector(`#customGrid input[data-index="${focusIndex}"]`);
  if(next){next.focus();if(caret!==null){try{next.setSelectionRange(caret,caret)}catch(e){}}}
}
function customAutoFill(){
  const snap=appSnapshot();
  const per=Math.max(1,roundInt((BRANDS.zimmatic.length)/snap.spanWidth));
  const total=snap.totalTracksRounded;
  const arr=[];let rem=total;
  while(rem>per){arr.push(per);rem-=per}
  if(rem>0)arr.push(rem);
  customDraftTracks=arr;
  renderCustomGrid();
}
function customClear(){customDraftTracks=[];renderCustomGrid()}
function saveCustom(){
  const name=document.getElementById("customName").value.trim();
  if(!name){alert(t("customNameRequired"));return}
  const snap=appSnapshot();const tracks=normalizeCustomCounts(customDraftTracks,snap.totalTracksRounded);
  if(!tracks.length){alert(t("noTracks"));return}
  const list=loadSavedBrands();
  const id=customEditId || ("b"+Date.now().toString(36));
  const record={id,name,userTracks:tracks,mode:customMode};
  const idx=list.findIndex(x=>x.id===id);
  if(idx>=0)list[idx]=record;else list.push(record);
  saveSavedBrands(list);
  previousBrand="saved:"+id;localStorage.setItem("pivotcalc-brand",previousBrand);
  renderBrandOptions();document.getElementById("brandSelect").value=previousBrand;
  closeModal("customOverlay");renderAll();
}
function deleteCustom(){
  if(!customEditId)return;
  if(!confirm(t("confirmDelete")))return;
  saveSavedBrands(loadSavedBrands().filter(x=>x.id!==customEditId));
  previousBrand="zimmatic";localStorage.setItem("pivotcalc-brand",previousBrand);
  renderBrandOptions();document.getElementById("brandSelect").value=previousBrand;
  closeModal("customOverlay");renderAll();
}
