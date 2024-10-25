let pokemonRepository = (function () {
    let pokemonList = []; // Now we're fetching the list dynamically
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // Public method to get all Pokémon
    function getAll() {
      return pokemonList;
    }
  
    // Public method to add a new Pokémon
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    // Function to fetch and load the Pokémon list from the API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon); // Add Pokémon to the list
        });
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    // Function to fetch and load the details for a specific Pokémon
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Add detailed data to the Pokémon item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(typeInfo => typeInfo.type.name);
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    // AddListItem to create buttons and display them in the DOM
    function addListItem(pokemon) {
      // Select the ul element where the list will be displayed
      let pokemonListElement = document.querySelector('.pokemon-list');
  
      // Create an li element
      let listItem = document.createElement('li');
  
      // Create a button element
      let button = document.createElement('button');
      button.innerText = pokemon.name; // Set the button's text to the Pokémon's name
      button.classList.add('pokemon-button'); // Add class for styling
  
      // Append the button to the list item
      listItem.appendChild(button);
  
      // Append the list item to the unordered list
      pokemonListElement.appendChild(listItem);
  
      // Add event listener to the button to show Pokémon details on click
      button.addEventListener('click', function () {
        loadDetails(pokemon).then(function () {
          showDetails(pokemon);
        });
      });
    }
  
    // Function to show details of a specific Pokémon (for now, console log the details)
    function showDetails(pokemon) {
      console.log(pokemon); // This will print the Pokémon object when clicked
    }
  
    // Return the methods that should be publicly accessible
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  // Load the Pokémon list and create buttons for each Pokémon
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  