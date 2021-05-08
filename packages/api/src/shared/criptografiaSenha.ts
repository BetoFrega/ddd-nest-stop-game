import * as bcrypt from 'bcrypt';

export const criptografarSenha = (
  senhaCrua: string,
  rodadas = 10,
): Promise<string> => {
  return bcrypt.hash(senhaCrua, rodadas);
};

export const validarSenha = (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
