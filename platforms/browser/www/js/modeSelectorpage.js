var modePage = '<div class="navbar"><div class="navbar-inner"><div class="left">' + // html for dynamic page loading
    '<!--<a href="#" class="back link">-->' +
    '<i class="icon icon-back"></i>' +
    '<p id= returnLnk><a href="#"> Back</a></p>' +
    '</div>' + // here is okay
    '<!-- We need cool sliding animation on title element, so we have additional "sliding" class -->' +
    '<div class="center sliding">' +
    '<h3 id =headline>Mode Selector</h3>' +
    '</div>' +
    '<div class="right"></div>' +
    '</div>' +
    '</div>' + // here is okay
    '<div class = "page" data-page="modeSelect">' + '<div class="page-content">' + // identifier for callback in framwork 7


    '<!-- Page, "data-page" contains page name -->' +
    '<!-- Scrollable page content -->' +
    '<div class="page-content">' +
    '<div class="content-block">' +
    '<h3><i>Please select a testing mode.</i></h3>' +
    '<p>"<b>Test Mode</b>" features 25 questions. At the end of the test, your score will be revealed along with the ' + 'questions and the corrected answers.</p>' +
    '<p>' +
    'In "<b>Study Mode</b>", after you select the amount of questions that you wish to receive, you may start. The ' + 'moment after you pick an answer, if correct, appear in green; if incorrect, it will appear in red.' +
    '</p>' +

    '<div>' +

    '<div>' +
    '<a href="#" id=test class="button">Test Mode</a>' +

    '</div>' +
    '<div>' +
    '<p><a href="#" id=quiz class="button">Quiz/Study Mode</a></p>' +
    '</div>' +


    '<div class="content-block-title">Choose amount of questions</div>' +
    '<div class="list-block">' +
    '<ul>' +
    '<li>' +
    '<div class="item-content">' +
    '<div class="item-inner">' +
    '<div class="item-input">' +
    '<input type="text" placeholder="10" readonly id="picker-device">' +
    '</div>' +
    ' </div>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +

    '<div>' +

    '</div>' +


    '</div>' +



    '</div>' +
    '</div>' +
    '</div></div>';





var testPage =
    '<div class="navbar">' +
    '<div class="navbar-inner">' +
    '<div class="left">' +
    '<i class="icon icon-back"></i>' +
    '<p id= returnLnk><a href="#"> Exit</a></p>' +
    '</div>' +
    '<!-- We need cool sliding animation on title element, so we have additional "sliding" class -->' +
    '<div class="center sliding" id = questionTitle>Whatever Question number</div>' +
    '<div class="right">' +

    '<a href="#" class="link icon-only open-panel"><i class="icon icon-bars"></i></a>' +
    '</div>' +
    '</div>' +
    '</div>' + // here is okay


    '<div class = "page no-swipeback" data-page="quizPage">' + // identifier for callback in framework 7
    '<div class="statusbar-overlay"></div>' +

    // panel was here


    '<div class="page-content">' +

    '<!-- Panels overlay-->' +


    '<div class="panel-overlay"></div>' +
    '<div class="panel panel-right panel-cover">' +
    '<div id = panel class="content-block">' +
    '<br>' +

    '</div>' +
    '</div>' +

    '<!-- Page, "data-page" contains page name -->' +
    '<!-- Scrollable page content -->' +
    '<div class="page-content">' +

    '<div class="content-block">' +

    '<!--This block contains the form for the Q' + 's & A' + 's-->' +
    '<p id=prompt><b>Which of the following is NOT a type of motherboard expansion slot?</b> </p><br>' +
    '<div class="content-block-inner">' +
    '<form>' +
    '<input type="radio" id=A name="choice" value="A"><label id= A_text></label> <br><br>' +
    '<input type="radio" id=B name="choice" value="B"><label id= B_text></label><br><br>' +
    '<input type="radio" id=C name="choice" value="C"><label id= C_text></label><br><br>' +
    '<input type="radio" id=D name="choice" value="D"><label id= D_text></label>' +
    '</form><br>' +

    '</div>' +
        
    '<p> <a href = # class= "button" id = temp> temp button</a></p>' +
    '<p> <a href="#" class="button" id = submit>Submit Answer</a></p>' +
    '<div class="page-content">' +

    '<div class="row">' +
    '<div class ="col-50">' +
    '<a href="#" id = previous class="button button-big">Previous</a></div>' +
    '<div class="col-50">' +
    '<a href="#" id = next class="button button-big">Next</a></div>' +


    '<div>' +

    '</div>' +
    '</div>' +
    '</div>' +


    '</div>' +
    '</div>' +

    '</div>' +

    '<div class="toolbar">' +
    '<div class="toolbar-inner">' +
        '<p></p>' +
        '<label>__ out of / __</label>' +
        '<p></p>'+
    '</div>' +
    '</div>' +

    '</div>';


var resultsPage =
    '<div class="navbar">' +
    '<div class="navbar-inner">' +
    '<div class="left">' +
    // html for dynamic page loading

    '</div>' + // here is okay

    '<div class="center sliding">' +
    '<h3>Final Score</h3>' +
    '</div>' +
    '<div class="right">' +
    '</div>' +
    '</div>' +
    '</div>' + // here is okay
    '<div class = "page no-swipeback" data-page="resultsPage">' +
    '<div class="page-content">' + // identifier for callback in framwork 7


    //<!-- Page, "data-page" contains page name -->
    //<!-- Scrollable page content -->
    '<div class="content-block">' +
    //<!-- Buttons row as tabs controller -->
    '<div class="buttons-row">' +
    //<!-- Link to 1st tab, active -->
    '<a href="#tab1" class="tab-link active button">Score</a>' +
    //<!-- Link to 2nd tab -->
    '<a href="#tab2" class="tab-link button">Explanations</a>' +
    '</div>' +
    '</div>' +


     //<!-- Tabs, tabs wrapper -->
     '<div class="tabs">' +
     //<!-- Tab 1, active by default -->
     '<div id="tab1" class="tab active">' +
     '<div class="content-block">' +
     '<div id = resultTitle class="content-block-title">Your Final Score Is: </div>' +
     '<div class="content-block inset">' +

    '<div class="content-block-inner">' +


    '<label>' +

        
    '<label id = resultlbl>' +

    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    'Score will be here.' +
    '</label>' +

    '</div>' +
    '</div>' +
    '<div class="list-block inset">' +
    '<ul>' +
    '<li>' +

    '<a href="#" id = home class="item-link list-button">Home</a>'+        

    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>' +
    //<!-- Tab 2 -->
    '<div id="tab2" class="tab">' +

   
    '<div id =explain class="content-block">' +

    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '</div>';
