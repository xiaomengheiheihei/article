import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Routers from './router/index';
import '../node_modules/antd/dist/antd.css';
import { stores } from './store/index';
import { Provider } from 'mobx-react';


class App extends Component {
    componentDidMount () {
        
    }
    render() {
      return (
        <div className="App">
            <Provider { ...stores }>
                <BrowserRouter>
                    <Routers />
                </BrowserRouter>
            </Provider>
            {/* <DevTools /> */}
        </div>
      );
  }
}

export default App;
