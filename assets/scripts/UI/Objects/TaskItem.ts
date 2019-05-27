
import { AudioMgr } from '../../Manager/AudioMgr';
import { GameDataManager } from '../../Manager/GameDataManager';
import { UIMgr } from '../../Manager/UIManager';
import { UIHelp } from '../../Utils/UIHelp';
import TaskUI from '../TaskUI';

import { ETaskType } from '../../Data/EnumTaskType';

const {ccclass, property} = cc._decorator;

let BtnState = {
    claim : 0,
    unable: 1,
    unClaim: 2
};

@ccclass
export class TaskItem extends cc.Component {

    @property(cc.Label)
    private describeLabel: cc.Label = null;
    @property(cc.Label)
    private coinsLabel: cc.Label = null;
    @property(cc.Label)
    private progressLabel: cc.Label = null;
    @property(cc.Label)
    private totalProgressLabel: cc.Label = null;
    @property(cc.Button)
    private btn: cc.Button = null;
    @property(cc.Label)
    private btnLabel: cc.Label = null;
    @property(cc.SpriteAtlas)
    private taskAtlas: cc.SpriteAtlas = null;
    @property(cc.Sprite)
    private taskSprite: cc.Sprite = null;

    private _btnState: number;
    private _taskType: ETaskType;
    private _reward: number;

    public onBtnClaimOrGo()
    {

    }
}
