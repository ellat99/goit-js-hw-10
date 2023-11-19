import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Adăugați această linie pentru a seta lățimea dorită pentru breed-select
  breedSelect.style.width = '200px'; // Puteți ajusta acest număr la dimensiunea dorită

  // Ascundem loaderul și eroarea inițial
  loader.style.display = 'none';
  error.style.display = 'none';

  // Încărcăm lista de rase la încărcarea paginii
  fetchBreeds()
    .then(breeds => {
      loader.style.display = 'none'; // Ascundem loaderul la finalizarea cererii
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      loader.style.display = 'none'; // Ascundem loaderul în caz de eroare
      error.style.display = 'block'; // Afișăm eroarea
      console.error('Error fetching breeds:', error);
    });

  // Ascultăm schimbările în selector și efectuăm cererea pentru informații despre pisică
  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;

    if (selectedBreedId) {
      loader.style.display = 'block'; // Afișăm loaderul în timpul cererii
      error.style.display = 'none'; // Ascundem eroarea, dacă era afișată anterior
      catInfo.style.display = 'none'; // Ascundem informațiile despre pisică în timpul cererii

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          // Afișăm informațiile despre pisică
          const catImage = document.createElement('img');
          catImage.src = catData.url;
          catInfo.innerHTML = ''; // Golește conținutul existent
          catInfo.appendChild(catImage);
          const catName = document.createElement('p');
          catName.textContent = catData.breeds[0].name;
          catInfo.appendChild(catName);
          const catDescription = document.createElement('p');
          catDescription.textContent = catData.breeds[0].description;
          catInfo.appendChild(catDescription);
          const catTemperament = document.createElement('p');
          catTemperament.textContent = catData.breeds[0].temperament;
          catInfo.appendChild(catTemperament);
        })
        .catch(error => {
          loader.style.display = 'none'; // Ascundem loaderul în caz de eroare
          error.style.display = 'block'; // Afișăm eroarea
          console.error('Error fetching cat information:', error);
        })
        .finally(() => {
          loader.style.display = 'none'; // Ascundem loaderul după finalizarea cererii
          catInfo.style.display = 'block'; // Afișăm informațiile despre pisică după finalizarea cererii
        });
    }
  });
});
