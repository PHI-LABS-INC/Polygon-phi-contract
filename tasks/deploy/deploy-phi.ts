import { deployPhi, printAddresses } from "./deploy";

deployPhi()
  .then(() => console.log("Successfully deployed"))
  .then(() => printAddresses())
  .catch(err => console.log(err));
