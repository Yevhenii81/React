import { createContext } from "react";

<<<<<<< HEAD
const AppContext = createContext(null);

export default AppContext;

/* Д.З. Реалізувати відображення лічильника "Підсумок"
у шаблоні (layout), який виводить дані на всіх сторінках.
: змінюються дані на сторінці Home, при переході на 
інші сторінки змінені дані залишаються видними
*/
=======
const AppContext = createContext({
  user: null,
  setUser: () => {},
  count: 0,
  setCount: () => {}
});

export default AppContext;

>>>>>>> friend/main
