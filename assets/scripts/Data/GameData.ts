import { GameDataManager } from '../Manager/GameDataManager';
import { ListenerMgr } from '../Manager/ListenerManager';
import { EGuideStatus } from './EGuideStatus';
import { ListenerType } from './ListenerType';

export class PlayerInfo
{
    public static className = 'PlayerInfo';

    private _gold = 2000;
    public get gold(): number
    {
        return this._gold;
    }
    public set gold(value: number)
    {
        this._gold = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();

        ListenerMgr.getInstance().trigger(ListenerType.GoldChanged);
    }

    private _level = 1;
    public get level(): number
    {
        return this._level;
    }
    public set level(value: number)
    {
        this._level = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();
    }

    private _closeAudio = false;
    public get closeAudio(): boolean
    {
        return this._closeAudio;
    }
    public set closeAudio(value: boolean)
    {
        this._closeAudio = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo();
    }
}

export class GameData
{
    // -----------------------serializeData----------------------------
    public playerInfo: PlayerInfo = new PlayerInfo();
    // ----------------------------------------------------------------

    public guideStatus: EGuideStatus = EGuideStatus.none;

    public serverTaskConfigData: ServerTaskData[] = null;

    public constructor()
    {
        ListenerMgr.getInstance().add(ListenerType.LoopUpdate, this, this.onUpdate);
    }

    public onUpdate(dt)
    {

    }

    public initPlayerInfo(playerInfo: PlayerInfo)
    {
        if (playerInfo)
        {
            this.playerInfo = playerInfo;
            this.playerInfo.__proto__ = PlayerInfo.prototype;
        }
        else
        {
            this.updatePlayerInfo();
        }
    }

    public updatePlayerInfo()
    {
        // serializeData
        // playerManager.setObjData(PlayerInfo.className, this.playerInfo);
    }

    public unserializeData(data)
    {
        if (data == null)
        {
            this.initPlayerInfo(null);
        }
        else
        {
            // unserializeData
        }

        ListenerMgr.getInstance().trigger(ListenerType.GameStart);
    }
}
