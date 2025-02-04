    const API_TOKEN = '3f2d72c15ab04ef8acd728273db2ee82';
    const API_URL = 'https://api.football-data.org/v4';

    const teams = {
        "Juventus": 109,
        "FC Barcelone": 81,
        "AS Roma": 100,
        "Aston Villa": 58,
        "Liverpool": 64,
        "Chelsea": 61,
        "Auxerre": 530,
        "Galatasaray": 610,
        "Dortmund": 4
    };

    document.addEventListener("DOMContentLoaded", function () {
        loadTeams();
        loadMatches();
    });

    async function fetchAPI(endpoint) {
        try {
            console.log(`Fetching: ${API_URL}${endpoint}`);
            const response = await fetch(`${API_URL}${endpoint}`, {
                headers: { 'X-Auth-Token': API_TOKEN }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des données", error);
            return null;
        }
    }

    async function loadTeams() {
        const teamsContainer = document.getElementById("teams");
        teamsContainer.innerHTML = "";
        for (const [name, id] of Object.entries(teams)) {
            const teamData = await fetchAPI(`/teams/${id}`);
            console.log("Données équipe:", teamData);
            if (teamData) {
                const teamElement = document.createElement("div");
                teamElement.innerHTML = `
                    <img src="${teamData.crest}" alt="${name}" width="50">
                    <strong>${name}</strong> (${teamData.area.name})
                `;
                teamsContainer.appendChild(teamElement);
            }
        }
    }

    async function loadMatches() {
        const matchesContainer = document.getElementById("matches");
        matchesContainer.innerHTML = "<p>Chargement des matchs...</p>";
        let matchList = "<table><tr><th>Date</th><th>Équipe 1</th><th>Équipe 2</th><th>Compétition</th></tr>";
        let hasMatches = false;

        for (const [name, id] of Object.entries(teams)) {
            const matchesData = await fetchAPI(`/teams/${id}/matches?status=SCHEDULED`);
            if (matchesData && matchesData.matches.length > 0) {
                const nextMatch = matchesData.matches[0];
                matchList += `
                    <tr>
                        <td>${new Date(nextMatch.utcDate).toLocaleString()}</td>
                        <td>${nextMatch.homeTeam.name}</td>
                        <td>${nextMatch.awayTeam.name}</td>
                        <td>${nextMatch.competition.name}</td>
                    </tr>
                `;
            }
        }
        matchList += "</table>";
        matchesContainer.innerHTML = matchList;
    }
