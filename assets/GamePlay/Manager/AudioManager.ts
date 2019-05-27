
export class AudioManager
{
    private static instance: AudioManager = null;

    public static getInstance(): AudioManager
    {
        if (this.instance === null)
        {
            this.instance = new AudioMgr();
        }
        return this.instance;
    }

    private bgm = '';

    public playSound(soundName: string, loop?: boolean, volume?: number)
    {
    }

    public stopAll()
    {
        cc.audioEngine.stopAll();
    }

    public pauseAll()
    {
        cc.audioEngine.pauseAll();
    }

    public resumeAll()
    {
        cc.audioEngine.resumeAll();
    }

    public playBGM(soundName: string)
    {
    }

    public resumeBGM()
    {
    }
}
