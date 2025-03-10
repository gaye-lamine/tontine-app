import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        info: {
            title: "Tontine API",
            description: "API pour gérer les tontines",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ]
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
