
export type Monitor = { 
    layout: Layout;
    active: boolean;
    sizes?: number[];
    initialColHeight?: number[];
}

export type View = {
    title: string;
    unsaved?: boolean;
    system?: boolean;
    selected?: boolean;
    one: Monitor;
    two: Monitor;
    three: Monitor;
    four: Monitor;
    five: Monitor;
    six: Monitor;
}

type RowData = { 
    data: string;
}

type LayoutObj = { 
    appCount: number;
    rowOne?: RowData;
    rowTwo?: RowData;
    columnOne?: RowData;
    columnTwo?: RowData;
}

export type Layout = { 
    id : number;
    name: string;
    label: string
    layout: LayoutObj
    apps?: LayoutApp[];
}


export type App = { 
    label: string;
    name: string;
}

export interface LayoutApp { 
    app: App 
    position: number;
}

export const appList: App[] = [
    {
        "label": "Worklist",
        "name": "worklist"
    }
]


export const defaultAppMap = appList.reduce(function(map, obj) {
    map[obj.name] = obj;
    return map;
}, {});


export const  defaultLayouts: Layout[] = [
    {   
        id: 1,
        name: "single",
        label: "Single Pane",
        layout: {
            appCount: 1,
            rowOne: {
                data: "x"
            }
        }
    },
    {   
        id: 2,
        name: "doubleh",
        label: "Double Horizontal",
        layout: { 
            appCount: 2,
            rowOne: {
                data: "x|x"
            }
        }
    },
    {   
        id: 3,
        label: "Double Vertical",
        name: "doublev",
        layout: { 
            appCount: 2,
            columnOne: {
                data: "x|x"
            }
        }
    },

    
    {   
        id: 4,
        name: "2x2",
        label: "2x2 grid",
        layout: { 
            appCount: 4,
            rowOne:{
                data: "x|x"
            },
            rowTwo: {
                data: "x|x"
            }
        }
    },
    {   
        id: 5,
        name: "2x1",
        label: "2x1 grid",
        layout: { 
            appCount: 3,
            rowOne: {
                data: "x|x"
            },
            rowTwo: {
                data: "x"
            }
        }
    },
    {   
        id: 6,
        name: "2x1-alt-a",
        label: "2x1 alt grid",
        layout: { 
            appCount: 3,
            rowOne: {
                data: "x"
            },
            rowTwo: {
                data: "x|x"
            }
        }
    },
    /*
       |   |   | 
       |   |   |
       |---|   |
       |   |   |
       |   |   |
       */
    {   
        id: 7,
        name: "2x1-alt-b",
        label: "2x1 grid alt",
        layout: { 
            appCount: 3,
            rowOne: {
                data: "x"
            },
            rowTwo: {
                data: "x|x"
            }
        }
    },
    {   
        id: 8,
        name: "1x2",
        label: "1x2",
        layout: { 
            appCount: 3,
            rowOne: {
                data: "x"
            },
            rowTwo: {
                data: "x|x"
            }
        }
    }
]


export const defaultLayoutsMap = defaultLayouts.reduce(function(map, obj) {
    map[obj.id] = obj;
    return map;
}, {});


export const defaultLayoutsByNameMap = defaultLayouts.reduce(function(map, obj) {
    map[obj.name] = obj;
    return map;
}, {});



export const defaultViews: View[] = [
    {
        "title": "Default View",
        "one": { 
            "active": true, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
        "two": { 
            "active": false, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
        "three":{ 
            "active": false, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
        "four":{ 
            "active": false, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
        "five":{ 
            "active": false, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
        "six":{ 
            "active": false, 
            "layout": 
                { 
                    ...defaultLayoutsByNameMap["single"], 
                    apps: [{
                        app: defaultAppMap["worklist"],
                        position: 1
                    }],
                    sizes: [100],
                }
        },
    }
]
