import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Want = {
  id: string;
  name: string;
  goal: number;
  saved: number;
};

type WantContextType = {
  wants: Want[];
  addWant: (want: Omit<Want, "id">) => void;
  deleteWant: (id: string) => void;
  updateWant: (updatedWant: Want) => void;
  getWantById: (id: string) => Want | undefined;
  isLoading: boolean;
};

const WantContext = createContext<WantContextType | undefined>(undefined);

const WANTS_STORAGE_KEY = "user_wants";

export function WantProvider({ children }: { children: ReactNode }) {
  const [wants, setWants] = useState<Want[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWants = async () => {
      try {
        const storedWants = await AsyncStorage.getItem(WANTS_STORAGE_KEY);

        if (storedWants) {
          const parsedWants: Want[] = JSON.parse(storedWants);
          setWants(parsedWants);
        }
      } catch (error) {
        console.error("Failed to load wants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWants();
  }, []);

  useEffect(() => {
    const saveWants = async () => {
      try {
        if (!isLoading) {
          await AsyncStorage.setItem(
            WANTS_STORAGE_KEY,
            JSON.stringify(wants)
          );
        }
      } catch (error) {
        console.error("Failed to save wants:", error);
      }
    };

    saveWants();
  }, [wants, isLoading]);

  const addWant = (want: Omit<Want, "id">) => {
    const newWant: Want = {
      id: Date.now().toString(),
      ...want,
    };

    setWants((currentWants) => [newWant, ...currentWants]);
  };

  const deleteWant = (id: string) => {
    setWants((currentWants) =>
      currentWants.filter((want) => want.id !== id)
    );
  };

  const updateWant = (updatedWant: Want) => {
    setWants((currentWants) =>
      currentWants.map((want) =>
        want.id === updatedWant.id ? updatedWant : want
      )
    );
  };

  const getWantById = (id: string) => {
    return wants.find((want) => want.id === id);
  };

  return (
    <WantContext.Provider
      value={{
        wants,
        addWant,
        deleteWant,
        updateWant,
        getWantById,
        isLoading,
      }}
    >
      {children}
    </WantContext.Provider>
  );
}

export function useWants() {
  const context = useContext(WantContext);

  if (!context) {
    throw new Error("useWants must be used inside a WantProvider");
  }

  return context;
}
