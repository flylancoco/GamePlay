export class TimeManager
{
    private static instance: TimeManager = null;
    public static getInstance(): TimeManager
    {
        if (this.instance === null)
        {
            this.instance = new TimeManager();
        }
        return this.instance;
    }

    // private timeDate = null;

    public constructor()
    {
        // this.timeDate = new Date();
    }

    public getCurrentTime(): number
    {
        // return this.timeDate.getTime();
        let timeDate = new Date();
        return timeDate.getTime();
    }
}
