- ### Labs

- **Overview**: You are going to use your Quiz API you created on Friday. You will use AJAX to RESTfully request resources from your API and display them to the user asynchronously.  

- As your requests will be made from a JS file within your WebContent directory, you can use relative routes to access the data (i.e. 'rest/quizzes/1' instead of 'http://localhost:8080/QuizRest/api/quizzes/1').  

- 0: Create an `app.js` file within your WebContent directory, and source it in your `index.html` file.  

- 1: Create an event listener for window load that prints out 'LOADED' when the page loads (this is a way of testing to ensure that your JS file is loading correctly):  

```javascript
$(document).ready(function(){
	console.log('LOADED');
});
```

- * When you see 'LOADED' printing in your browser console, everything is loading correctly.  

- 2: In the 'load' event listener should call a controller route (with an AJAX request) which responds with all of your quiz objects located at 'rest/quizzes'.

- * For the moment, simply print out the JSON which returns from your controller, it should be an array of JSON representations of Quiz objects.
- * We don't care about having questions within the quizzes for the moment, we just want to be able to display the available quizzes by name.

- 3: Refactor your solution to #2 to append all of the quizzes that return to a table on your index page. The table should have two columns: Quiz name and View (this one should have a button labeled 'View' in each cell) I.e.  

| Quiz Name | View |
|------|:---:|
|Sports|View|
|States|View|
|etc...|View|

- 4: Refactor your solution to #3 to add an event listener to each of the 'View' buttons. For now, when the button is clicked have it print the name of the quiz in it's column.  

- 5: Now that you have the name of the resort returning correctly, refactor the eventListener from #4 to make another AJAX request which returns a single quiz object by id as JSON.

- * Print the returned JSON to the console.
- * When you are building the table you are going to need to embed the id as a property of the view button. You could store it as a name property for example:
-```html
- <button name="2">View</button>
- ```

- 6: Refactor the AJAX request you created in #5.

- * If a quiz object returns successfully, remove the table displaying all of the quizzes from the page, and display just the returned quiz information.
- * The quiz name should be an `<h1>`.
- * The quiz questions should be an ordered list.

## Sports  
1. Who won the 2017 Super Bowl?  
2. What division are the New England Patriots in?  
3. How many Super Bowl's has Tom Brady won?  

7: Refactor your solution to #6
* Add a 'List Quizzes' button below your data in the view you created in #6.
* Add an Event Listener to the 'List Quizzes' button which will clear the data, and execute an AJAX request retrieving all of your quiz objects located at 'rest/quizzes/'.
* Builds and appends a table to page to display them.