console.log('toimii');
document.querySelector('#Kirjoita').addEventListener('click', e => {
  e.preventDefault();
  console.log('Klikkaus toimii');
  document.querySelector('#Taulukko').innerHTML = 'Taulukon sisältö muuttuu';
  document.querySelector('#temp').innerHTML = 'Lämpötila: ##';
  document.querySelector('#humid').innerHTML = 'Ilmankosteus: ##';
});

//-------------------Pizza Chart ----------------------------

// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
//document.querySelector('#Taulukko').innerHTML = '<table><tr><td>Lämpötila</td><td>Ilmankosteus</td></tr><tr><td>22</td><td>41</td></table>';
/* Callback that creates and populates a data table,
       instantiates the pie chart, passes in the data and
       draws it.*/


var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};



function drawChart() {

  getJSON('https://func-weather.azurewebsites.net/api/HttpTriggerCSharp2?code=03Hf14xSawGyeGtfxZTCLJ5mGLx0GGusap2f3zssPqg6n3KriqizHg==&deviceId=3a002e000447393035313138&amount=10', function (err, data) {
    let dataTable = '<table border=1><tr><td>Pvm</td><td>Temp</td><td>Humid</td></tr>';

    // lämppäkoodi
    var data_temp = new google.visualization.DataTable();
     data_temp.addColumn('string', 'Pvm');
     data_temp.addColumn('number', 'Lämpötila');

     var data_hum = new google.visualization.DataTable();
     data_hum.addColumn('string', 'Pvm');
     data_hum.addColumn('number', 'Kosteus%');


    const dataHistory = data.map(function (measure) {
      dataTable = dataTable + `<tr><td>${measure.Timestamp.split('T')[0]}<b> klo: </b>${(measure.Timestamp).split('T')[1].split('.')[0]} </td><td>${measure.Temp} </td><td> ${measure.Hum} </td></tr>`
    
      data_temp.addRows([
      [(measure.Timestamp).split('T')[1].split('.')[0], parseInt(measure.Temp)]
      ]);

      data_hum.addRows([
      [(measure.Timestamp).split('T')[1].split('.')[0], parseInt(measure.Hum)]
      ]);
   
    });

    dataTable = dataTable + '</table>';

    document.querySelector('#Taulukko').innerHTML = dataTable;
    var options_temp = {
    'title': 'Lämpötilat',
    'width': 700,
    'height': 300
    };

     var options_hum = {
    'title': 'Kosteus%',
    'width': 700,
    'height': 300
    };


    
     // Instantiate and draw our chart, passing in some options.
     var chart = new google.visualization.LineChart(document.getElementById('temp'));
     chart.draw(data_temp, options_temp);

     var chart2 = new google.visualization.ColumnChart(document.getElementById('humid'));
     chart2.draw(data_hum, options_hum);
  });


  /* // Create the data table
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
   data.addRows([
     ['Pineapple', 3],
     ['Tuna', 2],
     ['Ham', 2],
     ['Kebab', 1],
     ['Pepperoni',1]
     ]);
 
   // Set chart options
   var options = {'title': 'How much pizza i ate last night',
                   'width':400,
                   'height':300};
 
 
     // Instantiate and draw our chart, passing in some options.
     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
     chart.draw(data, options);
 */

/*
  var data_temp = new google.visualization.DataTable();
  data_temp.addColumn('string', 'Pvm');
  data_temp.addColumn('number', 'Lämpötila');
  data_temp.addRows([
    ['1.1.2011', 5],
    ['2.1.2011', 2],
    ['3.1.2011', 0],
    ['4.1.2011', 1],
    ['5.1.2011', 5],
    ['6.1.2011', 7]
  ]);

  // Set chart options
  var options_temp = {
    'title': 'Lämpötilat',
    'width': 700,
    'height': 300
  };


  // Instantiate and draw our chart, passing in some options.
  var chart_temp = new google.visualization.LineChart(document.getElementById('temp'));
  chart_temp.draw(data_temp, options_temp);

  var data_humid = new google.visualization.DataTable();
  data_humid.addColumn('string', 'PVM');
  data_humid.addColumn('number', 'Ilmankosteus');
  data_humid.addRows([
    ['1.1.2011', 5],
    ['2.1.2011', 2],
    ['3.1.2011', 0],
    ['4.1.2011', 1],
    ['5.1.2011', 5],
    ['6.1.2011', 7]
  ]);

  // Set chart options
  var options_humid = {
    'title': 'Ilmankosteus',
    'width': 700,
    'height': 300
  };


  // Instantiate and draw our chart, passing in some options.
  var chart_humid = new google.visualization.ColumnChart(document.getElementById('humid'));
  chart_humid.draw(data_humid, options_humid);

  /* <------------------------------------------------------------------------>
  
  
  
  //Lämpötila chartti
     var data_temp = new google.visualization.Data.Table();
     data_temp.addColumn('string', 'Päivämäärä');
     data_temp.addColumn('number','Asteet');
     data_temp.addRows([
       ['1.1.2011',-5],
       ['2.1.2011',-2],
       ['3.1.2011',0],
       ['4.1.2011',1],
       ['5.1.2011',-5],
       ['6.1.2011',-7],
    
  
      var chart_temp = new google.visualization.LineChart(document.getElementById('temp'));
      chart.draw(data, options);
  // Ilmankosteus chartti
  
  
  
  
     var data_humid = new google.visualization.Data.Table();
     data_humid.addColumn('string', 'Päivämäärä');
     data_humid.addColumn('number','Asteet');
     data_hum.addRows([
       ['1.1.2011',-5],
       ['2.1.2011',-2],
       ['3.1.2011',0],
       ['4.1.2011',1],
       ['5.1.2011',-5],
       ['6.1.2011',-7],
     ])
     var chart_humid = new google.visualization.LineChart(document.getElementById('humid'));
      chart.draw(data, options);
   }
  */
}