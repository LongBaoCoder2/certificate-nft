const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CertificateModule = buildModule("TokenModule", (m: any) => {
  const certificate = m.contract("Certificate");

  return { certificate };
});

module.exports = CertificateModule;
