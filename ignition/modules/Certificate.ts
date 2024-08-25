const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config();

const CertificateModule = buildModule("TokenModule", (m: any) => {
  const certificate = m.contract("Certificate");
  return { certificate };
});

export default CertificateModule;
