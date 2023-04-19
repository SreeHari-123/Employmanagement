"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const nodejs_commonjs_1 = require("@pnp/nodejs-commonjs");
const employ_1 = __importDefault(require("./routes/employ"));
//express app
const app = (0, express_1.default)();
const SpfxConnection = () => {
    sp_commonjs_1.sp.setup({
        sp: {
            fetchClientFactory: () => new nodejs_commonjs_1.SPFetchClient("https://2mxff3.sharepoint.com/sites/sreehari", "bc751809-bdd9-4f39-9650-11a534e402e3", "w7ABhFSeCqS9XLxYy4ryGMhGeTpAJJijeO2lKeV8rIw="),
        },
    });
};
SpfxConnection();
// const getAllItems = async () => {
//     const response = await sp.web.lists.getByTitle("employyy").items.getAll();
//     console.log(response);
// };
// getAllItems();
app.use(express_1.default.json());
app.use("/", employ_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
