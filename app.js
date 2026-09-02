const words=[
 {word:'acquire',phonetic:'/əˈkwaɪə(r)/',meaning:'v. 获得；习得',example:'Skills are acquired through repeated practice.',translation:'技能是在反复练习中习得的。'},
 {word:'consequence',phonetic:'/ˈkɒnsɪkwens/',meaning:'n. 结果；后果',example:'Every choice has a consequence.',translation:'每个选择都会带来相应的结果。'},
 {word:'maintain',phonetic:'/meɪnˈteɪn/',meaning:'v. 保持；维护；坚持认为',example:'A simple routine is easier to maintain.',translation:'简单的日常安排更容易坚持。'},
 {word:'significant',phonetic:'/sɪɡˈnɪfɪkənt/',meaning:'adj. 重要的；显著的',example:'Small efforts can produce significant change.',translation:'微小的努力也能带来显著变化。'},
 {word:'reluctant',phonetic:'/rɪˈlʌktənt/',meaning:'adj. 不情愿的；勉强的',example:'He was reluctant to change his study plan.',translation:'他不太愿意改变自己的学习计划。'}
];
let index=0;let marks=JSON.parse(localStorage.getItem('redbook-github-marks')||'{}');
const $=id=>document.getElementById(id);
function render(){const item=words[index];$('sequence').textContent=`WORD ${index+1}`;$('word').textContent=item.word;$('phonetic').textContent=item.phonetic;$('meaning').textContent=item.meaning;$('example').textContent=item.example;$('translation').textContent=item.translation;const count=Object.keys(marks).length;$('progressText').textContent=`${count} / ${words.length}`;$('progressBar').style.width=`${count/words.length*100}%`}
function speak(text,repeat=1){speechSynthesis.cancel();for(let i=0;i<repeat;i++){const voice=new SpeechSynthesisUtterance(text);voice.lang='en-US';voice.rate=.78;speechSynthesis.speak(voice)}}
$('speakWord').onclick=()=>speak(words[index].word,3);$('speakExample').onclick=()=>speak(words[index].example);
document.querySelectorAll('[data-mark]').forEach(button=>button.onclick=()=>{marks[index]=button.dataset.mark;localStorage.setItem('redbook-github-marks',JSON.stringify(marks));index=(index+1)%words.length;render()});
$('reset').onclick=()=>{marks={};index=0;localStorage.removeItem('redbook-github-marks');render()};
if(matchMedia('(display-mode: standalone)').matches)$('installState').textContent='已从主屏幕运行';
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});render();
