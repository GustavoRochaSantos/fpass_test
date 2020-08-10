// -- Função simples para colocar mascara no Telefone

export default function formatPhoneMask(phone: string): string {
  let maskedPhone = phone;

  // Remove tudo o que não é dígito
  maskedPhone = maskedPhone.replace(/\D/g, '');

  // Coloca parênteses em volta dos dois primeiros dígitos
  maskedPhone = maskedPhone.replace(/^(\d\d)(\d)/g, '($1) $2');

  if (maskedPhone.length < 14) {
    // Número com 8 dígitos. Formato: (99) 9999-9999}
    maskedPhone = maskedPhone.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Número com 9 dígitos. Formato: (99) 99999-9999
    maskedPhone = maskedPhone.replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
  }

  return maskedPhone;
}
