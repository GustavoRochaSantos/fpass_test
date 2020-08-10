// -- Função simples para colocar mascara no Telefone

export default function formatCPFMask(cpf: string): string {
  let maskedcpf = cpf;

  // Remove tudo o que não é dígito
  maskedcpf = maskedcpf.replace(/\D/g, '');

  switch (maskedcpf.length) {
    case 3:
      maskedcpf = maskedcpf.replace(/(\d{3})/, '$1.');
      break;
    case 6:
      maskedcpf = maskedcpf.replace(/(\d{3})(\d{3})/, '$1.$2.');
      break;
    case 9:
      maskedcpf = maskedcpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
      break;
    case 11:
      maskedcpf = maskedcpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      );
      break;
  }

  return maskedcpf;
}
