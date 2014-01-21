$(document).ready(initialize);

function initialize(){
  $('h1').css('color','red');
  $('h1').css('font-size','15px');
  //var currentH1Text = $('h1').text();
  //console.log(currentH1Text);
  $('h1').text('Welcome to JavaScript...!');
  //console.log(currentH1Text);

  $('div').css('color','#ff00ff');
  $('#d2').css('font-size','9px');
  $('#d3').css('background-color','yellow');
  $('.c1').css({'color':'green','background-color':'red'}).text('Nat');

  //var color = prompt("Give me a background color!");
  //$('#d3').css('background-color',color);

  //var d3text = prompt("What text do you want for div 3?");
  //$('#d3').text(d3text);

  //var numCps = $('.cp').length;
  //console.log(numCps);
}
