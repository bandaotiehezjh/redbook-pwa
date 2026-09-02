const examReadings = [
  {
    year: '2010 英语一 · Text 1',
    title: '报纸艺术评论的衰落',
    excerpt: 'Of all the changes that have taken place in English-language newspapers during the past quarter-century, perhaps the most far-reaching has been the inexorable decline in the scope and seriousness of their arts coverage.',
    translation: '在过去四分之一世纪英文报纸发生的所有变化中，影响最深远的或许是：报纸艺术报道的范围不断缩小，严肃性也不可逆转地下降。',
    guide: '句首 Of all... 给出比较范围；主干是 perhaps the most far-reaching has been the decline。that have taken place 修饰 changes；in the scope and seriousness 说明 decline 发生在哪两个方面。作者一开篇就明确表达负面判断。',
    words: 'far-reaching 影响深远的；inexorable 不可阻挡的；decline 衰落；scope 范围；coverage 新闻报道。'
  },
  {
    year: '2014 英语一 · Text 1',
    title: '求职福利制度与作者态度',
    excerpt: 'Only if the jobless arrive at the jobcentre with a CV, register for online job search, and start looking for work will they be eligible for benefit — and then they should report weekly rather than fortnightly.',
    translation: '失业者只有带着简历到就业中心、注册网上求职并开始找工作，才有资格领取福利；而且此后必须每周报到，而不是每两周一次。',
    guide: 'Only if 位于句首触发部分倒装：正常语序是 they will be eligible。三个并列动作 arrive、register、start 构成条件。rather than 表示“而不是”。阅读时要继续观察作者后文是否真正赞同这项看似合理的制度。',
    words: 'jobless 失业者；register 注册；be eligible for 有资格获得；benefit 福利；fortnightly 每两周一次。'
  },
  {
    year: '2018 英语一 · Text 1',
    title: '自动化对中产工作的影响',
    excerpt: 'Optimists point out that technological upheaval has benefited workers in the past. The Industrial Revolution eventually raised living standards and created more jobs than it destroyed.',
    translation: '乐观主义者指出，过去的技术巨变曾使劳动者受益。工业革命最终提高了生活水平，而且它创造的工作岗位多于被它摧毁的岗位。',
    guide: '第一句 that 后面是 point out 的宾语从句。第二句 created more jobs than it destroyed 是比较结构，destroyed 后省略了 jobs。注意 Optimists 是“他人观点”信号，不能直接当成全文作者结论。',
    words: 'optimist 乐观主义者；point out 指出；upheaval 巨变；eventually 最终；living standards 生活水平。'
  },
  {
    year: '2022 英语一 · Text 1',
    title: '博物馆中的塑料保存难题',
    excerpt: 'People often complain that plastics are too durable. But some plastic materials change over time. They crack and frizzle, weep out additives, and melt into sludge.',
    translation: '人们经常抱怨塑料过于耐用。然而，一些塑料材料会随着时间发生变化：它们会开裂、卷曲，渗出添加剂，甚至融化成黏稠物。',
    guide: '第一句先呈现常见认识，But 立即转折，引出文章真正讨论的问题。最后一句用三个并列谓语具体解释 change。做阅读时，转折后的内容通常比转折前更接近作者的论述重点。',
    words: 'durable 耐用的；over time 随着时间；frizzle 卷曲；additive 添加剂；sludge 黏稠物。'
  }
];

const essayTranslations = [
  {
    title: '图画作文：公共规则',
    translation: '一幅图中，几个人正在耐心排队，而另一个人试图插到别人前面。这幅图提醒我们，公共秩序不能仅靠规则维持，它还取决于个人是否愿意彼此尊重。\n\n诚然，一个小举动可能看起来并不重要。然而，当这类行为反复发生时，它们会塑造整个社会群体的氛围。因此，我们每个人都应从日常小事做起：按顺序等候、遵守明确程序，并考虑自己的行为会给他人造成何种不便。\n\n只有当规则得到日常选择的支持时，社会才能兼具效率与体谅。'
  },
  {
    title: '图画作文：坚持与成长',
    translation: '图画描绘了一个年轻人正一步一步走向远方的目标。尽管道路漫长，他仍继续前行。这幅图说明，真正有意义的进步很少来自一次轰轰烈烈的努力。\n\n现实中，许多宝贵能力都是通过反复练习建立起来的。重要的不是我们能否立刻进步，而是困难出现后，我们是否愿意重新投入任务。清晰的计划与适度的每日目标，可以把不确定变成行动。\n\n因此，我们不应等待所谓完美条件，而应重视稳定努力，并给时间机会去呈现成果。'
  },
  {
    title: '应用文：建议信',
    translation: '尊敬的先生或女士：\n\n我写信是想就拟议中的阅读计划提出几点建议。首先，应当按照难度安排阅读材料，让参与者能够选择合适的起点。此外，每次阅读结束后安排简短讨论，将有助于读者交流想法并保持动力。\n\n希望这些建议能够有所帮助。感谢您的考虑。\n\n您真诚的，\n李明'
  }
];

function ensureTranslationBlock(parentId, elementId, heading) {
  if (document.getElementById(elementId)) return;
  const host = document.getElementById(parentId);
  const block = document.createElement('div');
  block.className = 'translation-block';
  block.innerHTML = `<b>${heading}</b><p id="${elementId}"></p>`;
  host.insertAdjacentElement('afterend', block);
}

ensureTranslationBlock('readingText', 'readingTranslation', '真题摘录翻译');
ensureTranslationBlock('essayText', 'essayTranslation', '范文逐段翻译');

reading = function () {
  const item = examReadings[st.r % examReadings.length];
  $('readingTag').textContent = item.year;
  $('readingTitle').textContent = item.title;
  $('readingText').textContent = item.excerpt;
  $('readingTranslation').textContent = item.translation;
  $('excerpt').textContent = '本页英文为该年份真题中的短段落摘录；完整文章仍以你购买或保存的真题试卷为准。';
  $('readingGuide').textContent = item.guide;
  $('readingWords').textContent = item.words;
};

essay = function () {
  const item = E[st.e % E.length];
  const zh = essayTranslations[st.e % essayTranslations.length];
  $('essayTag').textContent = `背诵案例 ${st.e % E.length + 1}`;
  $('essayTitle').textContent = item[0];
  $('essayText').textContent = item[1];
  $('essayTranslation').textContent = zh.translation;
  $('essayFrame').textContent = item[2];
};

$('nextReading').onclick = () => { st.r++; save(); reading(); };
$('nextEssay').onclick = () => { st.e++; save(); essay(); };
reading();
essay();
