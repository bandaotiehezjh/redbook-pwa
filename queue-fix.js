(()=>{
 const total=words.length,route=window.vocabularyRoute||{groups:[words.map((_,i)=>i)],labels:['全部词汇']};
 const groups=route.groups;
 const masteredAt=i=>st.m[i]==='master';
 function active(){return groups.findIndex(g=>g.some(i=>!masteredAt(i)))}
 function choose(from){
  const g=groups[active()]||[],pos=g.indexOf(from);
  for(let n=1;n<=g.length;n++){const i=g[(pos+n)%g.length];if(!masteredAt(i))return i}
  return -1;
 }
 function refreshQueue(){
  const stage=active(),left=words.reduce((n,_,i)=>n+!masteredAt(i),0);
  let notice=document.getElementById('vocabulary-scope-notice');
  if(!notice){notice=document.createElement('p');notice.id='vocabulary-scope-notice';notice.className='rule vocabulary-scope-notice';document.querySelector('#words .section-head').insertAdjacentElement('afterend',notice)}
  notice.textContent='学习路线：真题重点词 → 真题基础词 → 剩余高频与大纲词 → 基础词回补 → 阅读拓展。共 '+total+' 词，未掌握 '+left+' 词。真题阶段内按覆盖年份数降序，同频时按最近年份倒序。';
  document.querySelectorAll('[data-mark]').forEach(b=>b.disabled=stage<0);
  if(stage<0){
   document.getElementById('word').textContent='本词库已完成';
   document.getElementById('wordProgress').textContent='已掌握 '+total+' / '+total+' 个';
   ['phonetic','example','translation'].forEach(id=>document.getElementById(id).textContent='');
   document.getElementById('meaning').textContent='全部完成，不再把已掌握词作为新词循环。';
   document.getElementById('note').textContent='可在“已掌握”页面复查。';
   document.querySelector('.collocations')?.setAttribute('hidden','');
   mastered();return;
  }
  if(!st.priorityV14||!groups[stage].includes(st.i)||masteredAt(st.i)){st.i=choose(-1);st.priorityV14=true;save()}
  document.querySelector('.collocations')?.removeAttribute('hidden');
  word();
  const g=groups[stage],done=g.filter(masteredAt).length;
  document.getElementById('wordNo').textContent='STAGE '+(stage+1)+' · ITEM '+(g.indexOf(st.i)+1);
  document.getElementById('wordProgress').textContent='阶段 '+(stage+1)+' · '+route.labels[stage]+' · 已掌握 '+done+'/'+g.length;
  mastered();
 }
 document.querySelectorAll('[data-mark]').forEach(button=>button.onclick=()=>{
  if(active()<0)return;
  const current=st.i;st.m[current]=button.dataset.mark;st.done++;
  const next=choose(current);if(next>=0)st.i=next;
  save();refreshQueue();window.wordAutoRead?.();
 });
 refreshQueue();
})();
