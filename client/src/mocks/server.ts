import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// This configures a request mocking server with the given request handlers.
// Input the handlers into the setup server..

const server = setupServer(...handlers);

export default server;
