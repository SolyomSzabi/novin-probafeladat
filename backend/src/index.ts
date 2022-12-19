import app from './app';
import config from './config';

const PORT = config.port || 8081;

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
