import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Can I Afford It</Text>

        <Text style={styles.title}>
          Buy smarter.
          {"\n"}
          Stress less.
        </Text>

        <Text style={styles.subtitle}>
          Track what you want, compare priorities, and see if something actually
          fits your budget.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Top Want</Text>
          <Text style={styles.cardTitle}>Sony Walkman-style MP3 Player</Text>
          <Text style={styles.cardMeta}>Saved: $120 / Goal: $350</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/add-want")}
        >
          <Text style={styles.primaryButtonText}>Add a Want</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>See My Priorities</Text>
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
    paddingTop: 40,
  },
  eyebrow: {
    color: "#8b8fa3",
    fontSize: 14,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 42,
    marginBottom: 14,
  },
  subtitle: {
    color: "#a7acbe",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 340,
  },
  card: {
    backgroundColor: "#151821",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#232838",
  },
  cardLabel: {
    color: "#8b8fa3",
    fontSize: 13,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardMeta: {
    color: "#b6bbca",
    fontSize: 15,
    marginBottom: 14,
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#252b3d",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    width: "34%",
    height: "100%",
    backgroundColor: "#7c5cff",
    borderRadius: 999,
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
