export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  PetStack: undefined;
  BookingStack: undefined;
  ChatStack: undefined;
  ProfileStack: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type PetStackParamList = {
  PetList: undefined;
  PetDetail: { petId: string };
  MedicalRecords: { petId: string };
};

export type BookingStackParamList = {
  ServiceSelection: undefined;
  DateTimePicker: { serviceId: string };
  Confirmation: { appointmentId: string };
};

export type ChatStackParamList = {
  Chat: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};
