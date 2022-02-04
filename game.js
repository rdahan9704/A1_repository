const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  sessionStorage.setItem("inputfieldvalue",null);
  sessionStorage.setItem("inputfieldvalue2",null);
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  
 

  textNode.options.forEach(option => {
    
    if ((option.nextText>19 && option.nextText<22) || option.nextText == 29 || option.nextText == 31) {  // This will change value to inputfields with text as placeholder which have ids between 19-21
      const input = document.createElement('input')   // option.nextText == 29 as i want this id to be inputfield 
      input.placeholder = option.text
      input.type = "text";
      input.id = "admissionno";
      input.addEventListener('change', () => inputFieldvalue(document.getElementById("admissionno").value)) // this to store input values in session via calling a function 
      optionButtonsElement.appendChild(input)
     
    }else if (showOption(option)) { // Else button will be created 
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  if(nextTextNodeId===2223) {  
    let inputfieldvalueinserted = sessionStorage.getItem("inputfieldvalue");
  if(inputfieldvalueinserted.toLowerCase() ==='yes'){
    showTextNode(parseInt(nextTextNodeId.toString().substring(0,2)))
  }else if (inputfieldvalueinserted.toLowerCase() ==='no'){
    showTextNode(parseInt(nextTextNodeId.toString().substring(2,4)))
  }else  { 
  alert("Please enter either yes or no")
}
}else if ((nextTextNodeId===293008) || (nextTextNodeId===313208)){
  let inputfieldvalueinserted = sessionStorage.getItem("inputfieldvalue2");
  if(parseInt(inputfieldvalueinserted) ==(nextTextNodeId.toString().substring(4,6))) {
    showTextNode(parseInt(nextTextNodeId.toString().substring(0,2)))
  }else if (isNaN(inputfieldvalueinserted)){
    alert("The Answer should be Numbers!")
  }
  else if(parseInt(inputfieldvalueinserted) !==(nextTextNodeId.toString().substring(4,6))){
    alert("Wrong answer");
    showTextNode(parseInt(nextTextNodeId.toString().substring(2,4)))
  }

}
 
else{
  showTextNode(nextTextNodeId)
}
}
//----------------------------------------------------------------
function inputFieldvalue(inputValue){
  sessionStorage.setItem("inputfieldvalue",inputValue);
  sessionStorage.setItem("inputfieldvalue2",inputValue)
}
// Game text and options
const textNodes = [
  {
    id: 1,
    text: 'You suddenly find yourself soaked in rain, you look around, trees surround you. You tried to stand up but, no strength in your body. Before you noticed, you went back to sleep again under the heavy rain.',
    options: [
      {
        text: 'Continue',
        nextText:2
      }     
    ]
  },
  {
    id: 2,
    text: 'You woke up to find yourself in a strange room, you looked around to find two guys who were trying to help you out and check if you are fine. Among those people, there was a little boy who had strange dress and looked extremely worried.',
    options: [
      {
        text: 'look at the little boy',
        nextText: 3
      }   
    ]
  },
  {
    id: 3,
    text: 'You looked at the little boy. He started talking to you: "Hey! Are you ok? Are you able to walk? you need to get out of here now!"',
    options: [
      {
        text: 'Run fast with the boy and get out of the place',
        nextText: 4,
      },
      {
        text: 'Ask the two guys what happened',
        nextText:5
      },
    ]
  },
  {
    id: 4,
    text: 'After you apologized to the two strangers and went out with the little boy, you were so confused, what is happening and who are you? You do not remember anything after all. You noticed that the little boy was floating and had sharp ears.',
    options: [
      {
        text: 'Ask the little boy for explination and why does he looks like a fairy ',
        nextText: 6
      },
      {
        text: 'Ask the boy why he told you to run fast and what is happening?',
        nextText: 6
      },
    ]
  },
  {
    id: 5,
    text: 'The blonde guy started to speak: "You do not remember? You were working and then suddenely fainted. We have carried you to the back room, we are really worried, I think we should take you to the hospital, Right Sam?" And then he looks at the other guy to make sure he also agrees with him' ,
    options: [
      {
        text: 'Continue',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'The boy started to speak: "I am sorry, it is all my fault. My name is Orion. As you can see, I am a fairy who came from another world and I bumped into your soul. Because of that, you have lost your memories but, I will help you regaining them back, but for now, let us go home. I know where you live.',
    options: [
      {
        text: 'Follow Orion to your home ',
        nextText: 10
      }
    ]
  },
  {
    id: 7,
    text: '"You are right Tom," The black haired guy talked "She seems day dreaming and pale. let us take her to the hospital" Out of the sudden, the little boy shouted and told you that you cannot go to the hospital, he seems really worried."You have to go home!"',
    options: [
      {
        text: 'Go with them to the hospital',
        nextText: 8,
      },
      {
        text: 'Go home and rest',
        nextText:9
      },
    ]
  },
  {
    id: 8,
    text: 'You have reached the hospital and the doctor checked your condition. Nothing is serious. He suggested to go home and rest. And your memoried will come back eventually.',
    options: [
      {
        text: 'Go home with Tom and Sam',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'You had a headache at night, you woke up but you lost your balance and bumped your head hard. You bleeded ... never woke up again',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'In the next morning, you woke up to fine Orion next to you, he started talking " You finally woke up, how are you feeling? Do you remember me?',
    options: [
      {
        text: 'Yes I remember you but before yesterday, I have no memoreies.',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: '"I know, Like i said it is my fault" The boy answered" "I will help you to figure out who you are. Let us find some hints around the room that will help us more." You looked around, you will:',
    options: [
      {
        text: 'Check your phone',
        nextText: 12
      },
      {
        text: 'Check the notebook on the table',
        nextText: 13
      },
    ]
  },
  {
    id: 12,
    text: 'You checked the contacts on your phone, there were only 5 contacts: Tom, Sam, Ken, Kai and your work place',
    options: [
      {
        text: 'Continue',
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: 'You opened the notebook, it was empty, nothing written was there, you could not find anything useful',
    options: [
      {
        text: 'search the room for anything useful',
        nextText: 36
      }
    ]
  },
  {
    id: 14,
    text: '“You know Sam and Tom, you met them earlier. I guess these two will be great help for you” Orion Said. What will you do?',
    options: [
      {
        text: 'Call Sam',
        nextText: 15
      },
      {
        text: 'Call Tom',
        nextText: 16
      }
    ]
  },
  {
    id: 15,
    text: 'You dialed his number, He answered and said "Hello?"',
    options: [
      {
        text: 'Hello, Sam? ِAre you Free?',
        nextText: 17
      },
    ]
  },
  {
    id: 16,
    text: 'You dialed his number, He answered and said "Hello?"',
    options: [
      {
        text: 'Hello, Tom? ِAre you Free?',
        nextText: 18
      },
    ]
  },
  {
    id: 17,
    text: 'Right now? I am in my part time job with Tom, Would you like to come? We will have a break soon.',
    
    options: [
      {
        text: 'Continue',
        nextText: 19
      },
    ]
  },
  {
    id: 18,
    text: 'Right now? I am in my part time job with Sam, Would you like to come? We will have a break soon.',
    options: [
      {
        text: 'Continue',
        nextText: 19
      },
    ]
  },
  {
    id: 19,
    text: 'Will you go to them?',
    options: [
      {
        text: 'Enter Yes or No to answer',
        nextText: 21
      },
      {
        text: 'Next',
        nextText: 2223  // if yes goto 22 else go to 23 // You have to GIVE here 2 numbers ->1: if YES CASE and 2nd if NO CASE
      }
    ]
  },
{
  id: 22,
  text: 'Great! That will give us some hint maybe. ',
  options: [
    {
      text: 'Ok',
      nextText: 24
    },
  ]
},
{
  id: 23,
  text: '"You will stay here, that is for the best. Lets try searching for some stuff here. I will help you too!" Orion said',
  options: [
    {
      text: 'Search for some evidence around the room ',
      nextText: 36
    },
  ]
},
{
  id: 24,
  text: 'You have headed to their work place. It is the same place you ran away from so you still remember the way ',
  options: [
    {
      text: 'Enter the cafe',
      nextText: 25
    },
  ]
},
{
  id: 25,
  text: 'You found both of them easily. "Oh! look who is here! How are you feeling today?" Tom said ',
  options: [
    {
      text: 'I am kind of better today',
      nextText: 26
    },
  ]
},
{
  id: 26,
  text: 'Are you? I can see that you are getting confused easily. I was thinking that maybe your memories are messed up after you fell yesterday" Sam replied',
  options: [
    {
      text: 'I fell? ',
      nextText: 27
    },
  ]
},
{
  id: 27,
  text: '"See? You do not even remember that, lemme test something. I will ask you few questions and you have to answer them, got that??" Sam said. You looked kind of scared because the situation is tense, but you have to go with the flow.',
  options: [
    {
      text: 'I will try',
      nextText: 28
    },
  ]
},
{
  id: 28,
  text: '"what is (2 x 7)-6 ?" He asked in a very serious voice "Sam please don not start with these weird question" Tom said. "Tom you saty aside" Sam glared at him "Come on, what is your answer??' ,
  options: [
    {
      text: 'What is your answer? ',
      nextText: 29 // answer // if the answer is correct move to ID 29
    }, 
    {
      text: 'Answer',
      nextText: 293008 // where you want to move if sucess 29 /// in case Wrong answer go to 30 and last one  answer will be 08
    }
  ]
},
{
  id: 29,
  text: 'Oh wow, You actually knew the the answer. It is correct. Maybe I was imagining stuff here"' ,
  options: [
    {
      text: 'You will hide your Amnesia  ',
      nextText: 35 
    },
  
  ]
},
{
  id: 30,
  text: '"Wrong answer... but still I will give you one more chance to wake up and use this idiot head of yours" Sam said. What what is (2 x 7)-6 ? Hint: It is a number between 5 and 9' ,
  options: [
    {
      text: 'What is your answer? ',
      nextText: 31
    },
    {
      text: 'Answer',
      nextText: 313208
    }
  ]
},
{
  id: 31,
  text: '"Alright, you finally woke up. But I will still be worried until i see you back to normal"' ,
  options: [
    {
      text: 'Hide your Amnesia ',
      nextText: 35
    },
    {
      text: 'Reveal your Amnesia',
       nextText: 35
    },

  ]
},
{ 
  id: 32,
  text: '"You hit your head hard. What is going on with your memories and head?"' ,
  options: [
    {
      text: 'Reveal your Amnesias',
      nextText: 35
    }
  ]
},
{
  id: 35,
  text: 'To be continued' ,
  options: [
    {
      text: 'Restart',
      nextText: -1
    }
  ]
},
{
  id: 36,
  text: 'You and Orion started searching around the room' ,
  options: [
    {
      text: 'continue',
      nextText: 37
    }
  ]
},
{
  id: 37,
  text: 'Orion found the following things: Calendar, Photoframe, and some letters. Which one will you check first?' ,
  options: [
    {
      text: 'The calendar',
      nextText: -1
    },
    {
      text: 'The photoframe',
      nextText: -1
    },
    {
      text: 'The letters',
      nextText: -1
    }
  ]
}
]
startGame()