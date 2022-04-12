const $plotId = $('#plot-id');
const $scientificName = $('#scientific-name');
const $submitBtn = $('#submit');
const $height = $('#height');


const API = {
  saveTree: function (tree) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/trees',
      data: JSON.stringify(tree)
    });
  },
  getTree: function () {
    return $.ajax({
      url: 'api/trees',
      type: 'GET'
    });
  },
  deleteTree: function (id) {
    return $.ajax({
      url: 'api/trees/' + id,
      type: 'DELETE'
    });
  }
};


const handleFormSubmit = function (event) {
  event.preventDefault();

  const tree = {
    plotId: $plotId.val().trim(),
    scientificName: $scientificName.val().trim(),
    height: $height.val().trim(),
    UserId: window.userId
  };

  if (!(tree.plotId && tree.scientificName && tree.height)) {
    alert('You must enter plot id, scientific name and height!');
    return;
  }

  API.saveTree(tree).then(function () {
  console.log('tree added');
  });

  $plotId.val('');
  $scientificName.val('');
  $height.val('');
};

$submitBtn.on('click', handleFormSubmit);