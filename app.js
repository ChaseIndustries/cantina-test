const data = require('./data.json');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const output = [];

function traverse(view, selector){
  const isClass = selector.charAt(0) === '.';
  const isIdentifier = selector.charAt(0) === '#';
  if(isClass && view.classNames && view.classNames.includes(selector.slice(1))){
    output.push(view);
  } else
  if(isIdentifier && view.identifier === selector.slice(1)){
    output.push(view);
  } else
  if(view.class === selector){
    output.push(view);
  }
  if(view.subviews){
    view.subviews.forEach(subview => traverse(subview, selector));
  }
  if(view.contentView){
    traverse(view.contentView, selector)
  }
}

readline.question(`What do you want?\n`, (selector) => {
  traverse(data, selector);
  output.length && console.log(output);
  console.log(`Found ${output.length} items matching selector "${selector}"`);
  readline.close()
});