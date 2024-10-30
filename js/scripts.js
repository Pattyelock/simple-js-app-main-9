// IIFE to encapsulate the repository and keep global state clean
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // Function to add a new Pokémon to the list
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    // Function to retrieve all Pokémon in the list
    function getAll() {
      return pokemonList;
    }
  
    // Fetch Pokémon data from the API and add to the list
    function loadList() {
      return fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
          json.results.forEach(item => {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        })
        .catch(error => console.error(error));
    }
  
    // Load details of a specific Pokémon (type, level, image, etc.)
    function loadDetails(pokemon) {
      return fetch(pokemon.detailsUrl)
        .then(response => response.json())
        .then(details => {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map(typeInfo => typeInfo.type.name).join(', ');
        })
        .catch(error => console.error(error));
    }
  
    // Create list item with button and add click event to show modal
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item'); // Bootstrap class
  
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary', 'pokemon-button'); // Bootstrap classes
  
      // Attach the modal attributes for Bootstrap
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemon-modal');
  
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);
  
      // Event listener to load details and show them in the modal
      button.addEventListener('click', function () {
        loadDetails(pokemon).then(function () {
          showDetails(pokemon);
        });
      });
    }
  
    // Display the modal with Pokémon details
    function showModal(title, details, imageUrl) {
      let modalTitle = document.querySelector('.modal-title');
      let modalDetails = document.querySelector('.modal-details');
      let modalImage = document.querySelector('.modal-image');
  
      modalTitle.innerText = title;
      modalDetails.innerText = details;
      modalImage.src = imageUrl;
  
      // Display the modal using Bootstrap's modal method
      $('#pokemon-modal').modal('show');
    }
  
    // Show details of the selected Pokémon in the modal
    function showDetails(pokemon) {
      showModal(
        pokemon.name,
        `Height: ${pokemon.height}m, Types: ${pokemon.types}`,
        pokemon.imageUrl
      );
    }
  
    // Return public functions
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      addListItem: addListItem,
      loadDetails: loadDetails
    };
  })();
  
  // Load Pokémon list and display each item on the page
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  