import "dotenv/config";
import App from "./app";
import ProductController from "./controllers/product.controller";

const app = new App([new ProductController()], Number(process.env.PORT));

const server = app.listen();

// test if the server is live
app.get();

export default server;
