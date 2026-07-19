function formatDate(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 7) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return posted.toLocaleDateString('id-ID', options);
  }
  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik lalu`;
  }
  return 'baru saja';
}

function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export { formatDate, stripHtml };
