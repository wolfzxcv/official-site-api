const map = {
  '&amp;': '&',
  '&#038;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&#8217;': '’',
  '&#8216;': '‘',
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8230;': '…',
  '&#8221;': '”'
};

export const decodeHtml = (content: string) => {
  return content.replace(/&[\w\d#]{2,5};/g, function (m: string) {
    return map[m as keyof typeof map];
  });
};
