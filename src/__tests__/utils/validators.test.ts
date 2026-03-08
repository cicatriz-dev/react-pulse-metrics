import { isValidEmail, isValidUrl, isRequired } from '@/utils/validators';

describe('isValidEmail', () => {
  it('retorna true para email válido', () => {
    expect(isValidEmail('usuario@exemplo.com')).toBe(true);
  });

  it('retorna false para email sem @', () => {
    expect(isValidEmail('usuarioexemplo.com')).toBe(false);
  });

  it('retorna false para email sem domínio', () => {
    expect(isValidEmail('usuario@')).toBe(false);
  });

  it('retorna false para string vazia', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('retorna false para email sem extensão de domínio', () => {
    expect(isValidEmail('usuario@dominio')).toBe(false);
  });
});

describe('isValidUrl', () => {
  it('retorna true para URL http válida', () => {
    expect(isValidUrl('https://exemplo.com')).toBe(true);
  });

  it('retorna true para URL com path', () => {
    expect(isValidUrl('https://exemplo.com/caminho?query=1')).toBe(true);
  });

  it('retorna false para path relativo', () => {
    expect(isValidUrl('/caminho/relativo')).toBe(false);
  });

  it('retorna false para string sem protocolo', () => {
    expect(isValidUrl('nao-e-uma-url')).toBe(false);
  });
});

describe('isRequired', () => {
  it('retorna true para string não-vazia', () => {
    expect(isRequired('hello')).toBe(true);
  });

  it('retorna false para string vazia', () => {
    expect(isRequired('')).toBe(false);
  });

  it('retorna false para string só com espaços', () => {
    expect(isRequired('   ')).toBe(false);
  });

  it('retorna true para objeto', () => {
    expect(isRequired({})).toBe(true);
  });

  it('retorna true para array vazio (não-nulo)', () => {
    expect(isRequired([])).toBe(true);
  });

  it('retorna false para null', () => {
    expect(isRequired(null)).toBe(false);
  });

  it('retorna false para undefined', () => {
    expect(isRequired(undefined)).toBe(false);
  });
});
