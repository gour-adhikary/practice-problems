when you use closures you want to make advantage of its feature of an additional lexical scope, you want to use the values stored the scope of the outer function inside the scope of the inner function, but in this case you are not doing so. So you can simply bind the function to the value you want it to default without creating an unnecessary lexical scope that we are not using

````
👍 What You’re Doing Right
- Good use of closures to return functions dynamically.
- Following modular programming by keeping functions small and single-purpose.
- Using Promises correctly (mostly).
- Mapping commands to functions dynamically is a smart approach.

👎 What You Should Improve
- Error handling: Need better handling for file I/O failures.
- Avoid unnecessary .then() nesting: Using await in async functions is cleaner.
- Be mindful of method choices: .find() vs .filter() in searching.
- Keep sorting logic simple: Use an order map instead of multiple conditions.```
````
