import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  breedSelect.style.width = '200px';

  loader.style.display = 'none';
  error.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      loader.style.display = 'none';
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching breeds:', error);
    });

  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;

    if (selectedBreedId) {
      loader.style.display = 'block';
      error.style.display = 'none';
      catInfo.style.display = 'none';

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          const catImage = document.createElement('img');
          catImage.src = catData.url;
          catInfo.innerHTML = '';
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
          loader.style.display = 'none';
          error.style.display = 'block';
          console.error('Error fetching cat information:', error);
        })
        .finally(() => {
          loader.style.display = 'none';
          catInfo.style.display = 'block';
        });
    }
  });
});
