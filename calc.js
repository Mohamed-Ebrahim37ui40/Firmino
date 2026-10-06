// calc.js — all calculation logic. No external libraries.
const BIRO_FEDDAN_M2 = 4200;
const MIN_VISIBLE_WHEELS = 9;
const DEFAULT_SPAN_WIDTH = 1.8;

const BRANDS = {
  valley: {nameAr:"ڤالي", nameEn:"Valley", length:52},
  zimmatic: {nameAr:"زيماتيك", nameEn:"Zimmatic", length:54},
  western: {nameAr:"ويستيرن", nameEn:"Western", length:55}
};

function n(value){
  if(value === null || value === undefined || value === "") return 0;
  const s = String(value)
    .replace(/[٠-٩]/g,d=>String(d.charCodeAt(0)-1632))
    .replace(/[۰-۹]/g,d=>String(d.charCodeAt(0)-1776))
    .replace(/٫/g,".")
    .replace(/٬/g,"");
  const v = Number.parseFloat(s);
  return Number.isFinite(v) ? v : 0;
}

function roundInt(v){ return Math.round(v); }

function radiusFromArea(area){
  return Math.sqrt(Math.max(0, area) * BIRO_FEDDAN_M2 / Math.PI);
}

function totalTracksExact(area, spanWidth){
  const R = radiusFromArea(area);
  return spanWidth > 0 ? R / spanWidth : 0;
}

function cumulativeBiroArea(area, radius, distance){
  if(area <= 0 || radius <= 0 || distance <= 0) return 0;
  const d = Math.min(Math.max(distance,0), radius);
  const ratio = Math.min(1, Math.max(-1, d / radius));
  const thetaDeg = Math.asin(ratio) * 180 / Math.PI;
  const g = (radius - distance >= 0)
    ? Math.cos(thetaDeg * Math.PI / 180) * radius
    : 0;
  // This is the same structure as the Excel "الجور" sheet:
  // (2*angle*area/360) + (G*D/4200)
  return (2 * thetaDeg * area / 360) + (g * distance / BIRO_FEDDAN_M2);
}

function wheelCountFor(totalTracks, tracksPerWheel){
  if(totalTracks <= 0 || tracksPerWheel <= 0) return 0;
  return Math.ceil(totalTracks / tracksPerWheel);
}

function buildStandardCounts(totalTracksRounded, tracksPerWheel){
  const active = wheelCountFor(totalTracksRounded, tracksPerWheel);
  const counts = [];
  let remaining = totalTracksRounded;
  for(let i=0;i<active;i++){
    const take = (i === active-1) ? remaining : Math.min(tracksPerWheel, remaining);
    counts.push(Math.max(0, roundInt(take)));
    remaining -= take;
  }
  return counts;
}

function buildVisibleRows(activeCount){
  return Math.max(MIN_VISIBLE_WHEELS, activeCount);
}

function calculateWheelRows(area, spanWidth, counts){
  const R = radiusFromArea(area);
  let cumulativeTracks = 0;
  let previousArea = 0;
  return counts.map((tracks, idx)=>{
    const safeTracks = Math.max(0, roundInt(tracks));
    cumulativeTracks += safeTracks;
    const distance = Math.min(cumulativeTracks * spanWidth, R);
    const cumulativeArea = cumulativeBiroArea(area, R, distance);
    const wheelArea = Math.max(0, cumulativeArea - previousArea);
    previousArea = cumulativeArea;
    return {
      wheel: idx+1,
      tracks: safeTracks,
      distance,
      cumulativeArea,
      area: wheelArea
    };
  });
}

function appSnapshot(){
  const area = n(document.getElementById("pivotArea")?.value);
  const spanWidth = n(document.getElementById("spanWidth")?.value) || DEFAULT_SPAN_WIDTH;
  const brandId = document.getElementById("brandSelect")?.value || "zimmatic";
  const radius = radiusFromArea(area);
  const totalTracksRounded = roundInt(totalTracksExact(area,spanWidth));

  let counts = [];
  let towerLength = null;
  let tracksPerWheel = null;
  let custom = null;

  if(brandId.startsWith("saved:")){
    custom = loadSavedBrand(brandId.slice(6));
    counts = custom ? custom.userTracks.slice() : [];
    tracksPerWheel = null;
  } else if(brandId === "custom"){
    // The "custom" option is an entry point; saved custom data is used after Save.
    towerLength = BRANDS.zimmatic.length;
    tracksPerWheel = Math.max(1, roundInt(towerLength/spanWidth));
    counts = buildStandardCounts(totalTracksRounded, tracksPerWheel);
  } else {
    const brand = BRANDS[brandId] || BRANDS.zimmatic;
    towerLength = brand.length;
    tracksPerWheel = Math.max(1, roundInt(towerLength/spanWidth));
    counts = buildStandardCounts(totalTracksRounded, tracksPerWheel);
  }

  if(custom){
    // Custom saved arrays already contain the user-defined non-remainder rows.
    counts = normalizeCustomCounts(custom.userTracks, totalTracksRounded);
  }

  const activeCount = counts.length;
  const rows = calculateWheelRows(area, spanWidth, counts);
  return {
    area, spanWidth, radius, totalTracksExact: totalTracksExact(area,spanWidth),
    totalTracksRounded, towerLength, tracksPerWheel, counts, activeCount, rows, custom
  };
}

function normalizeCustomCounts(userTracks, totalTracksRounded){
  const raw = Array.isArray(userTracks) ? userTracks : [];
  const clean = [];
  let used = 0;
  // All rows except the final row are user-defined; final row is always remainder.
  for(let i=0;i<raw.length-1;i++){
    const v = Math.max(0, roundInt(n(raw[i])));
    if(v <= 0) break;
    const maxRemaining = Math.max(0, totalTracksRounded-used);
    const take = Math.min(v, maxRemaining);
    clean.push(take);
    used += take;
    if(used >= totalTracksRounded) break;
  }
  const rem = Math.max(0, totalTracksRounded-used);
  if(rem > 0) clean.push(rem);
  return clean;
}

function loadSavedBrands(){
  try{return JSON.parse(localStorage.getItem("pivotcalc-brands") || "[]") || []}
  catch(e){return []}
}
function saveSavedBrands(list){
  try{localStorage.setItem("pivotcalc-brands",JSON.stringify(list))}catch(e){}
}
function loadSavedBrand(id){
  return loadSavedBrands().find(b=>b.id===id) || null;
}

function plantingResults(){
  const weight = n(document.getElementById("avgJumboWeight")?.value);
  const jumbos = n(document.getElementById("totalJumbos")?.value);
  const area = n(document.getElementById("pivotArea")?.value);
  const qty = weight * jumbos;
  const rate = area > 0 ? qty / area : 0;
  return {weight,jumbos,qty,rate};
}
function harvestResults(){
  const jumbos = n(document.getElementById("harvestedJumbos")?.value);
  const area = n(document.getElementById("pivotArea")?.value);
  return {jumbos,rate:area>0?jumbos/area:0};
}
function plantingNeedsResults(){
  const weight=n(document.getElementById("needWeight")?.value);
  const area=n(document.getElementById("needArea")?.value);
  const rate=n(document.getElementById("needPlantRate")?.value);
  const jumbos=weight>0?(rate*area)/weight:0;
  return {weight,area,rate,jumbos,tons:jumbos*weight};
}
function harvestNeedsResults(){
  const rate=n(document.getElementById("needHarvestRate")?.value);
  const area=n(document.getElementById("needHarvestArea")?.value);
  const cap=n(document.getElementById("truckCapacity")?.value);
  const jumbos=rate*area;
  return {rate,area,cap,jumbos,trucks:cap>0?jumbos/cap:0};
}
