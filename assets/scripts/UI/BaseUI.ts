import { ConstValue } from '../Data/ConstValue';
import { ListenerMgr } from '../Manager/ListenerManager';

export interface UIClass<T extends BaseUI>
{
    new(): T;
    getUrl(): string;
}

const {ccclass, property} = cc._decorator;
@ccclass
export abstract class BaseUI extends cc.Component
{
    public get tag(): any
    {
        return this.mTag;
    }
    public set tag(value: any)
    {
        this.mTag = value;
    }
    protected static className = 'BaseUI';

    public static getUrl(): string
    {
        cc.log(this.className);
        return ConstValue.PREFAB_UI_DIR + this.className;
    }

    protected mTag: any;

    public onDestroy(): void
    {
        ListenerMgr.getInstance().removeAll(this);
    }

    public onShow()
    {
        cc.log('BaseUI onShow');
    }
}
