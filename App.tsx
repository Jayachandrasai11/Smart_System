import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {AppNavigator} from './src/navigation';
import {Colors} from './src/config';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={Colors.primary}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;