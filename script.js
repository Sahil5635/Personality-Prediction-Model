var questions = [
  "I am the life of the party.",
 "I feel comfortable around people.",
 "I don't talk a lot.",
 "I keep in the background.",
 "I start conversations.",
 "I have little to say.",
 "I talk to a lot of different people at parties.",
 "I don't like to draw attention to myself.",
 "I don't mind being the center of attention.",

 "I am quiet around strangers.",
"I get stressed out easily.",
"I am relaxed most of the time.",
"I worry about things.",
"I seldom feel blue.",
"I am easily disturbed.",
"I get upset easily.",
"I change my mood a lot.",
"I have frequent mood swings.",
"I get irritated easily.",

"I often feel blue.",
"I feel little concern for others.",
"I am interested in people.",
"I insult people.",
"I sympathize with others' feelings.",
"I am not interested in other people's problems.",
"I have a soft heart.",
"I am not really interested in others.",
"I take time out for others.",
"I feel others' emotions.",

"I make people feel at ease.",
"I am always prepared.",
"I leave my belongings around.",
"I pay attention to details.",
"I make a mess of things.",
"I get chores done right away.",
"I often forget to put things back in their proper place.",
"I like order.",
"I shirk my duties.",
"I follow a schedule.",

"I am exacting in my work.",
"I have a rich vocabulary.",
"I have difficulty understanding abstract ideas.",
"I have a vivid imagination.",
"I am not interested in abstract ideas.",
"I have excellent ideas.",
"I do not have a good imagination.",
"I am quick to understand things.",
"I use difficult words.",
"I spend time reflecting on things.",

"I am full of ideas."
 ];

//         var selectedAnswers = [];
//         var ans_list = [];

//         function submitForm() {
//             var answer = document.querySelector('input[name="option"]:checked').value;
//             var currentQuestion = questions.shift();

//             selectedAnswers.push(currentQuestion + ": " + answer);

//             switch (answer) {
//                 case "Strongly Disagree":
//                     ans_list.push(1);
//                     break;
//                 case "Disagree":
//                     ans_list.push(2);
//                     break;
//                 case "Neutral":
//                     ans_list.push(3);
//                     break;
//                 case "Agree":
//                     ans_list.push(4);
//                     break;
//                 case "Strongly Agree":
//                     ans_list.push(5);
//                     break;
//             }

//             if (questions.length > 0) {
//                 document.getElementById('question').textContent = questions[0];
//             } else {
//                 document.getElementById('questionnaire').style.display = 'none';
//                 document.getElementById('response').textContent = selectedAnswers.join("\n");
//                 document.getElementById('finish').style.display = 'block';
//                 makePrediction();
//             }
//         }

//       function makePrediction() {


//     // Make a POST request to the Flask app to send the ans_list data
//     fetch('/predict', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 'ans_list': ans_list })
//     })
//     .then(response => response.json())
//     .then(data => {
//         var prediction = data.prediction;
//         // Handle the prediction result
//         console.log('Prediction:', prediction);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

var selectedAnswers = [];
var ans_list = [];

function submitForm() {
var answer = document.querySelector('input[name="option"]:checked').value;
var currentQuestion = questions.shift();

selectedAnswers.push(currentQuestion + ": " + answer);

switch (answer) {
case "Strongly Disagree":
ans_list.push(1);
break;
case "Disagree":
ans_list.push(2);
break;
case "Neutral":
ans_list.push(3);
break;
case "Agree":
ans_list.push(4);
break;
case "Strongly Agree":
ans_list.push(5);
break;
}

if (questions.length > 0) {
document.getElementById('question').textContent = questions[0];
} else {
document.getElementById('questionnaire').style.display = 'none';
document.getElementById('response').textContent = selectedAnswers.join("\n");
document.getElementById('finish').style.display = 'block';
}
}

function makePrediction() {
var data = {
'ans_list': ans_list
};

// Make a POST request to the Flask app to send the ans_list data
fetch('/predict', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
var prediction = data.prediction;
// Display the prediction result
document.getElementById('prediction-result').textContent = 'According to the analysis, your personality falls into Cluster: ' + prediction;
document.getElementById('result').style.display = 'block';


var clusterDescriptionElement = document.getElementById('cluster-description');
var description = '';
var analysis = '';

if (prediction === 0) {
description = 'Cluster 0:<br><br>Extraversion: Low<br>Neuroticism: Average<br>Agreeableness: High<br>Conscientiousness: High<br>Openness: Low';
analysis = 'Analysis for Cluster 0';
} else if (prediction === 1) {
description = 'Cluster 1:<br><br>Extraversion: Very Low<br>Neuroticism: High<br>Agreeableness: Low<br>Conscientiousness: Low<br>Openness: Low';
analysis = 'Analysis for Cluster 1';
} else if (prediction === 2) {
description = 'Cluster 2:<br><br>Extraversion: High<br>Neuroticism: Average<br>Agreeableness: Average<br>Conscientiousness: Low<br>Openness: Average';
analysis = 'Analysis for Cluster 2';
} else if (prediction === 3) {
description = 'Cluster 3:<br><br>Extraversion: Low<br>Neuroticism: Low<br>Agreeableness: Very Low<br>Conscientiousness: Average<br><br>Openness: Low';
analysis = 'Analysis for Cluster 3';
} else {
description = 'Cluster 4:<br><br>Extraversion: High<br>Neuroticism: Very Low<br>Agreeableness: Average<br>Conscientiousness: High<br>Openness: High';
analysis = 'Analysis for Cluster 4';
}

clusterDescriptionElement.innerHTML = description + '<br><br>' + analysis;
link = '<p>To know more about these clusters, <a href="https://example.com/clusters" target="_blank">click here</a>.</p>';
linkContainerElement.innerHTML = link;

})
.catch(error => {
console.error('Error:', error);
});
}

