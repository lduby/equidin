export class Horse {
    
constructor(public id: number, public name: string, public sire: string, public gender: string, public birthdate: string, public picture: string, public coat_color: string, public height: string, public race: string, public stable: string, public about: string, public owner: string) { }

    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
    setSire(sire) { this.sire = sire; }
    setGender(gender) { this.gender = gender; }
    setBirthdate(birthdate) { this.birthdate = birthdate; }
    setPicture(picture) { this.picture = picture; }
    setCoatColor(coat_color) { this.coat_color = coat_color; }
    setHeight(height) { this.height = height; }
    setRace(race) { this.race = race; }
    setStable(stable) { this.stable = stable; }
    setAbout(about) { this.about = about; }
    setOwner(owner) { this.owner = owner; }
}