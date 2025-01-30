import { Component } from 'react';
import './App.css';
import MainContent from './components/MainContent/MainContent.tsx';
import CustomButton from './components/CustomButton/CustomButton.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SearchContextProvider from './context/SearchContext.tsx';

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
        <SearchContextProvider>
          <SearchBar />
          <MainContent />
        </SearchContextProvider>
        <CustomButton onClick={this.throwAnError}>Throw An Error</CustomButton>
      </>
    );
  }
}

export default App;
