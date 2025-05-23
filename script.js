const form = document.getElementById('formPrato');
const listaPratos = document.getElementById('listaPratos');
const listaSaudaveis = document.getElementById('listaSaudaveis');

let pratos = JSON.parse(localStorage.getItem('pratos')) || [];

function criarCard(prato, destaque = false) {
  const card = document.createElement('div');
  if (destaque) card.classList.add('healthy');

  const titulo = document.createElement('h3');
  titulo.textContent = prato.nome;
  card.appendChild(titulo);

  const ingredientes = document.createElement('p');
  ingredientes.innerHTML = `<strong>Ingredientes:</strong> ${prato.ingredientes.join(', ')}`;
  card.appendChild(ingredientes);

  const calorias = document.createElement('p');
  calorias.innerHTML = `<strong>Calorias:</strong> ${prato.calorias}`;
  card.appendChild(calorias);

  return card;
}

function mostrarPratos() {
  listaPratos.innerHTML = '';
  pratos.forEach(prato => {
    const card = criarCard(prato);
    listaPratos.appendChild(card);
  });
}

function mostrarSaudaveis() {
  listaSaudaveis.innerHTML = '';
  const saudaveis = pratos.filter(p => p.calorias < 400);
  if (saudaveis.length === 0) {
    listaSaudaveis.textContent = 'Nenhuma refeição saudável cadastrada.';
    return;
  }
  saudaveis.forEach(prato => {
    const card = criarCard(prato, true);
    listaSaudaveis.appendChild(card);
  });
}

mostrarPratos();
mostrarSaudaveis();

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nomePrato').value.trim();
  const ingredientesRaw = document.getElementById('ingredientes').value.trim();
  const calorias = Number(document.getElementById('calorias').value);

  if (!nome || !ingredientesRaw || isNaN(calorias) || calorias < 0) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const ingredientes = ingredientesRaw.split(',').map(i => i.trim()).filter(i => i);

  const novoPrato = {
    nome,
    ingredientes,
    calorias
  };

  pratos.push(novoPrato);
  localStorage.setItem('pratos', JSON.stringify(pratos));

  mostrarPratos();
  mostrarSaudaveis();

  form.reset();
});
