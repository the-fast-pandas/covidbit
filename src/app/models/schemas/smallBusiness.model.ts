export interface SmallBusiness {
    id: String;
    businessName: String;
    email: String;
    firstName: String;
    lastName: String;
    password: String;
    confirmPassword: String;
    businessType: String;
    businessPhone: String;
    businessLocation: String;
    safetyMeasures: Array<any>;
    registeredBy: Boolean;
}