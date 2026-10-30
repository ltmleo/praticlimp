import { describe, it, expect } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import QuoteForm from '../../src/components/QuoteForm';

describe('orçamento', () => {
  it('pede o período e monta o link sem enviar dados', async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.selectOptions(screen.getByLabelText('Período de trabalho'), 'Meio período');
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
    expect(url.searchParams.get('text')).toContain('Serviço: Terceirização de limpeza\nPeríodo: Meio período');
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
    expect(container.textContent).not.toMatch(/pós-obra|vidros|pisos/i);
  });

  it('mostra os principais clientes em carrossel, com a cópia oculta para leitores de tela', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#clientes .eyebrow')).toHaveTextContent('NOSSOS PRINCIPAIS CLIENTES');
    const [list, copy] = container.querySelectorAll('.client-track');
    expect(list).toHaveAccessibleName('Principais clientes');
    expect(copy).toHaveAttribute('aria-hidden', 'true');
    expect(list.querySelectorAll('li')).toHaveLength(11);
    // Todos têm logo; o Welcome Center mostra o nome abaixo do símbolo, então a imagem é decorativa.
    expect(Array.from(within(list as HTMLElement).getAllByRole('img'), img => img.getAttribute('alt'))).toEqual([
      'Tauá Biodiesel', 'Bandini', 'Supermercados Crema', 'Nova Giulen', 'Shopping Via Direta', 'Droga Pires',
      'Metalfarma', 'Smart Mall', 'Maxi Água', 'Contabilidade Giordano',
    ]);
    expect(list).toHaveTextContent('Welcome Center');
    expect(copy.querySelectorAll('img[alt=""]')).toHaveLength(11);
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

  it('mantém a especialização no primeiro FAQ, com numeração e resposta', () => {
    const { container } = render(<App />);
    const items = container.querySelectorAll('.faq-list details');
    expect(items).toHaveLength(6);
    expect(items[0].querySelector('summary')).toHaveTextContent('Por que escolher a Pratic Limp em vez de uma empresa de facilities?');
    expect(items[0].querySelector('p')).toHaveTextContent('Porque limpeza é a nossa especialidade desde 1991.');
    expect(items[0].querySelector('p')).toHaveTextContent('as condições de substituição em faltas, férias e afastamentos');
    expect(Array.from(items, item => item.querySelector('.faq-number')?.textContent)).toEqual(['01','02','03','04','05','06']);
  });
});
