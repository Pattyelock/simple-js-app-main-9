let pokemonRepository = (function() {
  let pokemonList = [
      {
          name: 'Bulbasaur',
          height: 0.7,
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
      },
      {
          name: 'Charmander',
          height: 0.6,
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
      },
      {
          name: 'Squirtle',
          height: 0.5,
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
      }
  ];

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
      return pokemonList;
  }

  function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');

      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);

      // Add event listener to open the modal when Pokémon is clicked
      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
  }

  function showDetails(pokemon) {
      showModal(
          pokemon.name,
          `Height: ${pokemon.height}m`,
          pokemon.imageUrl
      );
  }

  function showModal(title, details, imageUrl) {
      // Update modal content dynamically
      document.querySelector('.modal-title').innerText = title;
      document.querySelector('.modal-details').innerText = details;
      document.querySelector('.modal-image').src = imageUrl;

      // Display the modal
      document.getElementById('pokemon-modal').style.display = 'flex';

      // Close modal when "x" button is clicked
      document.querySelector('.close-button').addEventListener('click', function() {
          document.getElementById('pokemon-modal').style.display = 'none';
      });

      // Allow closing the modal with the Escape key
      document.addEventListener('keydown', function onKeyPress(event) {
          if (event.key === 'Escape') {
              document.getElementById('pokemon-modal').style.display = 'none';
              document.removeEventListener('keydown', onKeyPress);
          }
      });

      // Close modal when clicking outside the modal content
      document.getElementById('pokemon-modal').addEventListener('click', function(event) {
          if (event.target === document.getElementById('pokemon-modal')) {
              document.getElementById('pokemon-modal').style.display = 'none';
          }
      });
  }

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
  };
})();

// Iterate over each Pokémon in the list and add them to the UI
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
