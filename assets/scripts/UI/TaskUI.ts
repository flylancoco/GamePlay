import { AudioMgr } from '../Manager/AudioMgr';
import { GameDataManager } from '../Manager/GameDataManager';
import { UIMgr } from '../Manager/UIManager';
import { BaseUI } from './BaseUI';
import { TaskItem } from './Objects/TaskItem';

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskUI extends BaseUI {

    protected static className = 'TaskUI';

    @property(cc.Prefab)
    private taskItemPrefab: cc.Prefab = null;
    @property(cc.Node)
    private scrollViewPivot: cc.Node = null;

    public onLoad()
    {
        cc.log('onLoad');

    }

    public onEnable()
    {
        cc.log('onEnable');
    }

    public start()
    {
        cc.log('start');
    }

    public onClose()
    {
        UIMgr.getInstance().closeUI(TaskUI);
        AudioMgr.getInstance().playSound('click_Btn');
    }
}
