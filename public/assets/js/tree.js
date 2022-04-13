const $plotId = $('#plot-id');
const $scientificName = $('#scientific-name');
const $submitBtn = $('#submit');
const $psa = $('#psa');
const $pov = $('#pov');
const $xCoord = $('#x-coord');
const $yCoord = $('#y-coord');
const $mapId = $('#mapId');
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
    Plot_ID: $plotId.val().trim(),
    Scientific_Name: $scientificName.val().trim(),
    MY0_Height: $height.val().trim(),
    Performance_Standard_Approval: $psa.val().trim(),
    Planted_or_Volunteer: $pov.val().trim(),
    X_Coordinate: $xCoord.val().trim(),
    Y_Coordinate: $yCoord.val().trim(),
    Map_ID: $mapId.val().trim(),
    UserId: window.userId
    
  };

  if (!(tree.Plot_ID && tree.Scientific_Name && tree.Performance_Standard_Approval && tree.MY0_Height && tree.Planted_or_Volunteer && tree.X_Coordinate && tree.Y_Coordinate && tree.Map_ID )) {
    alert('You must enter plot id, scientific name and height!');
    return;
  }

  API.saveTree(tree).then(function () {
  console.log('tree added');
  });

  $plotId.val('');
  $scientificName.val('');
  $height.val('');
  $psa.val('');
  $pov.val('');
  $xCoord.val('');
  $yCoord.val('');
  $mapId.val('');
};

$submitBtn.on('click', handleFormSubmit);