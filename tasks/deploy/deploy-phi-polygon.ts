import { deployPhiPolygon, printAddresses } from "./deploy";

deployPhiPolygon()
  .then(() => console.log("Successfully deployed"))
  .then(() => printAddresses())
  .catch(err => console.log(err));
