$(document).ready(function(){
  $('#celebs ul a').click(function(e) {
    var url = $(this).attr('href') + '#description';
	console.log(url) ;
    $('#biography').html('loading...').load(url);
    e.preventDefault();
  })
  $('#description').on('mouseover', function() {
    $(this).css('background-color', 'yellow');
  });
  $('#description').on('mouseout', function() {
    $(this).css('background-color', 'inherit');
  });
});
