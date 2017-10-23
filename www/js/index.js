// globals

var selectedType = 'ceh'; // will default to ceh
var questionList = [];
var answerBank = [];
var currentQuestion =0;
var pickerNumber;
var quizMode =true;
var choiceA;
var choiceB;
var choiceC;
var choiceD;
var choiceALabel;
var choiceBLabel;
var choiceCLabel;
var choiceDLabel;
loadTestChoicePage(); // initial load of test page


function displayRecord(tx, results) // loads result set into the questionlist. used by question handler
{   
    questionList = []; // clear question list upon new query
    console.log('This many questions in the table: '+ results.rows.length); 
    console.log("loading questions for test");
    for(i=0, c= results.rows.length; i<c && i<pickerNumber;++i)
        {
            questionList[i]=
            {
                prompt: results.rows.item(i).inquisition,
                answer1: results.rows.item(i).a1,
                answer2: results.rows.item(i).a2,
                answer3: results.rows.item(i).a3,
                answer4: results.rows.item(i).a4,
                correctAnswer: results.rows.item(i).correct,
                explanation: results.rows.item(i).Explanation
            };
        }    
    console.log("questions have loaded");
    questionList = shuffle(questionList);
    console.log("shuffled questions");
 
};

function createDb() // creates the database
{
    "use strict";
    databaseHandler.createDatabase(filehandler.loadtheTestBank);
 
};

function shuffle(array) //Fisher-Yates shuffle algorithm
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



function loadmodepage() // loads the quiz or test selection page
{
    var pickerDevice = myApp.picker(
        {
            input: '#picker-device', 
            closeByOutsideClick: true,
            cols: 
            [{
                textAlign: 'center',
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
            }]
        });
    
    switch(selectedType) // switch to select the title
    {
    case 'S+':
         document.getElementById('headline').innerHTML ='Security+';
        break;
    case 'N+':
         document.getElementById('headline').innerHTML ='Network+';
        break;
    case 'A+H':   
        document.getElementById('headline').innerHTML ='A+ Hardware';
    default:
         document.getElementById('headline').innerHTML ='A+ Software';
    }
    document.getElementById('quiz').onclick = function() // quiz button click function
    {
        quizMode = true;
        loadtestPage(pickerDevice.value);   
    };
    document.getElementById('returnLnk').onclick = backbutton;
    document.getElementById('test').onclick = function() // quiz button click function
    {
        quizMode = false;
        loadtestPage(pickerDevice.value);   
    };
};
function loadtestPage(pick) // loads the test page accepts the picker value
{
    if(typeof pick == 'undefined') // check if they bothered to used the picker
    {
        pickerNumber = 10;
    }
    else
    {
        pickerNumber = pick[0];
    }
    questionTableHandler.selectQuestions(displayRecord, selectedType); //select the questions according to the choice
    mainView.router.loadContent(testPage); // changes the page to the quiz app Page  
    currentQuestion =0;
    quizChanges();
   
   
    document.getElementById('temp').onclick = function()
    {
       submitAll();
    };
    
  
    document.getElementById('previous').onclick = function()
    {
        previousQuestion();
    };
    document.getElementById('next').onclick = function()
    {
        nextQuestion();
    };
    document.getElementById('returnLnk').onclick = backbutton;
        

};
function nextQuestion() // moves to next question
{
    assignAnswer();
    if(currentQuestion<questionList.length-1)
    {
        currentQuestion++;
        loadQuestion();        
    }
   
};
function previousQuestion() // moves to next question
{
    assignAnswer();
    if(currentQuestion-1>=0)
    {
        currentQuestion--;
        loadQuestion();        
    }
   
};
function assignAnswer() // places the answer selected in the Answer Bank
{
            if(choiceA.checked)
            { 
                answerBank[currentQuestion] = choiceA.value;
            }
            else
            { 
                if(choiceB.checked)
                {
                    answerBank[currentQuestion] = choiceB.value; 
                }
                else 
                {
                    if(choiceC.checked)
                    {
                        answerBank[currentQuestion] = choiceC.value; 
                    }
                    else 
                    {
                        if(choiceD.checked)
                        {
                            answerBank[currentQuestion] = choiceD.value; 
                        }
                    }
                }
            }
};
function loadQuestion() // loads the questions  and other items to the page during the exam
{
    document.getElementById('questionTitle').innerHTML = "Question Number "+(currentQuestion+1);
    document.getElementById('A_text').innerHTML = questionList[currentQuestion].answer1;
    document.getElementById('B_text').innerHTML = questionList[currentQuestion].answer2;
    document.getElementById('C_text').innerHTML = questionList[currentQuestion].answer3;
    document.getElementById('D_text').innerHTML = questionList[currentQuestion].answer4;
    document.getElementById('prompt').innerHTML = questionList[currentQuestion].prompt;
    choiceA.value = questionList[currentQuestion].answer1;
    choiceB.value = questionList[currentQuestion].answer2;
    choiceC.value = questionList[currentQuestion].answer3;
    choiceD.value = questionList[currentQuestion].answer4;
    if(typeof answerBank[currentQuestion] == 'undefined')
    {
        document.getElementById('A').checked = false;
        document.getElementById('B').checked = false;
        document.getElementById('C').checked = false;
        document.getElementById('D').checked = false;
    }
    else
    {        
        switch(answerBank[currentQuestion])
        {
            case document.getElementById('A').value:
                document.getElementById('A').checked = true;             
                break;
            case document.getElementById('B').value:
                document.getElementById('B').checked = true; 
            break;
            case document.getElementById('C').value:
                document.getElementById('C').checked = true;   
            break;
            case document.getElementById('D').value:
                document.getElementById('D').checked = true; 
            break;
            default:
        }
    }
    if(choiceC.value == 'undefined') // test for and hide if true/false
    {
        console.log('This is the A value: '+ choiceA.value);
        console.log('This is the B value: '+ choiceB.value);
        console.log('The listed correct answer is: '+  questionList[currentQuestion].correctAnswer);
        choiceC.style.display = 'none';
        choiceC.disabled = true;
        document.getElementById('C_text').style.display = 'none';
    }
    else
    {
        choiceC.style.display = 'inline';
        choiceC.disabled = false;
        document.getElementById('C_text').style.display = 'inline';
    }
    if(choiceD.value == 'undefined') // test for and hide if true/false
    {
        choiceD.style.display = 'none';
        document.getElementById('D_text').style.display = 'none';
        choiceD.disabled = true;
    }
    else
    {
        choiceD.disabled = false;
        choiceD.style.display = 'inline';
        document.getElementById('D_text').style.display = 'inline';
    }
    
   choiceALabel.style.background = '';
   choiceBLabel.style.background = '';
   choiceCLabel.style.background = '';
   choiceDLabel.style.background = '';
   document.getElementById('qlbl').innerHTML = "Question "+(currentQuestion+1)+" out of "+ questionList.length;
    if (currentQuestion+1 == questionList.length)
    {
        document.getElementById('temp').style.display = '';        
    }
    else
    {
        document.getElementById('temp').style.display = 'none';   
    }
        
    document.getElementById('returnLnk').onclick = backbutton;
};
function quizChanges() // changes all of the items related to quiz mode
{
    
    choiceA = document.getElementById('A');
    choiceB = document.getElementById('B');
    choiceC = document.getElementById('C');
    choiceD = document.getElementById('D');
    choiceALabel= document.getElementById('A_text');
    choiceBLabel= document.getElementById('B_text');
    choiceCLabel= document.getElementById('C_text');
    choiceDLabel= document.getElementById('D_text');
    
     if(quizMode)
    {
         
        document.getElementById('submit').innerHTML = 'Explanation';// change the submit button if it's a quiz
        document.getElementById('submit').onclick = function()
        {
            myApp.alert(questionList[currentQuestion].explanation, 'Explanation');
        };
        choiceA.onclick = highlight;
        choiceB.onclick = highlight;
        choiceC.onclick = highlight;
        choiceD.onclick = highlight;
        
        choiceALabel.onclick = function()
        {
            choiceA.checked = true;
            highlight();
        }
        choiceBLabel.onclick = function()
        {
            choiceB.checked = true;
            highlight();
        }
        choiceCLabel.onclick = function()
        {
            choiceC.checked = true;
            highlight();
        }
        choiceDLabel.onclick = function()
        {
            choiceD.checked = true;
            highlight();
        }
    }
    else
    {
        document.getElementById('submit').style.display = 'none';
        choiceA.onclick = assignAnswer;
        choiceB.onclick = assignAnswer;
        choiceC.onclick = assignAnswer;
        choiceD.onclick = assignAnswer;
        choiceALabel.onclick = function()
        {
            choiceA.checked = true;
            assignAnswer();
        }
        choiceBLabel.onclick = function()
        {
            choiceB.checked = true;
            assignAnswer();
        }
        choiceCLabel.onclick = function()
        {
            choiceC.checked = true;
            assignAnswer();
        }
        choiceDLabel.onclick = function()
        {
            choiceD.checked = true;
            assignAnswer();
        }
        pickerNumber = 25;
    }
   
    
};
function loadTestChoicePage() // loads the items associated with the test choice page
{
    document.getElementById('a+h').onclick = function()
    {
        selectedType= 'A+H';
        mainView.router.loadContent(modePage); // changes the page to the mode page
        loadmodepage();
    };
    document.getElementById('a+s').onclick = function()
    {
        selectedType= 'A+S';
        mainView.router.loadContent(modePage); // changes the page to the mode page
        loadmodepage();

    };
    document.getElementById('n').onclick = function()
    {
        console.log("button was clicked so now");
        selectedType= 'N+';
        mainView.router.loadContent(modePage); // changes the page to the mode page
        loadmodepage();
    };
    document.getElementById('s').onclick = function()
    {
        console.log("button was clicked so now");
        selectedType= 'S+';
        mainView.router.loadContent(modePage); // changes the page to the mode page
        loadmodepage();
    }; 
};
function highlight() // changes the color depending on the correct answer selected
{
    assignAnswer();
    if(choiceA.checked)
    {                
        if(choiceA.value == questionList[currentQuestion].correctAnswer)
        {
            choiceALabel.style.background = '#0bff0b';
        }
        else
        {
            choiceALabel.style.background =  '#ff3220';
        }
    }
    else if(choiceB.checked)
    {
        if(choiceB.value == questionList[currentQuestion].correctAnswer)
        {
            choiceBLabel.style.background= '#0bff0b';  
        }
        else
        {
            choiceBLabel.style.background =  '#ff3220'; 
        }           
    }
    else if(choiceC.checked)
    {
        if(choiceC.value == questionList[currentQuestion].correctAnswer)
        {
            console.log('choice '+ choiceC.value);
            console.log('choice '+ questionList[currentQuestion].correctAnswer);
            choiceCLabel.style.background= '#0bff0b';  
        }
        else
        {
            choiceCLabel.style.background =  '#ff3220'; 
        }           
    }
     else if(choiceD.checked)
    {
        if(choiceD.value == questionList[currentQuestion].correctAnswer)
        {
            choiceDLabel.style.background= '#0bff0b';  
        }
        else
        {
            choiceDLabel.style.background =  '#ff3220'; 
        }           
    }
            
};
function checkAllAnswers() // provides the score for the test
{
    var score = 0;
    var right = 0;
    for(i=0, c= questionList.length;i<c;++i)
        {
            if(answerBank[i] == questionList[i].correctAnswer)
            {
                right++;
            }
        }
    score = right/questionList.length;
    return score *100;
};
function backbutton() // handles backward navigation from screens
{
    if(mainView.activePage.name == 'quizPage') //handles for quiz page
    {
      
        myApp.confirm('Leaving now will delete all progress.', 'Leaving Exam',function () 
            {
                 mainView.router.back();
            });    
    }
    else
    {
        if(mainView.activePage.name == 'home') // briefs for app closure
        {
            myApp.confirm('Are you sure you want to exit?', 'Closing PTA',function () 
            {
               navigator.app.exitApp();
            });    
        }
        else 
        {
            if (mainView.activePage.name == 'modeSelect')
            {
                mainView.router.back();
                loadTestChoicePage();
            }
            else if(mainView.activePage.name == 'resultsPage')
            {
                mainView.router.loadContent(homePage);
                loadTestChoicePage();
            }
            else
            {
                mainView.router.back();
            }
        }
    }
};
function submitAll() // submits all of the questions from an exam
{
    myApp.confirm('Are you sure you want to submit the test?', 'Submit Exam',function () 
            {
                 loadResultsPage();
            });    
};
function loadResultsPage() // loads the results page
{
    mainView.router.loadContent(resultsPage);
};
function panelLink(para) // links out from the questions within the testing panel
{
    currentQuestion = parseInt(para.id);
    loadQuestion();
    
};
function loadpanel() // loads the items in the right panel
{
   
    for(i=0, d =questionList.length; i<d;i++)
    {
        var aTag = document.createElement('a');
        var paragraph = document.createElement('p'); 
      
        aTag.setAttribute('href',"#");
        paragraph.setAttribute('id',i.toString());
        aTag.innerHTML = "Question "+(i+1);
        paragraph.appendChild(aTag);  
        paragraph.onclick = function()
        { 
            panelLink(this);
            myApp.closePanel();
        };
            
        document.getElementById('panel').appendChild(paragraph);
    };
    var aTag = document.createElement('a');
    var paragraph = document.createElement('p'); 
    aTag.setAttribute('href',"#");
    aTag.innerHTML = "Submit Exam";
    paragraph.appendChild(aTag);  
    paragraph.onclick = function()
    { 
        submitAll();
    };
            
    document.getElementById('panel').appendChild(paragraph);
    
    
    var aTag = document.createElement('a');
    var paragraph = document.createElement('p'); 
    aTag.setAttribute('href',"#");
    aTag.innerHTML = "Close Panel";
    paragraph.appendChild(aTag);  
    paragraph.onclick = function()
    { 
        myApp.closePanel();
    };
            
    document.getElementById('panel').appendChild(paragraph);
};
function populateResults() // adds the result items to the fields withinthe results page
{
  for(i=0, d=questionList.length; i<d;i++)
    {
        var top = document.createElement('p');
        top.innerHTML = "<b>Question</b>";
        var ans = document.createElement('p');
        ans.innerHTML = "<b>Correct Answer</b>";
        var exp = document.createElement('p');
        exp.innerHTML = "<b>Explanation</b>";
   
    
        var htmlbreak = document.createElement('br');
        var quest = document.createElement('p'); 
        var correct = document.createElement('p');
        var explan = document.createElement('p');
       
        quest.innerHTML = questionList[i].prompt;
        correct.innerHTML = questionList[i].correctAnswer;
        explan.innerHTML = questionList[i].explanation;
            
        document.getElementById('explain').appendChild(top);
        document.getElementById('explain').appendChild(quest);
        document.getElementById('explain').appendChild(ans);
        document.getElementById('explain').appendChild(correct);
        document.getElementById('explain').appendChild(exp);
        document.getElementById('explain').appendChild(explan);
        document.getElementById('explain').appendChild(htmlbreak);
      
       
        
    };   
    var score = checkAllAnswers();
    document.getElementById('resultTitle').innerHTML = 'Your final score is: '+ score.toFixed(2);
    if (score==100)
    {
        document.getElementById('resultlbl').innerHTML = 'Congrats on the perfect score!!!!';
    }
    else if(score>80)
    {
        document.getElementById('resultlbl').innerHTML = "That's a really impressive score! You may be ready to take the test soon.";
    }
    else if(score>50)
    {
        document.getElementById('resultlbl').innerHTML = "Before taking the test, be sure to study more.";
    }
    else
    {
        document.getElementById('resultlbl').innerHTML = "More preparation is required before attempting the exam.";
    }
    document.getElementById('home').onclick = backbutton;
    
};