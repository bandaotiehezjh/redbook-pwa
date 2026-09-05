(()=>{
 const oldWord=window.word,data=window.EXAM_TARGET_PRIORITY;
 if(!data)return;
 window.word=function(){
  oldWord();
  let box=document.getElementById('exam-source-card');
  if(!box){box=document.createElement('section');box.id='exam-source-card';box.className='exam-source-card';document.getElementById('note').after(box)}
 const m=data.meta[st.i];
  if(!m){box.hidden=true;return}
  const genericNote=document.querySelector('.collocations .speech-note');
  if(genericNote&&genericNote.textContent.includes('5529'))genericNote.textContent='该词尚未配置独立的高频搭配；先结合上方释义和下方真题题面语境辨义。';
  box.hidden=false;
  const esc=value=>String(value||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  if(m.dictionary?.phonetic&&!document.getElementById('phonetic').textContent)document.getElementById('phonetic').textContent='/ '+m.dictionary.phonetic+' /';
  const contexts=m.contexts.map(x=>'<li><b>'+x.year+' · '+esc(x.type)+'</b><span>'+esc(x.text)+'</span></li>').join('');
  const dictionary=m.dictionary?.translation?'<div class="exam-dictionary"><b>词典补充释义</b><span>'+esc(m.dictionary.translation)+'</span></div>':'';
  box.innerHTML='<h4>真题题目与选项记录</h4><p class="exam-frequency">覆盖 <b>'+m.years.length+'</b> 个年份，共出现 <b>'+m.count+'</b> 次</p><p><b>出现年份：</b>'+m.years.join('、')+'</p><p><b>来源：</b>'+m.types.map(esc).join('、')+'</p><p><b>题面词形：</b>'+m.forms.map(esc).join('、')+'</p>'+dictionary+'<details><summary>查看题目/选项语境</summary><ul>'+contexts+'</ul></details><small>按“覆盖年份数降序 → 最近年份降序 → 总次数降序”排列。语境为题面附近的短摘录，用于辨义。</small>';
 };
 word();
})();
