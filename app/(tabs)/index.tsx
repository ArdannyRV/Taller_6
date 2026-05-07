import { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { carrosService } from "../../src/api/carros.service"
import { useCarro, useAgregarCarro } from "../../src/hooks/useCarros";

export default function App() {
  const [marca, setMarca] = useState('')
  const {data: carros} = useCarro()
  const agregarMutation = useAgregarCarro()

  const agregar = ()=>{
    agregarMutation.mutate(marca, {onSuccess: () => setMarca('')})
  }

  return (
    <View style={{ flex: 1, paddingTop: 60 }}>
      <TextInput
        value= {marca}
        onChangeText={setMarca}
        style={{ borderWidth: 3 }} />
      <Button
        title="Agregar"
        onPress={agregar} />
      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text> {item.id}._ {item.marca}</Text>} />
    </View>
  )
}

