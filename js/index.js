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

// Função para criar efeito de digitação
function createTypewriter(element, text, speed = 100, delay = 0, cursorBlink = true) {
  // Define o texto como vazio inicialmente
  element.textContent = '';
  
  // Adiciona a classe para estilização
  element.classList.add('typewriter');
  
  // Cria o elemento do cursor
  const cursor = document.createElement('span');
  cursor.classList.add('typewriter-cursor');
  cursor.textContent = '|';
  
  // Se o cursor deve piscar, adiciona a classe
  if (cursorBlink) {
    cursor.classList.add('typewriter-cursor-blink');
  }
  
  // Adiciona o cursor ao elemento
  element.appendChild(cursor);
  
  // Configura o atraso inicial
  setTimeout(() => {
    // Variável para controlar a posição atual
    let charIndex = 0;
    
    // Função que adiciona cada caractere
    function typeChar() {
      if (charIndex < text.length) {
        // Insere o texto antes do cursor
        element.insertBefore(
          document.createTextNode(text.charAt(charIndex)),
          cursor
        );
        charIndex++;
        setTimeout(typeChar, speed);
      }
    }
    
    // Inicia a digitação
    typeChar();
  }, delay);
  
  // Retorna o elemento para possível encadeamento
  return element;
}

// Função para criar efeito de digitação com múltiplas frases
function createMultiTypewriter(element, phrases, options = {}) {
    // Configurações padrão
    const settings = {
        typeSpeed: 100,
        deleteSpeed: 50,
        delayBetweenPhrases: 2000,
        loop: true,
        startDelay: 0,
        cursorChar: '|',
        ...options
    };
    
    // Adiciona a classe para estilização
    element.classList.add('multi-typewriter');
    
    // Cria o elemento de texto
    const textElement = document.createElement('span');
    textElement.classList.add('multi-typewriter-text');
    
    // Cria o elemento do cursor
    const cursor = document.createElement('span');
    cursor.classList.add('multi-typewriter-cursor');
    cursor.textContent = settings.cursorChar;
    
    // Limpa o elemento e adiciona os novos elementos
    element.textContent = '';
    element.appendChild(textElement);
    element.appendChild(cursor);
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;
    
    // Função principal para digitar/apagar texto
    function type() {
        // Cancela qualquer timeout pendente
        if (timeoutId) clearTimeout(timeoutId);
        
        // Obtém a frase atual do array
        const currentPhrase = phrases[phraseIndex];
        
        // Calcula o delay baseado na ação atual
        let delay;
        
        if (isDeleting) {
            // Se estamos apagando
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = settings.deleteSpeed;
        } else {
            // Se estamos digitando
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = settings.typeSpeed;
        }
        
        // Determina o próximo passo
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Concluiu a digitação da frase atual
            delay = settings.delayBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Concluiu a exclusão da frase atual
            isDeleting = false;
            
            // Avança para a próxima frase
            phraseIndex++;
            
            // Se chegou ao fim das frases
            if (phraseIndex === phrases.length) {
                if (settings.loop) {
                    // Reinicia do começo
                    phraseIndex = 0;
                } else {
                    // Termina a animação
                    return;
                }
            }
        }
        
        // Agenda o próximo passo
        timeoutId = setTimeout(type, delay);
    }
    
    // Inicia o efeito após o atraso inicial
    setTimeout(type, settings.startDelay);
    
    // Retorna uma função para parar a animação
    return function stop() {
        if (timeoutId) clearTimeout(timeoutId);
    };
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

// Função para inicializar todas as funcionalidades ao carregar a página
function initApp() {
    // Carrega preferências salvas
    loadSavedPreferences();
    
    // Inicializa o efeito de digitação simples
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    typewriterElements.forEach((element, index) => {
        // Obtém o texto original do elemento
        const originalText = element.textContent;
        
        // Aplica o efeito com um atraso progressivo para elementos em sequência
        createTypewriter(
            element,
            originalText,
            50,  // velocidade (ms por caractere)
            index * 1000  // atraso (ms) - aumenta para cada elemento seguinte
        );
    });
    
    // Inicializa o efeito de digitação com múltiplas frases
    const multiTypewriterElements = document.querySelectorAll('.multi-typewriter-element');
    multiTypewriterElements.forEach((element) => {
        // Obtém as frases do atributo data-phrases (separadas por |)
        const phrasesAttr = element.getAttribute('data-phrases');
        if (phrasesAttr) {
            const phrases = phrasesAttr.split('|');
            
            // Aplica o efeito
            createMultiTypewriter(element, phrases, {
                typeSpeed: parseInt(element.getAttribute('data-type-speed') || 100),
                deleteSpeed: parseInt(element.getAttribute('data-delete-speed') || 50),
                delayBetweenPhrases: parseInt(element.getAttribute('data-delay') || 2000)
            });
        }
    });
}

// Adicionar event listeners
configBtn.addEventListener('click', toggleConfigMenu);
themeButton.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
document.addEventListener('click', closeMenuOnClickOutside);

// Carrega preferências e inicializa o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);