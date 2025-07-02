import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

// Load Swagger API documentation from JSON file
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('./docs/swagger.json', import.meta.url)));

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Log all incoming requests
app.use(loggerMiddleware);

// Serve Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth and book routes
app.use('/', authRoutes);
app.use('/books', bookRoutes);

// 404 and global error handlers
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

export default app;
