export class User {
    
constructor(public id: number, public licence: string, public email: string) {}
    
setId(id) { this.id = id; }
setLicence(licence) { this.licence = licence; }
setEmail(email) { this.email = email; }
    
}