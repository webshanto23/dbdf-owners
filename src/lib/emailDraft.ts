export function buildGmailHref(recipient: string, subject: string, body: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipient,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildMailtoHref(recipient: string, subject: string, body: string) {
  const normalizedBody = body.replace(/\r?\n/g, "\r\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}`;
}
