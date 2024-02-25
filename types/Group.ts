export interface GroupTag {
  id: number;
  name: string;
}

export interface GroupLink {
  id: number;
  name: string;
  link: string;
}

interface Group {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  logo: string;
  tags: GroupTag[];
  links: GroupLink[];
}

export default Group;
