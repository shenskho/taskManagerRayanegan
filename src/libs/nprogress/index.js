const NProgress = (() => {
  let progress = 0
  let timer = null
  const barId = 'nprogress'

  const ensureBar = () => {
    let bar = document.getElementById(barId)
    if (!bar) {
      bar = document.createElement('div')
      bar.id = barId
      bar.innerHTML = '<div class="bar" role="bar"></div>'
      document.body.appendChild(bar)
    }
    return bar
  }

  const set = (value) => {
    progress = Math.min(Math.max(value, 0), 1)
    const bar = ensureBar()
    const inner = bar.querySelector('.bar')
    if (inner) {
      inner.style.transform = `translate3d(${(-1 + progress) * 100}%,0,0)`
      inner.style.opacity = '1'
    }
  }

  const start = () => {
    ensureBar()
    set(0.1)
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      set(progress + (1 - progress) * 0.1)
    }, 200)
    document.body.classList.add('nprogress-busy')
    return NProgress
  }

  const done = () => {
    if (timer) clearInterval(timer)
    set(1)
    const bar = ensureBar()
    const inner = bar.querySelector('.bar')
    if (inner) {
      inner.style.opacity = '0'
    }
    setTimeout(() => {
      if (bar && bar.parentNode) {
        bar.parentNode.removeChild(bar)
      }
      document.body.classList.remove('nprogress-busy')
      progress = 0
    }, 300)
    return NProgress
  }

  const configure = () => NProgress

  return { start, done, set, configure }
})()

export default NProgress
