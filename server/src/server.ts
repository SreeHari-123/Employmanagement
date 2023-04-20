import express from 'express';
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
import employRoutes from './routes/employ'
import cors from 'cors'

const app = express();
const SpfxConnection = () => {
    sp.setup({
        sp: {
            fetchClientFactory: () => new SPFetchClient(
                "https://2mxff3.sharepoint.com/sites/sreehari",
                "bc751809-bdd9-4f39-9650-11a534e402e3",
                "w7ABhFSeCqS9XLxYy4ryGMhGeTpAJJijeO2lKeV8rIw=",

            ),
        },
    });
};

SpfxConnection();
app.use(express.json());
app.use(cors())
app.use("/",employRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
