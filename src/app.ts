import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import passport from "passport";
import js from "./config/passport";
import v1Routes from './routes/v1';


const swaggerDocument = YAML.load('./src/swagger.yaml');
const app = express();

app.use(express.json());
app.use('/api/v1', v1Routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//JwtStrategy.
passport.use(js);
app.use(passport.initialize());

export default app;