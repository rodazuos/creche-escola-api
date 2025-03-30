const generateFirstPasswordByCpf = (cpf) => {
  return cpf.substring(5, 11);
};

module.exports = {
  generateFirstPasswordByCpf,
};
