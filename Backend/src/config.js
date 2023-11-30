import path from 'path';

export const config = {
    swaggerSpec: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Core - (Node - mongodb)",
                version: "1.0.0",
            },
            servers: [
                {
                    url: process.env.PORT || "http://localhost:3000"
                }
            ]
        },
        apis: [`${path.join(__dirname, "./routes/*.js")}`],
    },
    SECRET: 'records-api',
};

export default config;