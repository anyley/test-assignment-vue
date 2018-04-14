const dynamicModules = {
  fractions: () => import('@/pages/Fractions'),
  websockets: () => import('@/pages/WebSockets')
}

export default ({ name, delay = 0 }) => {
  if (!dynamicModules.hasOwnProperty(name)) {
    console.error(`Module '${name}' not found\nAvailable modules:`, Object.keys(dynamicModules).join(', '))
  }

  return ({
    template: '<LoadableComponent />',
    name,

    components: {
      LoadableComponent: () => ({
        component: new Promise(resolve => setTimeout(() => resolve(dynamicModules[name]()), delay)),
        loading: {
          template: '<div class="module-loader">123</div>'
        }
      })
    }
  })
}
