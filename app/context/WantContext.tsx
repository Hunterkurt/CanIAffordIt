import { createContext, useContext, useState, ReactNode } from "react";

export type Want = {
  id: string;
  name: string;
  goal: number;
  saved: number;
};

type WantContextType = {
  wants: Want[];
  addWant: (want: Omit<Want, "id">) => void;
};

const WantContext = createContext<WantContextType | undefined>(undefined);

export function WantProvider({ children }: { children: ReactNode }) {
  const [wants, setWants] = useState<Want[]>([]);

  const addWant = (want: Omit<Want, "id">) => {
    const newWant: Want = {
      id: Date.now().toString(),
      ...want,
    };

    setWants((currentWants) => [newWant, ...currentWants]);
  };

  return (
    <WantContext.Provider value={{ wants, addWant }}>
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
