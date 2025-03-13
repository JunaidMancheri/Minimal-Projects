const app = require('../app');
const port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
  console.info(`Server started at the port ${process.env.PORT}`);
});


server.on('error', (error)=>{
  console.error(error);
  if ( error.code === 'EADDRINUSE') {
    console.error(`${port} is in already in use`);
  }
});
