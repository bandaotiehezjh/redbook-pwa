(()=>{
 const targets={sentences:'sentenceEn',reading:'readingText',writing:'essayText'};
 Object.entries(targets).forEach(([screenId,textId])=>{
  const screen=document.getElementById(screenId);
  if(!screen)return;
  screen.querySelectorAll('.speech-mode').forEach(button=>{
   const previous=button.onclick;
   button.textContent='▶ '+({natural:'自然朗读',normal:'慢速朗读',slow:'逐句精听'}[button.dataset.mode]);
   button.onclick=event=>{
    if(previous)previous.call(button,event);
    const text=document.getElementById(textId)?.textContent.trim();
    if(text)window.speak(text,1,button.dataset.mode);
   };
  });
  const note=screen.querySelector('.speech-note');
  if(note)note.textContent='点击上方速度按钮，立即朗读当前英文；换速度会从本篇开头重新读。实际速度随手机语音而异，并非统一考试语速。';
  const stop=document.createElement('button');stop.textContent='停止朗读';
  stop.onclick=()=>window.speak('');
  screen.querySelector('.speech-buttons')?.appendChild(stop);
 });
 ['nextSentence','nextReading','nextEssay','nav'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>window.speak('')));
})();
