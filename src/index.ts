import app from './app.js';
import { PORT } from './constant.js';

app.listen(PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});
