# Personas and Diagrams
This file will contain the user personas of the potential users of this software, as well as the sequence and UML diagrams.


### Three personas
  1. Janet is a college student, studying English composition at Harvard University. She is a hard worker, but sometimes she forgets the meaning of certain words. For the duration of her college career, she needs to write a lot of essays. A big part of her essays is to read highlights from certain well-known authors. Many of these authors use big fancy words, and Janet has a hard time keeping up with it. Dictionary.com is a major resource of hers, however it can be time consuming to have too many tabs open at one time. This extension will significantly improve Janet's quality of life at Harvard. As she is not a computer science major, it is important that this browser extension is as simple to use as possible for her. Using the browser console is not really an option for her.

  2. Greg is an SAT tutor in Palm Spring, California. While teaching high-schoolers good essay writing skills, it is important that he stay up to date on definitions of words that he comes across while grading test essays. He primarily uses his computer to grade these essays over Canvas. While grading, he may sometimes have dozens of tabs open at a time. His students often use words that he is unfamiliar with, and it would be nice if he could quickly get a definition without having to navigate around so much. This can save him time, and energy.

  3. Jose doesn't need it because he could care less, however he thinks it is super cool. He is downloading it for the fun of it. He works as a mechanic for a Honda dealership in Miami, Florida. Part of his job is filling out paperwork on the computer in the back, and while he is there, he reads from instruction manuals online. He is interested in this as a compliment to his job, though he doesn't really need it. He does it for fun rather than function, as he could just as easily open up dictionary.com.

### Sequence Diagram

![Sequence_Diagram](https://user-images.githubusercontent.com/12466823/142452374-8a31a2ff-d658-4156-8f21-737814ab1d21.png)

  This sequence diagram shows the process that occurs when the user clicks the "Define word" menu item from the context menu. First an onClick event occurs within contextMenu.js. Then contextMenu.js will call code from popup.js to display the definitions for the word the user selected. After that, popup.js will call its own function to get the data from the API. Within that function a call is made to the API to fetch all of the data for the word. After the data is fetched, popup.js will call another one of its functions to display each definition within the popup page.

### UML Diagram
![Quicky](https://user-images.githubusercontent.com/89669624/144489991-a5da156f-ff1a-40ff-94a4-c493b0fa5d16.png)
  This UML diagram shows the functions found in the popup.js file. We don't use the HTML file for the diagram, as it is not relevant. This includes the displayDefinitions() function
  which displays the definition portion of the object returned by the dictionary API, wheras the displayThesaurus() function displays a list of synonyms. The getDataFromWord() function
  returns the object containing all the information on the word selected by the user. addToPopup() function takes the object's information, be it a definition or list of synonyms, and
  adds it to the popup menu. Handler() function handles the user interaction that gets the word selected by the user. saveState() saves the state of the browser.
