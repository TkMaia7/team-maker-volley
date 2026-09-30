/**
 * Distribui jogadores em equipas equilibradas com limite de vagas e lista de espera.
 */
export const generateBalancedTeams = (players, numTeams, playersPerTeam) => {
  if (!players || players.length === 0 || numTeams <= 0 || playersPerTeam <= 0) {
    return { teams: [], waitlist: [] };
  }

  // Calcular o limite máximo de jogadores que vão entrar em campo agora
  const maxCapacity = numTeams * playersPerTeam;

  // Separar quem joga de quem fica de fora
  const playingNow = players.slice(0, maxCapacity);
  const waitlist = players.slice(maxCapacity);

  // Ordenar apenas os que vão jogar do maior nível para o menor
  const sortedPlayers = [...playingNow].sort((a, b) => b.level - a.level);

  // Inicializar as equipas
  const teams = Array.from({ length: numTeams }, (_, index) => ({
    id: index + 1,
    name: `Equipa ${index + 1}`,
    players: [],
    totalSkill: 0,
  }));

  // Distribuir os jogadores respeitando o limite de vagas
  sortedPlayers.forEach(player => {
    // Filtra apenas as equipas que ainda não atingiram o limite de jogadores
    const availableTeams = teams.filter(t => t.players.length < playersPerTeam);

    if (availableTeams.length > 0) {
      // Procura a equipa com a menor soma de habilidades entre as disponíveis
      let targetTeam = availableTeams[0];
      
      for (let i = 1; i < availableTeams.length; i++) {
        if (availableTeams[i].totalSkill < targetTeam.totalSkill) {
          targetTeam = availableTeams[i];
        } 
        // Desempate: mesma habilidade, vai para a equipa com menos jogadores
        else if (
          availableTeams[i].totalSkill === targetTeam.totalSkill &&
          availableTeams[i].players.length < targetTeam.players.length
        ) {
          targetTeam = availableTeams[i];
        }
      }

      targetTeam.players.push(player);
      targetTeam.totalSkill += player.level;
    }
  });

  // Retorna um objeto com as equipas formadas e os jogadores de fora
  return { teams, waitlist };
};