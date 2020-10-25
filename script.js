let root = document.documentElement;
let currentMode = 'dark';

var games = Array.from(document.getElementsByClassName('playable-game'));
var projects = Array.from(document.getElementsByClassName('project'));
var all = Array.from(document.getElementsByClassName('post'));

function filterAll() {
	for (i = 0; i < all.length; i++) {
		all[i].style.display = "block";
		console.log(all[i]);
	}
}

function filterProjects() {
	for (i = 0; i < games.length; i++) {
		games[i].style.display = "none";
		console.log(games[i]);
	}

	for (i = 0; i < projects.length; i++) {
		projects[i].style.display = "block";
		console.log(projects[i]);
	}
}

function filterGames() {
	for (i = 0; i < games.length; i++) {
		games[i].style.display = "block";
		console.log(games[i]);
	}

	for (i = 0; i < projects.length; i++) {
		projects[i].style.display = "none";
		console.log(projects[i]);
	}
}

function changeDisplayMode() {
	if (currentMode === 'dark') {
		root.style.setProperty('--currentmode_body', 'var(--lightmode_body)');
		root.style.setProperty('--currentmode_card', 'var(--lightmode_card)');
		root.style.setProperty('--currentmode_text', 'var(--lightmode_text)');
		root.style.setProperty('--currentmode_footer', 'var(--lightmode_footer)');
		root.style.setProperty('--currentmode_button', 'var(--lightmode_button)');
		root.style.setProperty('--currentmode_border', 'var(--lightmode_border)');

		currentMode = 'light';
		document.getElementById("displayMode").innerHTML = "Modo Escuro";
	} else if (currentMode === 'light') {
		root.style.setProperty('--currentmode_body', 'var(--darkmode_body)');
		root.style.setProperty('--currentmode_card', 'var(--darkmode_card)');
		root.style.setProperty('--currentmode_text', 'var(--darkmode_text)');
		root.style.setProperty('--currentmode_footer', 'var(--darkmode_footer)');
		root.style.setProperty('--currentmode_button', 'var(--darkmode_button)');
		root.style.setProperty('--currentmode_border', 'var(--darkmode_border)');

		currentMode = 'dark';
		document.getElementById("displayMode").innerHTML = "Modo Claro";
	}
}