const {ccclass, property} = cc._decorator;

@ccclass
export class PlatformManager
{
    private static instance: PlatformManager ;
    public static getInstance(): PlatformManager
    {
        if (this.instance === null)
        {
            this.instance = new PlatformManager();
        }
        return this.instance;
    }
}
