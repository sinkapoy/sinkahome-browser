import { Howl } from 'howler';

export const sounds = {
    pop: 'pop.mp3'
} as Record<string, string>;

class SoundManager {

    private soundMap: Record<string, Howl> = {};
    constructor() {
        
    }

    init(){
        for(const descriptor of Object.entries(sounds)){
            this.soundMap[descriptor[0]] = new Howl({
                src: [descriptor[1]]
            });
        }
    }

    play(sound: string){
        const howl = this.soundMap[sound];
        if(!howl) return;

        howl.play();
    }
}

export const soundManager = new SoundManager();