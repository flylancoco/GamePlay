import { AudioManager } from '../../GamePlay/Manager/AudioManager';
import { GameManager } from '../../GamePlay/Manager/GameManager';
import { ListenerManager } from '../../GamePlay/Manager/ListenerManager';
import { PlatformManager } from '../../GamePlay/Manager/PlatformManager';
import { TimeManager } from '../../GamePlay/Manager/TimeManager';
import { UIManager } from '../../GamePlay/Manager/UIManager';
import { LogWrap } from '../../GamePlay/Utils/LogWrap';


const {ccclass, property} = cc._decorator;

@ccclass
export class GameMain extends cc.Component
{
    @property(cc.Node)
    private preLoadPrefabList: cc.Node = null;

    public onLoad()
    {
        AudioMgr = AudioManager.getInstance();
        GameMgr = GameManager.getInstance();
        ListenerMgr = ListenerManager.getInstance();
        PlatformMgr = PlatformManager.getInstance();
        TimeMgr = TimeManager.getInstance();
        UIMgr = UIManager.getInstance();
        Log = LogWrap.getInstance();
        Log.log('test log');
        Log.info('test info');
        Log.warn('test warn');
        Log.err('test err');

        let frameSize = cc.view.getFrameSize();
        let bFitWidth = (frameSize.width / frameSize.height) < (750 / 1334);
        cc.Canvas.instance.fitWidth = bFitWidth;
        cc.Canvas.instance.fitHeight = !bFitWidth;
    }

    public start()
    {
        this.preLoadPrefabList.destroy();
    }

    public update(dt)
    {
        ListenerMgr.getInstance().trigger(ListenerMgr.LoopUpdate, dt);
    }
}
