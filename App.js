import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Surface } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {

  const [Peso, setPeso] = React.useState("");
  const [Altura, setAltura] = React.useState("");
  const [Result, setResult] = React.useState(0);
  const [IMC, setIMC] = React.useState("");

  const Resultado = async () => {
    const Result = Peso / (Altura * Altura);
    AsyncStorage.setItem("@Result", String(Result));



    if (Result >= 40) {
      setIMC("OBESIDADE GRAU III (Mórbida)")
    }
    if (Result >= 35) {
      setIMC("OBESIDADE GRAU II (Severa)")
    }
    if (Result >= 30 && Result < 35) {
      setIMC("OBESIDADE GRAU I")
    }
    if (Result >= 25 && Result < 30) {
      setIMC("SAUDÁVEL")
    }
    if (Result >= 18.5 && Result < 25) {
      setIMC("MAGREZA LEVE")
    }
    if (Result >= 17 && Result < 18.5) {
      setIMC("MAGREZA MODERADA")
    }
    if (Result >= 16 && Result < 17) {
      setIMC("MAGREZA GRAVE")
    }
    setResult(Result)
  }

  const getPeso = async () => {

    try {
      const value = await AsyncStorage.getItem("@Result");
      if (value !== null) {
        // se o value for diferente de null, quer dizer que já havia sido salvo anteriormente.
        setResult(value);
      }
    } catch (e) {
      // error reading value
    }

  };


  useEffect(() => {
    // recuperando valor no momento que a tela é aberta
    getPeso();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe abaixo o seu peso e sua altura</Text>
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
      <Surface style={styles.surface}>
        <Text style={styles.result}>O seu IMC é: {parseFloat(Result).toFixed(2)}</Text>
        <Text style={styles.result}>{IMC}</Text>
      </Surface>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
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
    backgroundColor: "#FFA5A5",
    height: 40,
    width: 200,
    margin: 35,
  },
  result: {
    fontSize: 20,
  },
  surface: {
    backgroundColor: "#FF5E5E",
    borderRadius: 10,
    height: 100,
    width: 280,
    justifyContent: "center",
    alignItems: "center"
  }
});
