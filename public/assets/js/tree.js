const newFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#project-plotId').value.trim();
    const scientificName = document.querySelector('#project-scientificName').value.trim();
    const height = document.querySelector('#project-height').value.trim();

    if (id && scientificName && height) {
        const response = await fetch(`/api/trees`, {
          method: 'POST',
          body: JSON.stringify({ id, scientificName, height }),
          headers: {
            'Content-Type': 'application/json',
          },
        });


    if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Unable to find tree');
      }

    } 
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
