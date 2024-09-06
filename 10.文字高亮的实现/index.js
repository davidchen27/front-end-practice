const inputEl = document.querySelector('#highlight-text-input');
const sampleTextEl = document.querySelector('.highlight-text__inner');

inputEl.addEventListener('input', _.debounce(function(event) {
  const highlightText = event.target.value;
  signHighlightText(highlightText);
}, 300, true));

function signHighlightText(highlightText) {
  if (!highlightText) return CSS.highlights.delete('find-highlight');
  const highlightRangeArr = [];
  const sampleText = sampleTextEl.textContent;
  const highlightRegex = new RegExp(highlightText, 'g');
  while ((match = highlightRegex.exec(sampleText)) !== null) {
    const range = new Range();
    range.setStart(sampleTextEl.firstChild, match.index);
    range.setEnd(sampleTextEl.firstChild, match.index + match[0].length);
    highlightRangeArr.push(range);
  }
  if (!highlightRangeArr.length) return CSS.highlights.delete('find-highlight');
  CSS.highlights.set('find-highlight', new Highlight(...highlightRangeArr.flat()));
}