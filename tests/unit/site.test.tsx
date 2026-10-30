import { describe, it, expect } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import QuoteForm from '../../src/components/QuoteForm';

describe('orçamento', () => {
  it('monta o link sem enviar dados', async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.type(screen.getByLabelText('Seu nome'), '  Ana Silva  ');
    await user.type(screen.getByLabelText('Telefone com DDD'), '(19) 99999-1234');
    await user.type(screen.getByLabelText('Cidade'), '  Campinas  ');
    await user.click(screen.getByRole('button', { name: /Preparar mensagem/ }));
    const output = screen.getByLabelText('Sua mensagem está pronta');
    expect(output).toHaveFocus();
    const link = screen.getByRole('link', { name: /Continuar no WhatsApp/ });
    const url = new URL(link.getAttribute('href')!);
    expect(url.origin + url.pathname).toBe('https://wa.me/5519974163336');
    expect(url.searchParams.get('text')).toContain('Nome: Ana Silva\n');
    expect(url.searchParams.get('text')).toContain('Cidade: Campinas\n');
    expect(url.searchParams.get('text')).toContain('Serviço: Terceirização de limpeza\nDetalhes: A combinar');
    expect(url.searchParams.get('text')).toContain('Detalhes: A combinar');
    await user.type(screen.getByLabelText(/Conte um pouco/), 'Escritório');
    await waitFor(() => expect(screen.queryByRole('link', { name: /Continuar no WhatsApp/ })).not.toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /Preparar mensagem/ }));
    expect((screen.getByLabelText('Sua mensagem está pronta') as HTMLTextAreaElement).value).toContain('Detalhes: Escritório');
  });
});

describe('home', () => {
  it('apresenta a terceirização com a cobertura de ausências entre os benefícios', () => {
    const { container } = render(<App />);
    expect(Array.from(container.querySelectorAll('.service h3'), h => h.textContent)).toEqual(['Terceirização de limpeza', 'Benefícios paraa sua empresa']);
    expect(Array.from(container.querySelectorAll('.service-benefits h4'), h => h.textContent)).toEqual(['Cobertura de ausências', 'Profissionais preparados', 'Materiais e equipamentos', 'Responsabilidade na contratação']);
    expect(container.textContent).not.toMatch(/pós-obra|vidros|pisos|meio período/i);
  });

  it('mostra os principais clientes em carrossel, com a cópia oculta para leitores de tela', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#clientes .eyebrow')).toHaveTextContent('NOSSOS PRINCIPAIS CLIENTES');
    const [list, copy] = container.querySelectorAll('.client-track');
    expect(list).toHaveAccessibleName('Principais clientes');
    expect(copy).toHaveAttribute('aria-hidden', 'true');
    expect(list.querySelectorAll('li')).toHaveLength(12);
    // Todos têm logo; o Welcome Center mostra o nome abaixo do símbolo, então a imagem é decorativa.
    expect(Array.from(within(list as HTMLElement).getAllByRole('img'), img => img.getAttribute('alt'))).toEqual([
      'Tauá Biodiesel', 'Bandini', 'Supermercados Crema', 'Nova Giulen', 'Shopping Via Direta', 'Droga Pires',
      'Smart Mall', 'Maxi Água', 'Contabilidade Giordano', 'Associação Médica de Americana', 'Monta Farma',
    ]);
    expect(list).toHaveTextContent('Welcome Center');
    expect(copy.querySelectorAll('img[alt=""]')).toHaveLength(12);
    expect(container.querySelector('#clientes .section-heading > p')).toHaveTextContent('escritórios e diversos condomínios e consultórios da região');
  });

  it('fecha o menu ao navegar e por Escape, restaurando o foco', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Terceirização' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    within(screen.getByRole('navigation')).getByRole('link', { name: 'Clientes' }).focus();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('responde às perguntas de busca no FAQ, com numeração de dois dígitos', () => {
    const { container } = render(<App />);
    const items = container.querySelectorAll('.faq-list details');
    const question = (i: number) => items[i].querySelector('summary');
    expect(items).toHaveLength(10);
    expect(question(0)).toHaveTextContent('O que é a terceirização de limpeza da Pratic Limp?');
    expect(items[0].querySelector('p')).toHaveTextContent('substituição em faltas, férias e afastamentos');
    expect(question(1)).toHaveTextContent('Quais cidades a Pratic Limp atende?');
    expect(items[1].querySelector('p')).toHaveTextContent("Americana, Santa Bárbara d'Oeste e Nova Odessa");
    expect(items[2].querySelector('p')).toHaveTextContent('condomínios e consultórios');
    expect(question(8)).toHaveTextContent('Por que escolher a Pratic Limp em vez de uma empresa de facilities?');
    expect(Array.from(items, item => item.querySelector('.faq-number')?.textContent)).toEqual(['01','02','03','04','05','06','07','08','09','10']);
  });
});
