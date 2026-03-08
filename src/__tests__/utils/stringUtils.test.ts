import { truncate, capitalize, slugify } from '@/utils/stringUtils';

describe('truncate', () => {
  it('retorna a string original quando está dentro do limite', () => {
    expect(truncate('Olá mundo', 20)).toBe('Olá mundo');
  });

  it('trunca a string e adiciona "..." quando excede o limite', () => {
    expect(truncate('Campanha de Marketing Digital', 10)).toBe('Campanha d...');
  });

  it('retorna string vazia para valor falsy', () => {
    expect(truncate('', 10)).toBe('');
    expect(truncate(null as any, 10)).toBe('');
  });

  it('retorna a string sem truncar quando tem exatamente o tamanho máximo', () => {
    expect(truncate('abc', 3)).toBe('abc');
  });
});

describe('capitalize', () => {
  it('capitaliza a primeira letra e converte o resto para minúsculas', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('converte texto em maiúsculas para capitalizado', () => {
    expect(capitalize('MUNDO')).toBe('Mundo');
  });

  it('retorna string vazia para valor falsy', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize(null as any)).toBe('');
  });

  it('funciona com string de um caractere', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('slugify', () => {
  it('converte espaços em hífens', () => {
    expect(slugify('Campanha de Marketing')).toBe('campanha-de-marketing');
  });

  it('converte para minúsculas', () => {
    expect(slugify('TESTE')).toBe('teste');
  });

  it('remove caracteres especiais', () => {
    expect(slugify('Campanha #1!')).toBe('campanha-1');
  });

  it('mantém hífens e underscore existentes', () => {
    expect(slugify('minha-campanha_teste')).toBe('minha-campanha_teste');
  });
});
