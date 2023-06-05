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

// Post
export type PostType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  creator: {
    _id: string;
    name: string;
    image: string;
  };
  createdAt: string;
};

export type PostCardProp = {
  post: PostType;
};

export type SinglePostProps = {
  params: {
    id: string;
  };
};

export type SingleUserProps = {
  params: {
    id: string;
    name: string;
  };
};

export type ContentProps = {
  content: string;
};

export type HandleChange = {
  name: string;
  value: string;
};
