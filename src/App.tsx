import { Component } from 'react';
import './App.css';
import CustomButton from './components/CustomButton/CustomButton.tsx';

interface AppState {
  triggerError: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = { triggerError: false };

  throwAnError = () => {
    this.setState((state) => ({ ...state, triggerError: true }));
  };

  render() {
    if (this.state.triggerError) throw new Error('Error during button click!');

    return (
      <>
        <CustomButton onClick={this.throwAnError}>Throw An Error</CustomButton>
      </>
    );
  }
}

export default App;
