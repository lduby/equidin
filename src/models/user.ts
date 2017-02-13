import { Profile } from '../models/profile';

export class User {
    
constructor(public id: number, public licence: string, public email: string, public profile: Profile) {}
    
setId(id) { this.id = id; }
setLicence(licence) { this.licence = licence; }
setEmail(email) { this.email = email; }
setProfile(profile) { this.profile = profile; }
    
}