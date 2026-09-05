(()=>{
 const screen=document.getElementById('words');
 const panel=screen?.querySelector('.speech-panel');
 if(!panel)return;
 const currentMode=()=>localStorage.getItem('wifeSpeechMode')||'normal';
 panel.classList.add('word-speech-panel');
 panel.innerHTML='<label class="word-speech-label" for="wordSpeechMode">单词默认朗读方式</label><select id="wordSpeechMode" class="word-speech-select"><option value="natural">自然朗读</option><option value="normal">慢速朗读</option><option value="slow">逐词精听</option></select><div class="speech-note">选择后会自动记住。每次点击“不熟、模糊或掌握”，新单词一出现就按该速度朗读。</div>';
 const select=document.getElementById('wordSpeechMode');
 select.value=currentMode();
 function setMode(value){
  localStorage.setItem('wifeSpeechMode',value);
  document.querySelector('#sentences .speech-mode[data-mode="'+value+'"]')?.click();
 }
 function readCurrent(){
  const text=document.getElementById('word')?.textContent.trim();
  if(text&&text!=='本词库已完成')window.speak(text,1,currentMode());
 }
 select.addEventListener('change',()=>{setMode(select.value);readCurrent()});
 window.wordAutoRead=readCurrent;
})();
