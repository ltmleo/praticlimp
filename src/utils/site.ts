import { company } from '../data/company';
export const basePath = import.meta.env.BASE_URL;
export const asset = (path: string) => basePath + path.replace(/^\//, '');
export const coverageText = company.coverage.slice(0, -1).join(', ') + ' e ' + company.coverage.at(-1);
export const contact = 'https://wa.me/' + company.whatsapp + '?text=' + encodeURIComponent('Olá! Quero solicitar um orçamento da Pratic Limp.');
