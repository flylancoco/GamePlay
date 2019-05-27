import { LogWrap } from '../Utils/LogWrap';
import { GameDataManager } from './GameDataManager';

export class GameManager
{
    private static instance: GameManager ;
    public static getInstance(): GameManager
    {
        if (this.instance === null)
        {
            this.instance = new GameManager();
        }
        return this.instance;
    }
    public initGame()
    {
        // let manager = cc.director.getCollisionManager();
        // manager.enabled = true;

        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    }



}
