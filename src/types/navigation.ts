export interface SubMenuItem {
  readonly title: string;
  readonly href: string;
  readonly badge?: string;
}

export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly iconName: string;
  readonly badge?: string | number;
  readonly subItems?: readonly SubMenuItem[];
}

export interface UserSessionProfile {
  readonly id: string;
  readonly name: string;
  readonly role: 'Administrador' | 'Recepcionista' | 'Profesional' | 'Auditor';
  readonly avatarUrl?: string;
  readonly initials: string;
}

export interface NavSection {
  readonly label?: string;
  readonly items: readonly NavItem[];
}
