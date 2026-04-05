import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useWants } from "../context/WantContext";

export default function HomeScreen() {
  const router = useRouter();
  const { wants } = useWants();

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

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/add-want")}
        >
          <Text style={styles.primaryButtonText}>Add a Want</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Your Wants</Text>

        {wants.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No wants yet. Add your first one.</Text>
          </View>
        ) : (
          <FlatList
            data={wants}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const progress =
                item.goal > 0 ? Math.min((item.saved / item.goal) * 100, 100) : 0;

              return (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardMeta}>
                    Saved: ${item.saved} / Goal: ${item.goal}
                  </Text>

                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                </View>
              );
            }}
          />
        )}
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
    marginBottom: 24,
    maxWidth: 340,
  },
  primaryButton: {
    backgroundColor: "#7c5cff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 14,
  },
  emptyCard: {
    backgroundColor: "#151821",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#232838",
  },
  emptyText: {
    color: "#a7acbe",
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#151821",
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#232838",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardMeta: {
    color: "#b6bbca",
    fontSize: 15,
    marginBottom: 12,
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "#252b3d",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7c5cff",
    borderRadius: 999,
  },
});
