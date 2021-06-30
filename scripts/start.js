const Hapi = require('@hapi/hapi')
const path = require('path')

const port = process.env.PORT || 3000

const FILES = /\.(js|js.map|css|css.map|woff|woff2|svg|bmp|jpg|jpeg|gif|png|ico)(\?v=\d+\.\d+\.\d+)?$/

const PATH = {
  '/': 'index.html',
}

const init = async () => {
  const server = Hapi.server({
    port,
  })

  await server.register(require('@hapi/inert'))

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, h) => {
      console.log({
        path: request.path,
        cwd: process.cwd(),
      })
      if (FILES.test(request.path)) {
        return h.file(path.join(process.cwd(), 'dist', request.path))
      }

      return h.file(path.join(process.cwd(), 'dist', PATH[request.path]))
    },
  })

  await server.start()

  console.log({
    message: `Server running on port ${port} on uri ${server.info.uri}`,
    port,
    uri: server.info.uri,
  })
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
