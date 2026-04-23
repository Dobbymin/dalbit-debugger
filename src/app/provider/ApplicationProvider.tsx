import { QueryProvider } from "./components";

type Props = {
  children: React.ReactNode;
};

export const ApplicationProvider = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};
