// --- Lógica de Carregamento de Resultados de Jogos ---
    const matchesContainer = document.getElementById('matches-container');
    const loadingMessage = matchesContainer.querySelector('.loading-message');
    const errorMessage = matchesContainer.querySelector('.error-message');
    const refreshButton = document.getElementById('refresh-matches-btn');

    // Função para buscar os dados dos jogos
    async function fetchMatches() {
        matchesContainer.innerHTML = ''; // Limpa o conteúdo anterior
        loadingMessage.classList.remove('hidden'); // Mostra a mensagem de carregamento
        errorMessage.classList.add('hidden'); // Esconde a mensagem de erro

        // --- ATENÇÃO: Substitua pelo seu URL real da API e sua API Key ---
        const API_URL = 'URL_DA_SUA_API_DE_FUTEBOL'; // Ex: 'https://api.football-data.org/v2/competitions/CL/matches?status=FINISHED'
        const API_KEY = 'SUA_API_KEY_AQUI'; // Sua chave da API, se for necessária

        try {
            // ESTE É UM EXEMPLO DE DADOS MOCKADOS (SIMULADOS) para você ver como funciona.
            // REMOVA OU COMENTE TODO ESTE BLOCO 'mockData' E O 'await new Promise'
            // QUANDO FOR USAR UMA API REAL.
            const mockData = {
                matches: [
                    {
                        "utcDate": "2025-05-28T19:00:00Z",
                        "status": "FINISHED",
                        "homeTeam": { "name": "Real Madrid" },
                        "awayTeam": { "name": "Borussia Dortmund" },
                        "score": {
                            "fullTime": { "home": 2, "away": 0 }
                        },
                        "stage": "FINAL"
                    },
                    {
                        "utcDate": "2025-05-08T19:00:00Z",
                        "status": "FINISHED",
                        "homeTeam": { "name": "Man City" },
                        "awayTeam": { "name": "Real Madrid" },
                        "score": {
                            "fullTime": { "home": 1, "away": 0 }
                        },
                        "stage": "SEMI_FINALS"
                    },
                    {
                        "utcDate": "2025-05-07T19:00:00Z",
                        "status": "FINISHED",
                        "homeTeam": { "name": "PSG" },
                        "awayTeam": { "name": "Borussia Dortmund" },
                        "score": {
                            "fullTime": { "home": 0, "away": 1 }
                        },
                        "stage": "SEMI_FINALS"
                    },
                    {
                        "utcDate": "2025-04-17T19:00:00Z",
                        "status": "FINISHED",
                        "homeTeam": { "name": "Bayern Munich" },
                        "awayTeam": { "name": "Arsenal" },
                        "score": {
                            "fullTime": { "home": 1, "away": 0 }
                        },
                        "stage": "QUARTER_FINALS"
                    }
                ]
            };

            // Simula um atraso de rede para carregar (apenas para o mockData)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // --- DESCOMENTE O BLOCO ABAIXO E COMENTE O 'displayMatches(mockData.matches)'
            // PARA USAR UMA API REAL
            /*
            const response = await fetch(API_URL, {
                headers: { 'X-Auth-Token': API_KEY } // Verifique a documentação da sua API para o cabeçalho correto
            });
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }
            const data = await response.json();
            displayMatches(data.matches); // Assumindo que a API retorna um objeto com uma propriedade 'matches'
            */

            displayMatches(mockData.matches); // Linha para exibir os dados mockados (Comente esta linha para usar API real)
            
        } catch (error) {
            console.error('Erro ao buscar os resultados dos jogos:', error);
            errorMessage.classList.remove('hidden'); // Mostra a mensagem de erro
            matchesContainer.innerHTML = ''; // Limpa os cards, se houver
        } finally {
            loadingMessage.classList.add('hidden'); // Esconde a mensagem de carregamento
        }
    }

    // Função para exibir os jogos na página
    function displayMatches(matches) {
        matchesContainer.innerHTML = ''; // Limpa o container antes de adicionar novos jogos

        if (matches.length === 0) {
            matchesContainer.innerHTML = '<p class="no-results-message">Nenhum resultado de jogo encontrado.</p>';
            return;
        }

        matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.classList.add('match-card');

            // Formata a data
            const date = new Date(match.utcDate);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedDate = date.toLocaleDateString('pt-BR', options);

            let scoreDisplay = 'Aguardando...';
            if (match.status === 'FINISHED' && match.score && match.score.fullTime) {
                scoreDisplay = `${match.score.fullTime.home} x ${match.score.fullTime.away}`;
            } else if (match.status === 'IN_PLAY') {
                scoreDisplay = `Ao Vivo: ${match.score.fullTime.home || 0} x ${match.score.fullTime.away || 0}`;
            }

            matchCard.innerHTML = `
                <h3>${match.stage.replace(/_/g, ' ')}</h3>
                <p>Data: ${formattedDate}</p>
                <p class="match-teams">${match.homeTeam.name} <br>vs.<br> ${match.awayTeam.name}</p>
                <p class="match-score">${scoreDisplay}</p>
                <p class="match-status">Status: ${match.status.replace(/_/g, ' ')}</p>
            `;
            matchesContainer.appendChild(matchCard);
        });
    }

    // Carrega os jogos ao carregar a página
    fetchMatches();

    // Adiciona evento ao botão de atualizar
    refreshButton.addEventListener('click', fetchMatches);