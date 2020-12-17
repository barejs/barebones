import React, { useContext, useReducer, createContext } from 'react';

const useSet = initState => {
  const [state, setState] = useReducer((state, newState) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(state);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(state);
      }
    }
    const result = { ...state, ...action };
    // if (newState.action !== 'no-log') {
    //   console.group(newState.action || 'action'); // TODO: give it a name
    //   console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    //   console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    //   console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
    //   console.groupEnd();
    // } else {
    // }
    return result;
  }, initState);
  const setStateWithActionName = (state, actionName) => {
    setState(state);
  };
  return [state, setStateWithActionName];
};

const A = createContext({}); // store
const B = createContext(() => {}); // setGlobal

const Store = ({ value, children }) => {
  const [state, setState] = useSet(value);
  return (
    <A.Provider value={state}>
      <B.Provider value={setState}>{children}</B.Provider>
    </A.Provider>
  );
};

export const useStore = () => useContext(A);
export const useGlobal = () => useContext(B);

export default Store;
