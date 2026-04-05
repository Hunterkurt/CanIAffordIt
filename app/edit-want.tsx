import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWants } from "./context/WantContext";

export default function EditWantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWantById, updateWant } = useWants();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState("");

  const want = id ? getWantById(id) : undefined;

  useEffect(() => {
    if (want) {
      setName(want.name);
      setGoal(String(want.goal));
      setSaved(String(want.saved));
    }
  }, [want]);

  const handleUpdate = () => {
    if (!want) {
      Alert.alert("Error", "Could not find that want.");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Missing name", "Give your want a name first.");
      return;
    }

    updateWant({
      id: want.id,
      name: name.trim(),
      goal: Number(goal) || 0,
      saved: Number(saved) || 0,
    });

    router.back();
  };

  if (!want) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Want not found</Text>
          <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Want</Text>
        <Text style={styles.subtitle}>
          Update the details for this want.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ex: New headphones"
            placeholderTextColor="#7d8497"
            style={styles.input}
          />

          <Text style={styles.label}>Goal Price</Text>
          <TextInput
            value={goal}
            onChangeText={setGoal}
            placeholder="Ex: 250"
            placeholderTextColor="#7d8497"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Already Saved</Text>
          <TextInput
            value={saved}
            onChangeText={setSaved}
            placeholder="Ex: 80"
            placeholderTextColor="#7d8497"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.primaryButton} onPress={handleUpdate}>
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b0b0f",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    color: "#a7acbe",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: "#151821",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#232838",
    marginBottom: 20,
  },
  label: {
    color: "#d8dcef",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#0f1218",
    borderColor: "#2a3144",
    borderWidth: 1,
    borderRadius: 14,
    color: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#7c5cff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#1a1f2d",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a3144",
  },
  secondaryButtonText: {
    color: "#d8dcef",
    fontSize: 16,
    fontWeight: "600",
  },
});
