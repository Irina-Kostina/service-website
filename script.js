document.addEventListener('DOMContentLoaded', function () {
  const emailLink = document.getElementById('email-link')
  const modal = document.getElementById('email-modal')
  const closeBtn = document.getElementById('email-close')
  const overlay = modal ? modal.querySelector('.email-modal__overlay') : null
  const copyBtn = document.getElementById('email-copy')
  const emailAddressEl = document.getElementById('email-address')

  const emailAddress = emailAddressEl ? emailAddressEl.textContent.trim() : ''

  function openModal() {
    if (!modal) return
    modal.classList.add('is-visible')
  }

  function closeModal() {
    if (!modal) return
    modal.classList.remove('is-visible')
  }

  // Open modal when clicking Email in footer
  if (emailLink) {
    emailLink.addEventListener('click', function (e) {
      e.preventDefault()
      openModal()
    })
  }

  // Close modal: X button, overlay, Esc key
  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (overlay) overlay.addEventListener('click', closeModal)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal()
  })

  // Copy email to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      if (!emailAddress) return

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddress).then(function () {
          copyBtn.textContent = 'Copied!'
          setTimeout(function () {
            copyBtn.textContent = 'Copy'
          }, 1500)
        })
      } else {
        const tempInput = document.createElement('input')
        tempInput.value = emailAddress
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempInput)

        copyBtn.textContent = 'Copied!'
        setTimeout(function () {
          copyBtn.textContent = 'Copy'
        }, 1500)
      }
    })
  }
})