import { StyleSheet, View } from 'react-native';
import WeatherApp from './Components/AppClima';
import { NativeRouter } from 'react-router-native';

export default function App() {
  return (
      <NativeRouter >
        <View style={styles.container}>
          <WeatherApp/>
        </View>
      </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

