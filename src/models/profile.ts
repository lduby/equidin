//import { User } from '../models/user';

export class Profile {
    
constructor(id: number, public name: string, public phone: string, public address: string, public about: string, public picture: string, public riding_level: number, public user_id: number) {}

setName(name) { this.name = name; }
setPhone(phone) { this.phone = phone; }
setAddress(address) { this.address = address; }
setAbout(about) { this.about = about; }
setPicture(picture) { this.picture = picture; }
setRidingLevel(riding_level) { this.riding_level = riding_level; }
setUserId(user_id) { this.user_id = user_id; }
    
}