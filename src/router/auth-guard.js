import { store } from '../store'

export default (to, from, next) => {
  // change title of the HTML document to the route name or meta tag
  document.title = 'c-SPOT-ify - ' + (to.meta.title ? to.meta.title : to.name)
  // document.title = to.meta.title(to)

  if (store.getters.user) {
    next()
  } else {
    store.dispatch('setOldRoute', to.name)
    next('/signin')
  }
}
