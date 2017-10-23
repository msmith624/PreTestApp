// Initialize app
var myApp = new Framework7({
    panelsCloseByOutside: true
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () 
{
    console.log("Device is now ready!");
    document.addEventListener("backbutton", backbutton, true);
    createDb();
    
});

myApp.onPageAfterAnimation("quizPage", function()
{
    loadQuestion();
    loadpanel();  
    
    
}); 



myApp.onPageAfterAnimation("resultsPage", function()
{
    populateResults();  
    
}); 



