import { format } from 'date-fns';

export function categorizeRecipient(recipient: string): 'email' | 'phone' {
  // Simple check for @ symbol for email
  if (recipient.includes('@')) {
    return 'email';
  }
  return 'phone';
}

export function generateRoutingLink(recipient: string, date: Date, time: string): string {
  const type = categorizeRecipient(recipient);
  const formattedDate = format(date, 'MMM d, yyyy');
  
  const text = `Hey! I've scheduled a Vaxintine for us on ${formattedDate} at ${time}. Can't wait! ❤️\n\n(Sent via Vaxintine Connect)`;
  const subject = "You've been invited to a Vaxintine! 💌";

  if (type === 'email') {
    return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  } else {
    // Clean phone number (leave only digits and +)
    const cleanNumber = recipient.replace(/[^\d+]/g, '');
    
    // Attempt standard OS detection for iOS vs Android sms link format
    const isIos = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
    const separator = isIos ? '&' : '?';
    
    return `sms:${cleanNumber}${separator}body=${encodeURIComponent(text)}`;
  }
}

export function generateBatchRoutingLinks(recipients: string[], date: Date, time: string) {
  const emails = recipients.filter(r => categorizeRecipient(r) === 'email');
  const phones = recipients.filter(r => categorizeRecipient(r) === 'phone').map(p => p.replace(/[^\d+]/g, ''));

  const formattedDate = format(date, 'MMM d, yyyy');
  const text = `Hey! I've scheduled a Vaxintine for us on ${formattedDate} at ${time}. Can't wait! ❤️\n\n(Sent via Vaxintine Connect)`;
  const subject = "You've been invited to a Vaxintine! 💌";

  let emailLink = null;
  if (emails.length > 1) {
    emailLink = `mailto:${emails.map(encodeURIComponent).join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  }

  let smsLink = null;
  if (phones.length > 1) {
    const isIos = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
    const separator = isIos ? '&' : '?';
    smsLink = `sms:${phones.join(',')}${separator}body=${encodeURIComponent(text)}`;
  }

  return { emailLink, smsLink, emailCount: emails.length, smsCount: phones.length };
}
