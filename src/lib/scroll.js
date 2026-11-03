export function scrollToSection(id) {
  const element = document.getElementById(id)
  if (!element) return

  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset: 0,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.4 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
