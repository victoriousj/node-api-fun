const readline = require('readline-sync');
const profile = require('./profile');
const colors = require('colors');
 
const topics = 
["total", "HTML", "CSS", "Design", "JavaScript", "Ruby", "PHP", "WordPress", "iOS", "Android", "Development-Tools", "Business", "Python", "Java", "Digital-Literacy", "C#", "Databases", "Data-Analysis", "APIs", "Security", "Go", "Quality-Assurance", "Machine-Learning"];

let userName = readline.question('What user are you looking for? \n'.red);
let topic = readline.keyInSelect(topics, 'Which topic?'.red);

profile.get(userName, topics[topic]);