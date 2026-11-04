export function scrollToSection(id, options = {}) {
  const element = document.getElementById(id)
  if (!element) return
  const offset = options.offset ?? 0

  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.4 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
