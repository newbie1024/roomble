// types/user.ts

export type Gender = "male" | "female" | "nonbinary";

export type Lifestyle = {
  smoking?: "no" | "outside" | "yes";
  pets?: "no" | "ok" | "hasPets";
  cleanliness?: 1 | 2 | 3 | 4 | 5;
  schedule?: "early" | "9to5" | "late" | "mixed";
  party?: "rare" | "sometimes" | "often";
  food?: "veg" | "nonveg" | "either";
};

export type Budget = {
  min: number;
  max: number;
  currency: "USD" | "INR" | "EUR" | "GBP";
};

export type GeoPoint = {
  lat: number;
  lng: number;
  geohash?: string;
};

export type RoomInfo = {
  hasRoom: boolean;
  addressText?: string;
  geohash?: string;
  rent?: number;
  deposit?: number;
  availableFrom?: string;
  termMonths?: number;
  roomType?: "private" | "shared";
  amenities?: string[];
  photos?: string[];
};

export type Preferences = {
  roommateGender?: Gender[];
  budgetRange?: Budget;
  areas?: string[];
  moveInWindowDays?: number;
  lifestyle?: Partial<{
    smoking: Lifestyle["smoking"];
    pets: Lifestyle["pets"];
    cleanlinessMin: Lifestyle["cleanliness"];
    schedule: Lifestyle["schedule"][];
    party: Lifestyle["party"][];
  }>;
};

export type UserDoc = {
  uid: string;
  displayName: string;
  age?: number;
  gender?: Gender;
  photos: string[];

  location?: GeoPoint;
  preferredAreas?: string[];

  budget?: Budget;
  moveIn?: { earliest?: string; latest?: string };

  lifestyle?: Lifestyle;
  room?: RoomInfo;

  preferences?: Preferences;

  createdAt?: string;
  lastActive?: string;
};

export const emptyUser: UserDoc = {
  uid: "",
  displayName: "",
  photos: [],
};
