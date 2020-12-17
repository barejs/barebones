---
order: 1
title: test
nav:
  order: 1
  title: guide
---

```jsx
import React from 'react';
import GlobalStore, { useGlobal, useStore } from 'set-global';

const Wrapper = ({ children }) => <div>{children}</div>;

const Root = () => {
  return (
    <GlobalStore value={{ count: 0 }}>
      <Wrapper>
        <Wrapper>
          <Wrapper>
            <Wrapper>
              <App />
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </GlobalStore>
  );
};

const App = () => {
  const setGlobal = useGlobal(); // same usage as setState, but for setting global state
  const { count } = useStore(); // getting global state from store
  const plusOne = () => setGlobal({ count: count + 1 });
  const minusOne = () => setGlobal({ count: count - 1 });
  return (
    <div>
      <div>{count}</div>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
};

export default Root;
```
