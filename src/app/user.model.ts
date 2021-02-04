export interface User {
  businessName: string;
  email: string;
  password: string;
  credentials: {
    businessPhone: string;
    businessLocation: string;
  }
  businessType: string;

}
