// Aguarda o HTML carregar totalmente
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // 1. Aplica o tema salvo assim que a página abre
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);

    // 2. Lógica do clique no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = root.getAttribute('data-theme');
            if (theme === 'dark') {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});

// Shared API Configuration
const API_URL = 'http://localhost:5501/products_firmado';

// Function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
