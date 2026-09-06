(function () {
  'use strict';
  const D = window.MEDICAL353_DATA;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let tab = 'knowledge', index = 0, query = '';
  let done = JSON.parse(localStorage.getItem('medical353-progress-v1') || '{}');

  function filtered() {
    const subject = $('#subject').value;
    return D.chapters.filter(chapter => (subject === '全部' || chapter.subject === subject) && (!query || (chapter.title + ' ' + chapter.text).includes(query)));
  }
  function question(item, number) {
    const answer = item.a ? `<button class="reveal">显示参考答案</button><div class="answer">${esc(item.a)}</div>` : `<div class="status">答案位于原资料第 ${item.page || '?'} 页附近；请使用“完整原文”核对，未进行不可靠的自动串题。</div>`;
    return `<div class="block"><b>${number + 1}. ${esc(item.q)}</b><p class="muted">先口述或写出答案，再揭晓。</p>${answer}</div>`;
  }
  function bindAnswers() {
    document.querySelectorAll('.reveal').forEach(button => {
      if (button.id === 'markDone') return;
      button.onclick = () => {
        button.nextElementSibling.classList.toggle('show');
        button.textContent = button.nextElementSibling.classList.contains('show') ? '收起答案' : '显示参考答案';
      };
    });
  }
  function render() {
    const list = filtered();
    if (!list.length) { $('#content').innerHTML = '<article class="card">没有匹配内容。</article>'; return; }
    index = Math.min(index, list.length - 1);
    const chapter = list[index];
    $('#chapter').innerHTML = list.map((item, i) => `<option value="${i}">${esc(item.title)}</option>`).join('');
    $('#chapter').value = index;
    $('#pageInfo').textContent = `${index + 1}/${list.length}`;
    $('#progress').textContent = `已完成 ${Object.keys(done).length}/36 章 · 当前：${chapter.subject}`;
    if (tab === 'knowledge') {
      const formulas = chapter.formulas.length ? `<h3>本章公式/符号定位</h3>${chapter.formulas.map(formula => `<div class="formula">${esc(formula)}</div>`).join('')}` : '';
      $('#content').innerHTML = `<article class="card"><small>${chapter.subject}</small><h2>${esc(chapter.title)}</h2><h3>第一轮最低目标</h3><p>${esc(chapter.target)}</p>${chapter.sections.map(section => `<div class="block"><h3>${esc(section.title)}</h3><p>${esc(section.body)}</p></div>`).join('')}${formulas}<button id="markDone" class="reveal">${done[chapter.n] ? '✓ 本章已完成' : '标记本章已完成'}</button></article>`;
      $('#markDone').onclick = () => { done[chapter.n] = Date.now(); localStorage.setItem('medical353-progress-v1', JSON.stringify(done)); render(); };
    } else if (tab === 'questions') {
      $('#content').innerHTML = `<article class="card"><h2>${esc(chapter.title)} · 章节题</h2>${chapter.questions.length ? chapter.questions.map(question).join('') : '<p>本章题目请在“全书题库”或“完整原文”中练习。</p>'}</article>`;
    } else if (tab === 'bank') {
      const bank = D.questions.filter(item => !query || item.q.includes(query));
      $('#content').innerHTML = `<article class="card"><h2>全书检出题目 ${bank.length} 道</h2><p class="muted">能可靠配对的参考思路直接显示；其余保留原页定位，防止答案串题。题目较多时可用上方搜索框缩小范围。</p>${bank.map(question).join('')}</article>`;
    } else {
      $('#content').innerHTML = `<article class="card"><h2>${esc(chapter.title)} · 完整章节原文</h2><pre class="raw">${esc(chapter.text)}</pre></article>`;
    }
    bindAnswers();
  }
  document.querySelectorAll('[data-tab]').forEach(button => { button.onclick = () => { tab = button.dataset.tab; document.querySelectorAll('[data-tab]').forEach(item => item.classList.toggle('on', item === button)); render(); }; });
  $('#subject').onchange = () => { index = 0; render(); };
  $('#chapter').onchange = event => { index = Number(event.target.value); render(); };
  $('#search').oninput = event => { query = event.target.value.trim(); index = 0; render(); };
  $('#prev').onclick = () => { if (index > 0) { index--; render(); scrollTo(0, 0); } };
  $('#next').onclick = () => { if (index < filtered().length - 1) { index++; render(); scrollTo(0, 0); } };
  render();
}());
