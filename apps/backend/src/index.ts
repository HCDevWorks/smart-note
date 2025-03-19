import express, { Express } from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function setRoutes(app: Express) {
  app.use(routes);
}

setRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
