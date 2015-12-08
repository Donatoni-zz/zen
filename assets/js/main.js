// Settings users name
$(function() {

    // Checks to see if a users name has been set or not and updates variable is so.
    chrome.storage.sync.get('name', function(user) {
        var name = "You";

        if(user.name) {
            var name = (user.name);
        }

        $('.user-info__name--show').text(name);
    });

    // Sets name and clears field.
    $('.user-info__submit').click(function() {
        var newName = $('.user-info__name').val();
        chrome.storage.sync.set({'name' : newName}, function() {
            $('.status-message').text("Your settings have been updated!");
            $('.status-message').fadeIn('slow');
            $('.status-message').addClass('fadeInUp');
            $('.user-info__name').val("");            
        })
        return false;
    });

    // Listens for change and updates name test if updated. 
    chrome.storage.onChanged.addListener(function(){
        chrome.storage.sync.get(['name'], function(user){
            $('.user-info__name--show').text(user.name);
        });
    });

    // Gets time and date and displays it on page.
    var interval = setInterval(function() {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('MMMM DD, YYYY'));
        $('#time-part').html(momentNow.format('hh:mm A'));
    }, 100);
});
