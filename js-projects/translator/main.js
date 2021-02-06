const input = document.getElementById('input');
const output = document.getElementById('output');

function addOutput(letterTo) {
  if(output.innerHTML == 'Output Goes Here') {
    output.innerHTML = letterTo;
  } else {
    output.innerHTML += letterTo;
  }
}

function encript() {
  let instr = input.value;
  output.innerHTML = 'Output Goes Here';
  for(let l in instr) {
    switch(instr[l]) {
      case 'a':
        addOutput('z');
        break;
        
      case 'b':
        addOutput('y');
        break;
        
      case 'c':
        addOutput('x');
        break;
      
      case 'd':
        addOutput('w');
        break;
      
      case 'e':
        addOutput('v');
        break;
        
      case 'f':
        addOutput('u');
        break;
        
      case 'g':
        addOutput('t');
        break;
      
      case 'h':
        addOutput('s');
        break;
      
      case 'i':
        addOutput('r');
        break;
        
      case 'j':
        addOutput('q');
        break;
        
      case 'k':
        addOutput('p');
        break;
      
      case 'l':
        addOutput('o');
        break;
      
      case 'm':
        addOutput('n');
        break;
        
      case 'n':
        addOutput('m');
        break;
        
      case 'o':
        addOutput('l');
        break;
      
      case 'p':
        addOutput('k');
        break;
      
      case 'q':
        addOutput('j');
        break;
        
      case 'r':
        addOutput('i');
        break;
        
      case 's':
        addOutput('h');
        break;
      
      case 't':
        addOutput('g');
        break;
      
      case 'u':
        addOutput('f');
        break;
        
      case 'v':
        addOutput('e');
        break;
        
      case 'w':
        addOutput('d');
        break;
      
      case 'x':
        addOutput('c');
        break;
      
      case 'y':
        addOutput('b');
        break;
        
      case 'z':
        addOutput('a');
        break;
        
      case ' ':
        addOutput(' ');
        break;
        
      case '.':
        addOutput('.');
        break;
        
      case ',':
        addOutput(',');
        break;
        
      case '/':
        addOutput('/');
        break;
        
      case '?':
        addOutput('?');
        break;
        
      case '<':
        addOutput('<');
        break;
        
      case '>':
        addOutput('>');
        break;
        
      case ';':
        addOutput(';');
        break;
        
      case ':':
        addOutput(':');
        break;
        
      case '[':
        addOutput('[');
        break;
        
      case ']':
        addOutput(']');
        break;
        
      case '{':
        addOutput('{');
        break;
        
      case '}':
        addOutput('}');
        break;
        
      case '|':
        addOutput('|');
        break;
        
      case '=':
        addOutput('=');
        break;
        
      case '+':
        addOutput('+');
        break;
        
      case '-':
        addOutput('-');
        break;
        
      case '_':
        addOutput('_');
        break;
        
      case '0':
        addOutput('0');
        break;
        
      case '(':
        addOutput('(');
        break;
        
      case ')':
        addOutput(')');
        break;
        
      case '9':
        addOutput('9');
        break;
        
      case '8':
        addOutput('8');
        break;
        
      case '*':
        addOutput('*');
        break;
        
      case '7':
        addOutput('7');
        break;
        
      case '&':
        addOutput('&');
        break;
        
      case '^':
        addOutput('^');
        break;
        
      case '6':
        addOutput('6');
        break;
        
      case '5':
        addOutput('5');
        break;
        
      case '%':
        addOutput('%');
        break;
        
      case '4':
        addOutput('4');
        break;
        
      case '$':
        addOutput('$');
        break;
        
      case '3':
        addOutput('3');
        break;
        
      case '#':
        addOutput('#');
        break;
        
      case '2':
        addOutput('2');
        break;
        
      case '@':
        addOutput('@');
        break;
        
      case '1':
        addOutput('1');
        break;
        
      case '!':
        addOutput('!');
        break;
        
      case '`':
        addOutput('`');
        break;
        
      case '~':
        addOutput('~');
        break;
    }
  }
}