import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useCarro, useAgregarCarro } from '@/src/hooks/useCarros';
import { supabase } from '@/src/lib/supabase';
import { palette, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function App() {
  const [marca, setMarca] = useState('');
  const { data: carros, isLoading } = useCarro();
  const agregarMutation = useAgregarCarro();

  const agregar = () => {
    agregarMutation.mutate(marca, { onSuccess: () => setMarca('') });
  };

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          value={marca}
          onChangeText={setMarca}
          placeholder="Marca del carro"
          placeholderTextColor={palette.textSecondary}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={agregar} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.id} - Marca: {item.marca}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: Typography.body.fontSize,
    color: palette.text,
    backgroundColor: palette.card,
  },
  addButton: {
    backgroundColor: palette.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    ...Typography.button,
    color: '#fff',
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: BorderRadius.lg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    color: palette.text,
  },
  logoutButton: {
    borderWidth: 1.5,
    borderColor: palette.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    ...Typography.button,
    color: palette.primary,
  },
});
