import { describe, it, expect } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import QuoteForm from '../../src/components/QuoteForm';

describe('orçamento', () => {
  it('recebe o serviço, permite revisão e monta o link sem enviar dados', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<QuoteForm selectedService="Limpeza pós-obra" />);
    const select = screen.getByLabelText('Qual serviço você precisa?');
    expect(select).toHaveValue('Limpeza pós-obra');
    rerender(<QuoteForm selectedService="Terceirização de limpeza" />);
    expect(select).toHaveValue('Terceirização de limpeza');
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
    expect(url.searchParams.get('text')).toContain('Serviço: Terceirização de limpeza');
    expect(url.searchParams.get('text')).toContain('Detalhes: A combinar');
    await user.type(screen.getByLabelText(/Conte um pouco/), 'Escritório');
    await waitFor(() => expect(screen.queryByRole('link', { name: /Continuar no WhatsApp/ })).not.toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /Preparar mensagem/ }));
    expect((screen.getByLabelText('Sua mensagem está pronta') as HTMLTextAreaElement).value).toContain('Detalhes: Escritório');
  });
});

describe('home', () => {
  it('filtra serviços e leva a escolha para o orçamento', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    expect(container.querySelectorAll('.service')).toHaveLength(5);
    await user.click(screen.getByRole('button', { name: /Para empresas/ }));
    await waitFor(() => expect(container.querySelectorAll('.service')).toHaveLength(2));
    await user.click(screen.getByRole('button', { name: /Limpeza especializada/ }));
    await waitFor(() => expect(container.querySelectorAll('.service')).toHaveLength(3));
    await user.click(screen.getByRole('link', { name: 'Solicitar orçamento: Limpeza pós-obra' }));
    expect(screen.getByLabelText('Qual serviço você precisa?')).toHaveValue('Limpeza pós-obra');
    await user.click(within(container.querySelector('.cost-section')! as HTMLElement).getByRole('link', { name: /Pedir orçamento/ }));
    expect(screen.getByLabelText('Qual serviço você precisa?')).toHaveValue('Terceirização de limpeza');
    await user.click(screen.getByRole('button', { name: /Todos os serviços/ }));
    await waitFor(() => expect(container.querySelectorAll('.service')).toHaveLength(5));
  });

  it('fecha o menu ao navegar e por Escape, restaurando o foco', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Serviços' }));
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
