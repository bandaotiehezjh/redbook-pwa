(function () {
  let playbackToken = 0;

  function preferredEnglishVoice() {
    const voices = window.speechSynthesis.getVoices();
    const english = voices.filter(voice => /^en[-_]/i.test(voice.lang));
    return english.find(voice => /Samantha|Karen|Daniel|Moira|Serena|Ava/i.test(voice.name))
      || english.find(voice => /^en[-_]GB/i.test(voice.lang))
      || english.find(voice => /^en[-_]US/i.test(voice.lang))
      || english[0];
  }

  function splitIntoThoughtGroups(text) {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return [];
    return normalized.match(/[^,;:.!?，；：。！？]+[,;:.!?，；：。！？]?/g)
      .map(part => part.trim())
      .filter(Boolean);
  }

  function pauseAfter(part) {
    if (/[.!?。！？]$/.test(part)) return 720;
    if (/[;:；：]$/.test(part)) return 480;
    if (/[,，]$/.test(part)) return 300;
    return 220;
  }

  function playParts(parts, repeat, rate) {
    window.speechSynthesis.cancel();
    const token = ++playbackToken;
    const voice = preferredEnglishVoice();
    let round = 0;
    let index = 0;

    function playNext() {
      if (token !== playbackToken) return;
      if (round >= repeat) return;
      if (index >= parts.length) {
        round += 1;
        index = 0;
        if (round < repeat) window.setTimeout(playNext, 650);
        return;
      }

      const part = parts[index++];
      const utterance = new SpeechSynthesisUtterance(part);
      utterance.lang = voice?.lang || 'en-US';
      utterance.voice = voice || null;
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => window.setTimeout(playNext, pauseAfter(part));
      utterance.onerror = () => window.setTimeout(playNext, 250);
      window.speechSynthesis.speak(utterance);
    }

    playNext();
  }

  speak = function (text, repeat = 1) {
    const parts = splitIntoThoughtGroups(text);
    const isSingleWord = parts.length === 1 && !/\s/.test(parts[0].replace(/[.,!?;:]/g, ''));
    playParts(parts, repeat, isSingleWord ? 0.72 : 0.68);
  };

  window.speechSynthesis.onvoiceschanged = preferredEnglishVoice;

  const hint = document.createElement('p');
  hint.className = 'audio-hint';
  hint.textContent = '朗读已按意群停顿：逗号短停，分号中停，句号长停。再次点朗读可从头播放。';
  const sentenceButton = document.getElementById('listenSentence');
  sentenceButton.insertAdjacentElement('afterend', hint);
})();
