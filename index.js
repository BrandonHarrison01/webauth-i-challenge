const server = require('./server')

const port = process.env.port || 8000

server.listen(port, () => console.log(`Server is listenting on port ${port}`))
