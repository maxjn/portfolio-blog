// Global
export type layoutProp = {
  children: React.ReactNode;
};

export type buttonProps = {
  text: string;
  url: string;
};

// Portfolio
export type catItemsType = {
  id: number;
  title: string;
  desc: string;
  image: string;
};

export type catObjType = {
  applications: catItemsType[];
  illustrations: catItemsType[];
  websites: catItemsType[];
};

export type catType = "applications" | "illustrations" | "websites";

export type categoryParams = {
  params: {
    category: catType;
  };
};

// Theme Context
export type themeModeType = "light" | "dark";

export type themeContextType = {
  mode: themeModeType;
  toggle: () => void;
};
