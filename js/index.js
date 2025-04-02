// Selecionando elementos DOM
const configBtn = document.querySelector('.config-btn');
const configMenu = document.querySelector('.config-menu');
const themeButton = document.getElementById('theme-button');
const languageSelect = document.getElementById('language-select');

// Estado inicial da aplicação
let isDarkMode = false;
let currentLanguage = 'pt-BR';

// Função para alternar exibição do menu de configurações
function toggleConfigMenu(event) {
    // Evita a propagação do evento para que o menu não feche imediatamente
    event.stopPropagation();
    configMenu.classList.toggle('active');
    
    // Aplica uma animação à engrenagem quando ativada
    if (configMenu.classList.contains('active')) {
        // Rotação mais expressiva e mudança de cor quando o menu estiver ativo
        configBtn.querySelector('svg').style.transform = 'rotate(90deg)';
        
        // Aplica a cor correspondente ao tema atual
        if (isDarkMode) {
            configBtn.querySelector('svg').style.fill = 'var(--secundary-color)';
        } else {
            configBtn.querySelector('svg').style.fill = 'var(--terciary-color)';
        }
    } else {
        configBtn.querySelector('svg').style.transform = 'rotate(0deg)';
        
        // Retorna para a cor original
        if (isDarkMode) {
            configBtn.querySelector('svg').style.fill = 'var(--bg-light)';
        } else {
            configBtn.querySelector('svg').style.fill = 'var(--primary-color)';
        }
    }
}

// Função para alternar o tema
function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeButton.textContent = 'Modo Claro';
        
        // Atualiza a cor da engrenagem para o tema escuro
        if (!configMenu.classList.contains('active')) {
            configBtn.querySelector('svg').style.fill = 'var(--bg-light)';
        } else {
            configBtn.querySelector('svg').style.fill = 'var(--secundary-color)';
        }
    } else {
        document.body.classList.remove('dark-theme');
        themeButton.textContent = 'Modo Escuro';
        
        // Atualiza a cor da engrenagem para o tema claro
        if (!configMenu.classList.contains('active')) {
            configBtn.querySelector('svg').style.fill = 'var(--primary-color)';
        } else {
            configBtn.querySelector('svg').style.fill = 'var(--terciary-color)';
        }
    }
    
    // Salva a preferência de tema no localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// Função para alterar o idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Salva a preferência de idioma no localStorage
    localStorage.setItem('language', lang);
    
    // Aqui você implementaria a lógica para trocar os textos da página
    const translations = {
        'pt-BR': {
            home: 'Inicio',
            about: 'Sobre',
            expertise: 'Formações',
            projects: 'Projetos',
            contact: 'Contato',
            downloadCv: 'Download CV',
            language: 'Idioma',
            theme: 'Tema',
            darkMode: 'Modo Escuro',
            lightMode: 'Modo Claro'
        },
        'en': {
            home: 'Home',
            about: 'About',
            expertise: 'Education',
            projects: 'Projects',
            contact: 'Contact',
            downloadCv: 'Download CV',
            language: 'Language',
            theme: 'Theme',
            darkMode: 'Dark Mode',
            lightMode: 'Light Mode'
        }
    };
    
    // Exemplo de como trocar os textos da navegação
    if (translations[lang]) {
        const navItems = document.querySelectorAll('.nav-list a');
        navItems[0].textContent = translations[lang].home;
        navItems[1].textContent = translations[lang].about;
        navItems[2].textContent = translations[lang].expertise;
        navItems[3].textContent = translations[lang].projects;
        navItems[4].textContent = translations[lang].contact;
        navItems[5].textContent = translations[lang].downloadCv;
        
        // Atualiza os textos do menu de configurações
        document.querySelector('.language-toggle span').textContent = translations[lang].language;
        document.querySelector('.theme-toggle span').textContent = translations[lang].theme;
        
        // Atualiza o texto do botão de tema de acordo com o estado atual
        themeButton.textContent = isDarkMode ? translations[lang].lightMode : translations[lang].darkMode;
    }
}

// Carregar preferências salvas no localStorage
function loadSavedPreferences() {
    // Verifica se há uma preferência de tema salva
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.body.classList.add('dark-theme');
        themeButton.textContent = 'Modo Claro';
    }
    
    // Verifica se há uma preferência de idioma salva
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }
}

// Fechar o menu quando clicar fora dele
function closeMenuOnClickOutside(event) {
    if (configMenu.classList.contains('active') && 
        !configBtn.contains(event.target) &&
        !configMenu.contains(event.target)) {
        configMenu.classList.remove('active');
        
        // Reseta a rotação e a cor da engrenagem
        configBtn.querySelector('svg').style.transform = 'rotate(0deg)';
        
        // Retorna para a cor original com base no tema
        if (isDarkMode) {
            configBtn.querySelector('svg').style.fill = 'var(--bg-light)';
        } else {
            configBtn.querySelector('svg').style.fill = 'var(--primary-color)';
        }
    }
}

// Prevenir que cliques dentro do menu propaguem para o documento
configMenu.addEventListener('click', function(event) {
    event.stopPropagation();
});

// Adicionar event listeners
configBtn.addEventListener('click', toggleConfigMenu);
themeButton.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
document.addEventListener('click', closeMenuOnClickOutside);

// Carrega preferências ao iniciar a página
document.addEventListener('DOMContentLoaded', loadSavedPreferences);
