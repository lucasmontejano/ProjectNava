function uploadImages() {
    var files = document.getElementById('fileInput').files;
    var listContainer = document.getElementById('imageList');
    listContainer.innerHTML = ''; // Clear previous list
  
    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
  
      reader.onload = (function(file) {
        return function(e) {
          var imgElement = document.createElement('img');
          imgElement.className = 'thumbnail';
          imgElement.src = e.target.result;
          imgElement.onload = function() {
            var colorThief = new ColorThief();
            var dominantColor = colorThief.getColor(imgElement);
            
            // Create a div to display the color
            var colorBox = document.createElement('div');
            colorBox.style.width = '50px';
            colorBox.style.height = '50px';
            colorBox.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            colorBox.style.display = 'inline-block';
            colorBox.style.marginLeft = '10px';
  
            var listItem = document.createElement('li');
            listItem.appendChild(imgElement);
            listItem.appendChild(colorBox);
            listContainer.appendChild(listItem);
          };
  
          // Set default size
          imgElement.style.width = '600px';  // Set width
          imgElement.style.height = '400px'; // Set height
        };
      })(files[i]);
  
      reader.readAsDataURL(files[i]);
    }
  }
  