import { problems } from './problems.js';

const $ = (selector) => document.querySelector(selector);
const memory = new Map();
const storage = {
  read(key) { if(memory.has(key)) return memory.get(key); try { return localStorage.getItem(`nextjudge:static-demo:${key}`); } catch { return null; } },
  write(key, value) { memory.set(key,value); try { localStorage.setItem(`nextjudge:static-demo:${key}`, value); return true; } catch { return false; } }
};
let locale = storage.read('locale') === 'en' ? 'en' : 'ko';
const filters = { search: '', difficulty: '', tag: '', sort: 'id-asc', bookmarked: false };
try { const saved=JSON.parse(storage.read('filters')||'{}'); for(const key of ['search','difficulty','tag']) if(typeof saved[key]==='string') filters[key]=saved[key]; if(['id-asc','id-desc','title-asc','difficulty-asc','difficulty-desc'].includes(saved.sort))filters.sort=saved.sort;filters.bookmarked=saved.bookmarked===true; } catch {}
let bookmarks=[];
try {const value=JSON.parse(storage.read('bookmarks')||'[]');if(Array.isArray(value))bookmarks=value.filter(id=>Number.isInteger(id)&&problems.some(p=>p.id===id));} catch {}
const persistFilters=()=>storage.write('filters',JSON.stringify(filters));
const filterLabel=()=>locale==='ko'?'북마크':'Bookmarked';
const toggleBookmark=id=>{bookmarks=bookmarks.includes(id)?bookmarks.filter(x=>x!==id):[...bookmarks,id];storage.write('bookmarks',JSON.stringify(bookmarks));};
const text = {
  ko: { explore:'문제 탐색',about:'데모 안내',headline:'다음 도약은,\n한 문제로부터.',sub:'작은 호기심이 더 큰 실력이 되는 곳.\n다음 도전을 만나고, 나만의 코드를 써보세요.',search:'문제 번호, 제목, 태그 검색',all:'모든 난이도',tags:'전체 태그',challenge:'문제',difficulty:'난이도',topics:'알고리즘',empty:'검색 결과가 없습니다.',back:'문제 목록',input:'입력',output:'출력',constraints:'제한',sample:'예제',code:'소스 코드',custom:'커스텀 입력 (초안 전용)',run:'실행 불가',submit:'제출 불가',saved:'이 브라우저에 초안 자동 저장됨',unsaved:'저장소를 사용할 수 없습니다. 초안은 이 탭에서만 유지됩니다.',backend:'실행·제출에는 별도의 채점 백엔드가 필요합니다. 이 정적 데모는 코드를 실행하거나 전송하지 않으며, 채점 결과나 제출 기록을 만들지 않습니다.',note:'예제 출력은 문제에 포함된 참고 자료이며, 코드를 실행한 결과가 아닙니다.',local:'브라우저 전용 초안',original:'개의 공개 오리지널 문제',practice:'생각을 코드로, 코드를 실력으로.',practiceText:'문제를 살펴보고 브라우저에 초안을 남겨보세요. 실제 실행과 채점은 제공하지 않습니다.',global:'같은 도전, 다른 언어.',globalText:'모든 문제와 안내를 한국어와 영어로 만나보세요.',aboutTitle:'작지만, 정직한 데모.',aboutSub:'NEXTJUDGE의 문제 탐색과 코드 작성 경험을 정적 사이트로 만나보세요.',available:'이 데모에서 할 수 있는 것',availableText:'공개 문제 4개 탐색 · 번호/제목/태그 검색 · 난이도와 태그 필터 · 한국어/영어 전환 · 문제별 JavaScript 초안 저장 · 정렬 · 북마크 · 랜덤 문제 · 예제 복사',unavailable:'의도적으로 포함하지 않은 것',unavailableText:'서버, API, 로그인, 실제 채점, 코드 실행, 제출 기록, 정답률, 순위는 제공하지 않습니다. 숨겨진 테스트나 개인 데이터도 포함하지 않습니다.',privacy:'내 초안은 어디에 있나요?',privacyText:'초안과 언어 설정은 현재 브라우저의 localStorage에만 저장됩니다. 업로드되거나 다른 기기와 동기화되지 않습니다. 사이트 데이터를 지우면 삭제됩니다. 공유 기기에는 민감한 정보를 입력하지 마세요.',notFound:'문제를 찾을 수 없습니다.',starter:'// JavaScript ES2020 · 정적 데모 초안\n// 이 데모에서는 코드가 실행되거나 제출되지 않습니다.\n// 여기에 풀이를 작성하세요.\n\n' },
  en: { explore:'Explore',about:'About the demo',headline:'Your next breakthrough\nstarts here.',sub:'Turn a little curiosity into a lasting skill.\nFind your next challenge. Make room for an idea.',search:'Search ID, title, or tag',all:'All difficulties',tags:'All topics',challenge:'Challenge',difficulty:'Difficulty',topics:'Topics',empty:'No matching challenges.',back:'All problems',input:'Input',output:'Output',constraints:'Constraints',sample:'Example',code:'Source code',custom:'Custom input (draft only)',run:'Run unavailable',submit:'Submit unavailable',saved:'Draft saved in this browser',unsaved:'Storage unavailable. This draft remains in this tab only.',backend:'Running and submitting require a separate judging backend. This static demo never executes or sends your code and does not create verdicts or submission records.',note:'Example outputs are published problem references, not results from running your code.',local:'Browser-only drafts',original:'public original challenges',practice:'From ideas to code. From code to skill.',practiceText:'Explore a problem. Keep a draft in your browser. Execution and judging are not provided.',global:'One challenge. More perspectives.',globalText:'Every problem and every guide is available in Korean and English.',aboutTitle:'A small demo. An honest one.',aboutSub:'Explore the NEXTJUDGE problem-solving interface, reimagined as a static site.',available:'What you can do',availableText:'Explore 4 public problems · Search by ID, title, or tag · Filter difficulty and topics · Switch Korean/English · Save per-problem JavaScript drafts · Sort · Bookmark · Random problem · Copy examples',unavailable:'Intentionally not included',unavailableText:'No server, API, login, live judging, code execution, submission history, acceptance rates, or rankings. No hidden tests or personal data are included.',privacy:'Where does my draft live?',privacyText:'Drafts and language preference are saved only in this browser’s localStorage. They are never uploaded or synced across devices. Clearing site data removes them. Do not enter sensitive information on shared devices.',notFound:'Problem not found.',starter:'// JavaScript ES2020 · static demo draft\n// This demo does not execute or submit code.\n// Write your approach here.\n\n' }
};
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const difficulty = p => `<span class="difficulty ${p.difficulty.toLowerCase()}">◆ ${p.difficulty}</span>`;
const topics = p => `<span class="tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</span>`;
const starter = () => text[locale].starter;

function renderList() {
  const t = text[locale];
  $('#main').innerHTML = `<section class="workspace"><div class="section-heading"><div><h1>${locale==='ko'?'문제':'Problems'}</h1><p class="list-description">${locale==='ko'?'공개 오리지널 문제 · JavaScript 초안 · 한국어 / English':'Original public problems · JavaScript drafts · Korean / English'}</p></div><span class="catalog-note">${problems.length} ${t.original}</span></div><div class="filters"><label class="search"><span aria-hidden="true">⌕</span><input id="search" aria-label="${t.search}" placeholder="${t.search}" value="${escape(filters.search)}"></label><select id="difficulty" aria-label="${t.difficulty}"><option value="">${t.all}</option>${['Bronze','Silver','Gold'].map(d=>`<option${filters.difficulty===d?' selected':''}>${d}</option>`).join('')}</select><select id="tag" aria-label="${t.topics}"><option value="">${t.tags}</option>${[...new Set(problems.flatMap(p=>p.tags))].map(tag=>`<option${filters.tag===tag?' selected':''}>${tag}</option>`).join('')}</select></div><div class="list-tools"><label><input id="bookmarked" type="checkbox" ${filters.bookmarked?'checked':''}>${filterLabel()}</label><button id="reset" class="reset-filters">${locale==='ko'?'필터 초기화':'Reset filters'}</button><button id="random" class="secondary random-button">${locale==='ko'?'랜덤 문제':'Random problem'}</button><select id="sort" aria-label="Sort problems">${[['id-asc','번호 ↑ / ID ↑'],['id-desc','번호 ↓ / ID ↓'],['title-asc','제목 / Title'],['difficulty-asc','난이도 ↑ / Difficulty ↑'],['difficulty-desc','난이도 ↓ / Difficulty ↓']].map(([v,n])=>`<option value="${v}"${filters.sort===v?' selected':''}>${n}</option>`).join('')}</select></div><div class="problem-table"><div class="table-head" aria-hidden="true"><span>#</span><span>${t.challenge}</span><span>${t.difficulty}</span><span>${t.topics}</span><span></span></div><div id="rows"></div></div><p id="result-count" class="sr-only" role="status"></p></section>
`;
  $('#search').addEventListener('input', e => { filters.search=e.target.value; persistFilters(); renderRows(); });
  $('#difficulty').addEventListener('change', e => { filters.difficulty=e.target.value; persistFilters(); renderRows(); });
  $('#tag').addEventListener('change', e => { filters.tag=e.target.value; persistFilters(); renderRows(); });
  $('#bookmarked').addEventListener('change',e=>{filters.bookmarked=e.target.checked;persistFilters();renderRows();});
  $('#sort').addEventListener('change',e=>{filters.sort=e.target.value;persistFilters();renderRows();});
  $('#reset').addEventListener('click',()=>{Object.assign(filters,{search:'',difficulty:'',tag:'',sort:'id-asc',bookmarked:false});persistFilters();renderList();});
  $('#random').addEventListener('click',()=>{const list=matchedProblems();if(list.length)location.hash='problem/'+list[Math.floor(Math.random()*list.length)].id;});
  renderRows();
}
function matchedProblems(){return problems.filter(p => (!filters.bookmarked || bookmarks.includes(p.id)) && (!filters.difficulty || p.difficulty===filters.difficulty) && (!filters.tag || p.tags.includes(filters.tag)) && `${p.id} ${p.title.ko} ${p.title.en} ${p.tags.join(' ')}`.toLowerCase().includes(filters.search.toLowerCase().trim())).sort((a,b)=>{const [key,dir]=filters.sort.split('-');const delta=key==='id'?a.id-b.id:key==='title'?a.title[locale].localeCompare(b.title[locale],locale):['Bronze','Silver','Gold'].indexOf(a.difficulty)-['Bronze','Silver','Gold'].indexOf(b.difficulty);return delta*(dir==='desc'?-1:1)});}
function renderRows() {
  const t = text[locale];
  const matched = matchedProblems();
  $('#rows').innerHTML = matched.map(p=>`<div class="problem-row"><span class="problem-id">${p.id}</span><a class="problem-title" href="#problem/${p.id}">${p.title[locale]}<small>${p.title[locale==='ko'?'en':'ko']}</small></a>${difficulty(p)}${topics(p)}<button class="bookmark" data-bookmark="${p.id}" aria-label="${filterLabel()} ${p.id}" aria-pressed="${bookmarks.includes(p.id)}">${bookmarks.includes(p.id)?'★':'☆'}</button></div>`).join('') || `<p class="empty">${t.empty}</p>`;
  $('#random').disabled=matched.length===0;
  document.querySelectorAll('[data-bookmark]').forEach(b=>b.addEventListener('click',()=>{toggleBookmark(Number(b.dataset.bookmark));renderRows();}));
  $('#result-count').textContent = locale==='ko' ? `${matched.length}개 문제` : `${matched.length} challenges`;
}
function renderEditor(p) {
  const t=text[locale];
  $('#main').innerHTML=`<a class="back" href="#">← ${t.back}</a><div class="problem-tabs"><span class="active">${p.id} · ${t.challenge}</span><button id="write-code">${locale==='ko'?'코드 작성':'Write code'}</button><button id="editor-bookmark" aria-pressed="${bookmarks.includes(p.id)}">${bookmarks.includes(p.id)?'★':'☆'} ${filterLabel()}</button></div><div class="editor-heading"><div><span class="eyebrow">${p.id}</span><h1>${p.title[locale]}</h1></div>${difficulty(p)}</div><div class="editor-layout"><article class="panel statement"><h2>${t.challenge}</h2><p>${p.statement[locale]}</p><h3>${t.input}</h3><p>${p.input[locale]}</p><h3>${t.output}</h3><p>${p.output[locale]}</p><h3>${t.constraints}</h3><code>${escape(p.constraints)}</code>${p.samples.map((s,i)=>`<section><h3>${t.sample} ${i+1}</h3><div class="sample-grid"><div><small>${t.input} <button class="copy" data-copy="in${i}" aria-label="${locale==='ko'?`예제 ${i+1} 입력 복사`:`Copy example ${i+1} input`}">${locale==='ko'?'복사':'Copy'}</button></small><pre>${escape(s.input)}</pre></div><div><small>${t.output} <button class="copy" data-copy="out${i}" aria-label="${locale==='ko'?`예제 ${i+1} 출력 복사`:`Copy example ${i+1} output`}">${locale==='ko'?'복사':'Copy'}</button></small><pre>${escape(s.output)}</pre></div></div></section>`).join('')}<p id="clipboard-status" class="muted" role="status" aria-atomic="true"></p><p class="reference-note">${t.note}</p>${topics(p)}</article><section class="panel code-panel" aria-label="${t.code}"><div class="code-toolbar"><label for="code">◈ JavaScript ES2020</label><span class="muted">main.js</span></div><textarea id="code" class="code-editor" aria-label="${t.code}" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea><div class="draft-note" id="draft-state" role="status">● ${t.saved}</div><label class="input-label" for="custom-input">${t.custom}</label><textarea id="custom-input" class="custom-input" spellcheck="false"></textarea><div class="code-actions"><button class="secondary" disabled aria-describedby="backend-note">▷ ${t.run}</button><button class="primary" disabled aria-describedby="backend-note">${t.submit} ↗</button></div><div class="backend-note" id="backend-note"><span class="eyebrow">STATIC DEMO / NO JUDGE</span><p>${t.backend}</p></div></section></div>`;
  $('#write-code').addEventListener('click',()=>$('#code').focus());
  $('#editor-bookmark').addEventListener('click',e=>{toggleBookmark(p.id);e.currentTarget.setAttribute('aria-pressed',String(bookmarks.includes(p.id)));e.currentTarget.textContent=(bookmarks.includes(p.id)?'★':'☆')+' '+filterLabel();});
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const key=button.dataset.copy;const sample=p.samples[Number(key.replace(/[^0-9]/g,''))];try{await navigator.clipboard.writeText(key.startsWith('in')?sample.input:sample.output);if(button.isConnected)$('#clipboard-status').textContent=locale==='ko'?'예제를 복사했습니다.':'Example copied.';}catch{if(button.isConnected)$('#clipboard-status').textContent=locale==='ko'?'클립보드 사용 불가 · 예제 텍스트를 직접 선택하세요.':'Clipboard unavailable. Select the sample text to copy.';}}));
  $('#code').value=storage.read(`draft:${p.id}`) ?? starter();
  $('#custom-input').value=storage.read(`input:${p.id}`) ?? p.samples[0].input;
  let hasEdits = storage.read(`draft:${p.id}`) !== null;
  const save = (key,value) => {const ok=storage.write(key,value); $('#draft-state').textContent=`${ok?'●':'!'} ${ok?t.saved:t.unsaved}`;};
  $('#code').addEventListener('input', e=>{hasEdits=true;save(`draft:${p.id}`,e.target.value);});
  $('#custom-input').addEventListener('input', e=>save(`input:${p.id}`,e.target.value));
  // If storage is blocked, preserve current edits across a language change in memory.
  currentDraft = () => ({id:p.id,code:$('#code').value,input:$('#custom-input').value,hasEdits});
}
let currentDraft=null;
function renderAbout() {
 const t=text[locale];
 $('#main').innerHTML=`<section class="about"><div class="eyebrow">A CLEARER PICTURE</div><h1>${t.aboutTitle}</h1><p class="about-sub">${t.aboutSub}</p><div class="about-grid">${[['01',t.available,t.availableText],['02',t.unavailable,t.unavailableText],['03',t.privacy,t.privacyText]].map(([number,title,body])=>`<article class="panel"><span class="eyebrow">${number} / STATIC BY DESIGN</span><h2>${title}</h2><p>${body}</p></article>`).join('')}</div><a class="primary cta" href="#">${t.explore} ↗</a></section>`;
}
function render() {
 const t=text[locale];
 document.documentElement.lang=locale;
 $('#explore-nav').setAttribute('aria-current',location.hash==='#about'?'false':'page');
 $('#about-nav').setAttribute('aria-current',location.hash==='#about'?'page':'false');
 $('#locale').textContent=locale==='ko'?'◎ EN':'◎ 한국어';
 $('#explore-nav').textContent=t.explore;
 $('#about-nav').textContent=t.about;
 $('#explore-nav').classList.toggle('active',location.hash!=='#about');
 $('#about-nav').classList.toggle('active',location.hash==='#about');
 currentDraft=null;
 if(location.hash==='#about') { document.title=`${t.about} · NEXTJUDGE`;renderAbout(); return; }
 const match=location.hash.match(/^#problem\/(\d+)$/);
 if(match) {
   const p=problems.find(p=>p.id===Number(match[1]));
   if(p) {document.title=`${p.title[locale]} · NEXTJUDGE Demo`;renderEditor(p);return;}
 }
 if(location.hash && location.hash!=='#') {$('#main').innerHTML=`<section class="about"><h1>${t.notFound}</h1><a class="back" href="#">← ${t.back}</a></section>`;return;}
 document.title='NEXTJUDGE · Static demo';
 renderList();
}
$('#locale').addEventListener('click',()=>{
 const draft=currentDraft?.();
 locale=locale==='ko'?'en':'ko';storage.write('locale',locale);render();
 if(draft && $('#code')) {$('#code').value=draft.hasEdits?draft.code:starter();$('#custom-input').value=draft.input;}
});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);$('#main').focus({preventScroll:true});});
render();
