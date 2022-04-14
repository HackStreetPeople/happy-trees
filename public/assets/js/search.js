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

  const treeName = [];
  const getData = () => {
    //   console.log(API.getTree())
      API.getTree().then(data => {
        //   console.log(data);
        for (let index = 0; index < data.length; index++) {
            const element = data[index].Scientific_Name;
            treeName.push(element);
            
        }
        console.log(treeName);
      })
  }
   getData()


  $( function() {
    
    $( "#tags" ).autocomplete({
      source: treeName
    });
  } );