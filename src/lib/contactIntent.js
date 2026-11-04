export const CONTACT_INTENT_EVENT = 'webnova:contact-intent'

export const PROJECT_SERVICE_BY_CATEGORY = {
  'Business Websites': 'Business Website',
  'Online Stores': 'Online Store',
  'Custom Web Apps': 'Custom Web App',
  'Portfolios & Landing Pages': 'Portfolio / Landing Page',
}

export function requestContactIntent(service) {
  if (typeof window === 'undefined' || !service) return
  window.dispatchEvent(
    new CustomEvent(CONTACT_INTENT_EVENT, {
      detail: { service },
    }),
  )
}
