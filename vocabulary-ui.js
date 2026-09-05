(()=>{
  const oldSeedWords=['acquire','adapt','advocate','approach','assess','available','benefit','challenge','consequence','contribute','crucial','decline','demonstrate','derive','establish','evident','feature','maintain','modify','perceive','potential','significant','reluctant','sustain','undergo','illustrate','indicate','interpret','justify','reveal'];

  if(!st.vocab5529Migrated){
    const oldMarks={...st.m};
    st.m={};
    oldSeedWords.forEach((headword,oldIndex)=>{
      if(!oldMarks[oldIndex])return;
      const newIndex=words.findIndex(item=>item.a.toLowerCase()===headword);
      if(newIndex>=0)st.m[newIndex]=oldMarks[oldIndex];
    });
    st.i=0;
    st.vocab5529Migrated=true;
    save();
  }

  const baseWord=window.word;
  window.word=function(){
    baseWord();
    const item=words[((st.i%words.length)+words.length)%words.length];
    document.getElementById('wordNo').textContent='VOCABULARY · '+String(st.i+1).padStart(4,'0');
    document.getElementById('listenExample').hidden=!item.d;
    document.getElementById('listenExample').style.display=item.d?'':'none';
    const slowExample=document.querySelector('[data-slow-for="listenExample"]');
    if(slowExample){slowExample.hidden=!item.d;slowExample.style.display=item.d?'':'none'}
  };
  word();
})();
