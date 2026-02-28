document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('rsvpForm');
  const emailInput = document.getElementById('email');
  const msg = document.getElementById('rsvpMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = 'crimson';
      return;
    }

    // Save locally (placeholder for backend integration)
    const list = JSON.parse(localStorage.getItem('rsvpList') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('rsvpList', JSON.stringify(list));

    msg.textContent = 'Thanks — you are on the list! We will email updates.';
    msg.style.color = '#0b8043';
    form.reset();
  });

  // ticket functionality removed; no behavior currently required

  // movie inline form removed (moved to buy.html)

  // --- generic ticket page form --------------------------------------------------
  const ticketForm = document.getElementById('ticketForm');
  if (ticketForm) {
    const ticketMsg = document.getElementById('ticketMessage');
    const pageTitle = document.getElementById('pageTitle');
    const vendorUrl = 'https://example.com/vendor'; // replace with real vendor URL

    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event');
    if (eventName && pageTitle) {
      pageTitle.textContent = `Buy Tickets – ${eventName.replace(/-/g, ' ')}`;
      const hidden = document.getElementById('eventName');
      if (hidden) hidden.value = eventName;
    }

    ticketForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const qty = document.getElementById('quantity').value;
      const payment = ticketForm.payment.value;
      const eventVal = document.getElementById('eventName').value;

      if (!name || !phone || qty < 1) {
        ticketMsg.textContent = 'Please fill out all fields correctly.';
        ticketMsg.style.color = 'crimson';
        return;
      }

      const params = new URLSearchParams({ name, phone, qty, payment, event: eventVal });
      ticketMsg.textContent = 'Redirecting…';
      ticketMsg.style.color = '#0b8043';
      window.open(vendorUrl + '?' + params.toString(), '_blank', 'noopener');

      ticketForm.reset();
    });
  }

});
