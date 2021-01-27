### Prop Types

> PropTypes are development package so they would not cause the performance issues in production mode. Also, it is possible to available `prop-types` provided by React developer teams.

```javascript
const PropTypes = {
  string(props, propName, componentName) {
    const type = typeof props[propName];
    if (type != string) {
      return new Error('Hey check the type of props');
    }
  },
};

Message.propTypes = {
  msg: PropTypes.string,
  greeting: PropTypes.string,
};
```

`SyntheticEvent` is not real event from browser, actually, it's an objecy that React creates for us. Most of the time, you won't be notice that you are working with `SyntheticEvent` or the real `event`, they do this for performance reasons. To access native event you can do `event.nativeEvent`.

```javascript
/* lesson 23 */
// 1
console.dir(event.target);

// 2
<label htmlFor='userNameInput'>user name:</label>
<input id='userNameInput' />
console.log(event.target.elements.userNameInput.value);

// 3 :: Do not forget current
const userNameInputRef = useRef();
<label ref={userNameInputRef} htmlFor='userNameInput'>user name:</label>
<input id='userNameInput' />
console.log(userNameInputRef.current.value)
```

> Make sure to provide appropriate `key` for each element/state you are traversing unless you will get quirky behaviours.

## Hooks fundamentals

TTP requests are another common side-effect that we need to do in applications. This is no different from the side-effects we need to apply to a rendered DOM or when interacting with browser APIs like localStorage. In all these cases, we do that within a useEffect hook callback. This hook allows us to ensure that whenever certain changes take place, we apply the side-effects based on those changes.

One important thing to note about the useEffect hook is that you cannot return anything other than the cleanup function. This has interesting implications with regard to async/await syntax:

```javascript
React.useEffect(() => {
  async function effect() {
    const result = await doSomeAsyncThing();
    // do something with the result
  }
  effect();
});
```

```javascript
fetchPokemon(pokemonName).then(
  (pokemon) => setPokemon(pokemon),
  (err) => setError(err),
);
```

> To cover all the possibility of fetching data,it's advised to have `status` (eg `idle`,`pending`,`resolved` and `rejected`).

```javascript
const App = () => {
  const [status, setStatus] = useState('idle');
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    setStatus('pending');
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setPokemon(pokemon);
        setStatus('resolved');
      },
      (err) => {
        setErr(err);
        setStatus('rejected');
      },
    );
  }, [pokemonName]);

  if (status === 'idle') {
  } else if (status === 'pending') {
  } else if (status === 'resolved') {
  } else if (status === 'rejected') {
  }

  throw new Error('Impossible to happen');
};
```

**What would happen if the setStatus() comes before setPokemon/setErr?**
_So, the following piece of code could do the trick._

```javascript
const [state, setState] = useState({
  status: 'idle',
  pokemon: null,
  error: null,
});

useEffect(() => {
  setState({ status: 'pending' });
  fetchPokemon(pokemonName).then(
    (pokemon) => {
      setState({ pokemon: pokemon, status: 'resolved' });
    },
    (err) => {
      setState({ error: err, status: 'rejected' });
    },
  );

  if (status === 'idle') {
  } else if (status === 'pending') {
  } else if (status === 'resolved') {
  } else if (status === 'rejected') {
  }

  throw new Error('Impossible to happen');
}, [pokemonName]);
```

### `ErrorBoundry`

> We’ve already solved the problem for errors in our request, we’re only handling that one error. But there are a lot of different kinds of errors that can happen in our applications. No matter how hard you try, eventually your app code just isn’t going to behave the way you expect it to and you’ll need to handle those exceptions. If an error is thrown and unhandled, your application will be removed from the page, leaving the user with a blank screen… Kind of awkward… Luckily for us, there’s a simple way to handle errors in your application using a special kind of component called an [Error Boundary](https://reactjs.org/docs/error-boundaries.html). Unfortunately, there is currently no way to create an Error Boundary component with a function and you have to use a class component instead. In this extra credit, read up on ErrorBoundary components, and try to create one that handles this and any other error for the PokemonInfo component.
