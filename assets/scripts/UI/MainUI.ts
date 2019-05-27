import { GameDataManager } from '../Manager/GameDataManager';
import { BaseUI } from './BaseUI';

import { AudioMgr } from '../Manager/AudioMgr';
import { UIHelp } from '../Utils/UIHelp';

const {ccclass, property} = cc._decorator;

@ccclass
export class MainUI extends BaseUI {

    protected static className = 'MainUI';

    @property(cc.Node)
    private soundOpenStateNode: cc.Node = null;
    @property(cc.Node)
    private soundCloseStateNode: cc.Node = null;

    public onLoad()
    {
        AudioMgr.getInstance().playBGM('bgm');
    }

    public start()
    {
        this.initUI();
    }

    public initUI()
    {
        this.initPlayerState();
    }

    public initPlayerState()
    {
        let gameData = GameDataManager.getInstance().getGameData();
        this.soundCloseStateNode.active = gameData.playerInfo.closeAudio;
        this.soundOpenStateNode.active = !gameData.playerInfo.closeAudio;
    }


    public onBtnSoundOpenState()
    {
        GameDataManager.getInstance().getGameData().playerInfo.closeAudio = true;
        AudioMgr.getInstance().stopAll();
        this.soundOpenStateNode.active = false;
        this.soundCloseStateNode.active = true;

        UIHelp.showTip('audio has closed');

        AudioMgr.getInstance().playSound('click_Btn');
    }

    public onBtnSoundCloseState()
    {
        GameDataManager.getInstance().getGameData().playerInfo.closeAudio = false;
        AudioMgr.getInstance().resumeBGM();
        this.soundOpenStateNode.active = true;
        this.soundCloseStateNode.active = false;

        UIHelp.showTip('audio has opened');

        AudioMgr.getInstance().playSound('click_Btn');
    }
}
