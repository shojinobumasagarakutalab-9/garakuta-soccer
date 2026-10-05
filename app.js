let currentTerm="ハイプレス",currentLevel="easy";
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function showTerm(name,level=currentLevel){
 const term=TERMS[name];
 if(!term){$("#termTitle").textContent="まだ勉強中！";$("#termLead").textContent=`「${name}」は、まだガラクサウルスの辞書に登録されていないよ！`;return;}
 currentTerm=name;currentLevel=level;$("#searchInput").value=name;
 $("#characterMessage").innerHTML=`<span style="color:#ef2c57;font-size:1.25em">${name}</span><br>について説明するよ！`;
 $("#termTitle").textContent=`${name}とは？`;$("#termLead").textContent=term.lead;updateExplanation();showPoints();showRelated();updateDiagram(term.diagram);
}
function updateExplanation(){const t=TERMS[currentTerm];$("#termDescription").textContent=t[currentLevel];$$(".level").forEach(b=>b.classList.toggle("active",b.dataset.level===currentLevel));}
function showPoints(){const t=TERMS[currentTerm];$("#pointList").innerHTML=t.points.map(x=>`<li>${x}</li>`).join("");}
function showRelated(){const t=TERMS[currentTerm];$("#relatedTerms").innerHTML=t.related.map(([n,d])=>`<button data-related="${n}">${n}<small>${d}</small></button>`).join("");$$("[data-related]").forEach(b=>b.onclick=()=>{showTerm(b.dataset.related,"easy");window.scrollTo({top:0,behavior:"smooth"})});}
function updateDiagram(type){const d=$("#fieldDiagram");d.dataset.type=type||"";$(".press").innerHTML= type==="build-up" ? "後ろから<br>つなぐ！" : type==="low-block" ? "ゴール前を<br>固める！" : type==="mid-block" ? "中盤で<br>構える！" : "前から<br>プレッシャー！";}
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();const q=$("#searchInput").value.trim();const hit=Object.keys(TERMS).find(k=>q.includes(k)||k.includes(q));showTerm(hit||q);});
$$("[data-term]").forEach(b=>b.onclick=()=>showTerm(b.dataset.term,"easy"));
$$(".level").forEach(b=>b.onclick=()=>{currentLevel=b.dataset.level;updateExplanation();});
$("#voiceButton").onclick=()=>{if(!("speechSynthesis"in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(TERMS[currentTerm][currentLevel]);u.lang="ja-JP";u.rate=1.03;speechSynthesis.speak(u);};
$("#diagramButton").onclick=()=>{const p=$("#extraPanel");p.innerHTML=`<b>📊 ${currentTerm}の図解</b><p>本番では、用語ごとにミニガラクサウルスの位置・矢印・ボール・危険エリアを切り替える専用図解を表示します。</p>`;p.classList.remove("hidden");};
$("#videoButton").onclick=()=>{const p=$("#extraPanel");const v=TERMS[currentTerm].video;p.innerHTML=`<b>▶ ${currentTerm}｜60秒解説</b><p>${v?"動画ファイルを登録するとここで再生できます。":"この用語のショート動画はまだ未登録です。"}</p>`;p.classList.remove("hidden");};
showTerm(currentTerm);