import AuthenticationsReducerGenerator from './AuthenticationsReducerGenerator';

function Store(props = {}) {
  return (
    {
      authenticationsReducer: props.authenticationsReducer || AuthenticationsReducerGenerator({})
    }
  );
}

export default Store;
