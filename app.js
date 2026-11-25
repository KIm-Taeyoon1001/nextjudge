import { problems } from './problems.js';

const $ = (selector) => document.querySelector(selector);
const memory = new Map();
const storage = {
  read(key) { if(memory.has(key)) return memory.get(key); try { return localStorage.getItem(`nextjudge:static-demo:${key}`); } catch { return null; } },
  write(key, value) { memory.set(key,value); try { localStorage.setItem(`nextjudge:static-demo:${key}`, value); return true; } catch { return false; } }
};
let locale = storage.read('locale') === 'en' ? 'en' : 'ko';
const filters = { search: '', difficulty: '', tag: '' };
const text = {
  ko: { explore:'문제 탐색',about:'데모 안내',headline:'다음 도약은,\n한 문제로부터.',sub:'작은 호기심이 더 큰 실력이 되는 곳.\n다음 도전을 만나고, 나만의 코드를 써보세요.',search:'문제 번호, 제목, 태그 검색',all:'모든 난이도',tags:'전체 태그',challenge:'문제',difficulty:'난이도',topics:'알고리즘',empty:'검색 결과가 없습니다.',back:'문제 목록',input:'입력',output:'출력',constraints:'제한',sample:'예제',code:'소스 코드',custom:'커스텀 입력 (초안 전용)',run:'실행 불가',submit:'제출 불가',saved:'이 브라우저에 초안 자동 저장됨',unsaved:'저장소를 사용할 수 없습니다. 초안은 이 탭에서만 유지됩니다.',backend:'실행·제출에는 별도의 채점 백엔드가 필요합니다. 이 정적 데모는 코드를 실행하거나 전송하지 않으며, 채점 결과나 제출 기록을 만들지 않습니다.',note:'예제 출력은 문제에 포함된 참고 자료이며, 코드를 실행한 결과가 아닙니다.',local:'브라우저 전용 초안',original:'개의 공개 오리지널 문제',practice:'생각을 코드로, 코드를 실력으로.',practiceText:'문제를 살펴보고 브라우저에 초안을 남겨보세요. 실제 실행과 채점은 제공하지 않습니다.',global:'같은 도전, 다른 언어.',globalText:'모든 문제와 안내를 한국어와 영어로 만나보세요.',aboutTitle:'작지만, 정직한 데모.',aboutSub:'NEXTJUDGE의 문제 탐색과 코드 작성 경험을 정적 사이트로 만나보세요.',available:'이 데모에서 할 수 있는 것',availableText:'공개 문제 4개 탐색 · 번호/제목/태그 검색 · 난이도와 태그 필터 · 한국어/영어 전환 · 문제별 JavaScript 초안 저장',unavailable:'의도적으로 포함하지 않은 것',unavailableText:'서버, API, 로그인, 실제 채점, 코드 실행, 제출 기록, 정답률, 순위는 제공하지 않습니다. 숨겨진 테스트나 개인 데이터도 포함하지 않습니다.',privacy:'내 초안은 어디에 있나요?',privacyText:'초안과 언어 설정은 현재 브라우저의 localStorage에만 저장됩니다. 업로드되거나 다른 기기와 동기화되지 않습니다. 사이트 데이터를 지우면 삭제됩니다. 공유 기기에는 민감한 정보를 입력하지 마세요.',notFound:'문제를 찾을 수 없습니다.',starter:'// JavaScript ES2020 · 정적 데모 초안\n// 이 데모에서는 코드가 실행되거나 제출되지 않습니다.\n// 여기에 풀이를 작성하세요.\n\n' },
  en: { explore:'Explore',about:'About the demo',headline:'Your next breakthrough\nstarts here.',sub:'Turn a little curiosity into a lasting skill.\nFind your next challenge. Make room for an idea.',search:'Search ID, title, or tag',all:'All difficulties',tags:'All topics',challenge:'Challenge',difficulty:'Difficulty',topics:'Topics',empty:'No matching challenges.',back:'All problems',input:'Input',output:'Output',constraints:'Constraints',sample:'Example',code:'Source code',custom:'Custom input (draft only)',run:'Run unavailable',submit:'Submit unavailable',saved:'Draft saved in this browser',unsaved:'Storage unavailable. This draft remains in this tab only.',backend:'Running and submitting require a separate judging backend. This static demo never executes or sends your code and does not create verdicts or submission records.',note:'Example outputs are published problem references, not results from running your code.',local:'Browser-only drafts',original:'public original challenges',practice:'From ideas to code. From code to skill.',practiceText:'Explore a problem. Keep a draft in your browser. Execution and judging are not provided.',global:'One challenge. More perspectives.',globalText:'Every problem and every guide is available in Korean and English.',aboutTitle:'A small demo. An honest one.',aboutSub:'Explore the NEXTJUDGE problem-solving interface, reimagined as a static site.',available:'What you can do',availableText:'Explore 4 public problems · Search by ID, title, or tag · Filter difficulty and topics · Switch Korean/English · Save per-problem JavaScript drafts',unavailable:'Intentionally not included',unavailableText:'No server, API, login, live judging, code execution, submission history, acceptance rates, or rankings. No hidden tests or personal data are included.',privacy:'Where does my draft live?',privacyText:'Drafts and language preference are saved only in this browser’s localStorage. They are never uploaded or synced across devices. Clearing site data removes them. Do not enter sensitive information on shared devices.',notFound:'Problem not found.',starter:'// JavaScript ES2020 · static demo draft\n// This demo does not execute or submit code.\n// Write your approach here.\n\n' }
};
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const difficulty = p => `<span class="difficulty ${p.difficulty.toLowerCase()}">◆ ${p.difficulty}</span>`;
const topics = p => `<span class="tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</span>`;
const starter = () => text[locale].starter;

function renderList() {
  const t = text[locale];
  $('#main').innerHTML = `<section class="hero"><div><div class="eyebrow"><span class="live-dot"></span> BUILD. SOLVE. GROW.</div><h1>${t.headline.replace('\n','<br>')}</h1><p>${t.sub.replace('\n','<br>')}</p><div class="hero-meta"><span>↗ ${problems.length} ${t.original}</span><span>◈ JavaScript ES2020</span><span>◎ 한국어 / English</span></div></div><div class="orbit-art" aria-hidden="true"><div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div><div class="orbit-core">&lt;/&gt;</div><i class="star s1"></i><i class="star s2"></i><span class="float-tag">IDEAS IN ORBIT</span></div></section>
  <section class="workspace"><div class="section-heading"><h2>${t.explore}<span>04</span></h2><span class="muted">${t.local}</span></div><div class="filters"><label class="search"><span aria-hidden="true">⌕</span><input id="search" aria-label="${t.search}" placeholder="${t.search}" value="${escape(filters.search)}"></label><select id="difficulty" aria-label="${t.difficulty}"><option value="">${t.all}</option>${['Bronze','Silver','Gold'].map(d=>`<option${filters.difficulty===d?' selected':''}>${d}</option>`).join('')}</select><select id="tag" aria-label="${t.topics}"><option value="">${t.tags}</option>${[...new Set(problems.flatMap(p=>p.tags))].map(tag=>`<option${filters.tag===tag?' selected':''}>${tag}</option>`).join('')}</select></div><div class="problem-table"><div class="table-head" aria-hidden="true"><span>#</span><span>${t.challenge}</span><span>${t.difficulty}</span><span>${t.topics}</span><span></span></div><div id="rows"></div></div><p id="result-count" class="sr-only" role="status"></p></section>
  <div class="bottom-cards"><div><span>01 / PRACTICE WITH PURPOSE</span><h3>${t.practice}</h3><p>${t.practiceText}</p></div><div><span>02 / GLOBAL BY DEFAULT</span><h3>${t.global}</h3><p>${t.globalText}</p></div></div>`;
  $('#search').addEventListener('input', e => { filters.search=e.target.value; renderRows(); });
  $('#difficulty').addEventListener('change', e => { filters.difficulty=e.target.value; renderRows(); });
  $('#tag').addEventListener('change', e => { filters.tag=e.target.value; renderRows(); });
  renderRows();
}
function renderRows() {
  const t = text[locale];
  const matched = problems.filter(p => (!filters.difficulty || p.difficulty===filters.difficulty) && (!filters.tag || p.tags.includes(filters.tag)) && `${p.id} ${p.title.ko} ${p.title.en} ${p.tags.join(' ')}`.toLowerCase().includes(filters.search.toLowerCase().trim()));
  $('#rows').innerHTML = matched.map(p=>`<a class="problem-row" href="#problem/${p.id}"><span class="problem-id">${p.id}</span><span class="problem-title">${p.title[locale]}<small>${p.title[locale==='ko'?'en':'ko']}</small></span>${difficulty(p)}${topics(p)}<span class="row-arrow" aria-hidden="true">↗</span></a>`).join('') || `<p class="empty">${t.empty}</p>`;
  $('#result-count').textContent = locale==='ko' ? `${matched.length}개 문제` : `${matched.length} challenges`;
}
function renderEditor(p) {
  const t=text[locale];
  $('#main').innerHTML=`<a class="back" href="#">← ${t.back}</a><div class="editor-heading"><div><span class="eyebrow">CHALLENGE ${p.id}</span><h1>${p.title[locale]}</h1></div>${difficulty(p)}</div><div class="editor-layout"><article class="panel statement"><h2>${t.challenge}</h2><p>${p.statement[locale]}</p><h3>${t.input}</h3><p>${p.input[locale]}</p><h3>${t.output}</h3><p>${p.output[locale]}</p><h3>${t.constraints}</h3><code>${escape(p.constraints)}</code>${p.samples.map((s,i)=>`<section><h3>${t.sample} ${i+1}</h3><div class="sample-grid"><div><small>${t.input}</small><pre>${escape(s.input)}</pre></div><div><small>${t.output}</small><pre>${escape(s.output)}</pre></div></div></section>`).join('')}<p class="reference-note">${t.note}</p>${topics(p)}</article><section class="panel code-panel" aria-label="${t.code}"><div class="code-toolbar"><label for="code">◈ JavaScript ES2020</label><span class="muted">main.js</span></div><textarea id="code" class="code-editor" aria-label="${t.code}" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea><div class="draft-note" id="draft-state" role="status">● ${t.saved}</div><label class="input-label" for="custom-input">${t.custom}</label><textarea id="custom-input" class="custom-input" spellcheck="false"></textarea><div class="code-actions"><button class="secondary" disabled aria-describedby="backend-note">▷ ${t.run}</button><button class="primary" disabled aria-describedby="backend-note">${t.submit} ↗</button></div><div class="backend-note" id="backend-note"><span class="eyebrow">STATIC DEMO / NO JUDGE</span><p>${t.backend}</p></div></section></div>`;
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
