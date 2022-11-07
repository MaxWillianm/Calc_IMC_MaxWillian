import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import * as React from 'react';
import { Provider as PaperProvider, Button, TextInput } from "react-native-paper";


const CalcIMC = ({ label }) => {


  const Resultado = async () => {
    setResult(Peso / (Altura * Altura));
    getIMC();

  };

  const [Peso, setPeso] = React.useState("");
  const [Altura, setAltura] = React.useState("");
  const [Result, setResult] = React.useState(0);
  const [IMC, setIMC] = React.useState("");

  const getIMC = async () => {
    if (Result < 16) {
      setIMC("Magreza grave");
    }
    if (Result > 16 && Result < 17) {
      setIMC("Magreza moderada");
    }
  };



  return (

    <View style={styles.container}>
      <Text>Informa abaixo o seu peso e sua altura</Text>
      <TextInput
        keyboardType='Numeric'
        label="informe o seu peso"
        value={Peso}
        onChangeText={text => setPeso(text)}
        style={styles.input}
      />

      <TextInput
        keyboardType='Numeric'
        label="Informe a sua altura"
        value={Altura}
        onChangeText={text => setAltura(text)}
        style={styles.input}
      />
      <Button
        style={styles.botao}
        mode="elevated"
        onPress={() => {
          Resultado();
          Keyboard.dismiss();
        }}
      >
        calcular
      </Button>
      <Text>O seu IMC é: {parseFloat(Result).toFixed(3)}</Text>
      <Text> voce tem: {IMC}</Text>


    </View>
  );
};




export default function App() {
  return (
    <View style={styles.container}>
      <CalcIMC />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 300,
    margin: 10,
    backgroundColor: "#D9DEDE",
  },
  botao: {
    backgroundColor: "#FCFF00",
    height: 40,
    width: 200,
  }
});
