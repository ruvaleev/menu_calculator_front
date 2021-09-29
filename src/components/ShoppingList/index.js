import { connect } from 'react-redux';

import ShoppingList from './ShoppingList';

const mapStateToProps = (state) => ({
  isLoading: state.authenticationsReducer.isLoading
});

export default connect(mapStateToProps)(ShoppingList);
