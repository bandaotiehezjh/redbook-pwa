(()=>{
  const total=words.length;

  function isMastered(index){return st.m[index]==='master'}
  function remaining(){let count=0;for(let i=0;i<total;i++)if(!isMastered(i))count++;return count}
  function nextUnmastered(from){
    for(let step=1;step<=total;step++){
      const index=(from+step)%total;
      if(!isMastered(index))return index;
    }
    return -1;
  }
  function setButtonsDisabled(disabled){
    document.querySelectorAll('[data-mark]').forEach(button=>button.disabled=disabled);
  }
  function showFinished(){
    document.getElementById('wordProgress').textContent=`已掌握 ${total} / ${total} 个`;
    document.getElementById('wordNo').textContent='CURRENT VOCABULARY COMPLETE';
    document.getElementById('word').textContent='本词库已完成';
    document.getElementById('phonetic').textContent='';
    document.getElementById('meaning').textContent=`当前版本共 ${total} 个词，不会再把已掌握词当作新词循环。`;
    document.getElementById('note').textContent='5529 个大纲词头已经全部完成。可在“已掌握”中复查记录。';
    document.getElementById('example').textContent='恭喜完成本轮考研大纲词汇。';
    document.getElementById('translation').textContent='';
    document.querySelector('.collocations')?.setAttribute('hidden','');
    setButtonsDisabled(true);
  }
  function refreshQueue(){
    const left=remaining();
    let notice=document.getElementById('vocabulary-scope-notice');
    if(!notice){
      notice=document.createElement('p');notice.id='vocabulary-scope-notice';notice.className='rule vocabulary-scope-notice';
      document.querySelector('#words .section-head').insertAdjacentElement('afterend',notice);
    }
    notice.textContent=`完整考研大纲词库：${total} 个｜尚未掌握：${left} 个｜按综合语料词频由高到低学习。`;
    if(left===0){showFinished();mastered();return}
    const current=((st.i%total)+total)%total;
    if(isMastered(current)){st.i=nextUnmastered(current);save()}
    setButtonsDisabled(false);
    document.querySelector('.collocations')?.removeAttribute('hidden');
    word();
    document.getElementById('wordProgress').textContent=`第 ${st.i+1} / ${total} 个 · 未掌握 ${left} 个`;
    mastered();
  }

  document.querySelectorAll('[data-mark]').forEach(button=>{
    button.onclick=()=>{
      const current=((st.i%total)+total)%total;
      st.m[current]=button.dataset.mark;
      st.done++;
      const next=nextUnmastered(current);
      if(next>=0)st.i=next;
      save();refreshQueue();
    };
  });
  refreshQueue();
})();
