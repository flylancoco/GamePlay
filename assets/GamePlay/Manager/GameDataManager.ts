
export class GameDataManager
{
    private static instance: GameDataManager;

    public static getInstance(): GameDataManager
    {
        if (this.instance === null)
        {
            this.instance = new GameDataManager();
        }
        return this.instance;
    }
}
