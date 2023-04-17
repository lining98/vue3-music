import {Camera,Music,VideoOne,Fm} from '@icon-park/vue-next' // 引入字体图表

interface IMenus {
    name:string;
    menus:IMenu[]
}
interface IMenu {
    name:string;
    key:string;
    icon?:any; // 可选属性
}

// interface IMyMenus{
//     name:string,
//     menus:IMyMenu[]
// }
// interface IMyMenu{
//     name:string;
//     key:string;
//     pic:string;
// }


export function useMenu(){
    const menus:IMenus[] = [
        {
            name:'在线音乐',
            menus:[
                {
                    name:'推荐',
                    key:'discover',
                    icon:Camera
                },
                {
                    name:'音乐馆',
                    key:'music',
                    icon:Music
                },
                {
                    name:'视频',
                    key:'video',
                    icon:VideoOne
                },
                {
                    name:'电台',
                    key:'dj',
                    icon:Fm
                },
            ]
        },
    ]
    // const myMenus:IMyMenus[] = [
    //     {
    //         name:'我的音乐',
    //         menus:[
    //             // {}
    //         ]
    //     }
    // ]
    return {
        menus,
        // myMenus
    }
}