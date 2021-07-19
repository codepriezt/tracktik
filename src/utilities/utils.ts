

export class utils {
    static randomNumber():string{
        var randNo = Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime() + Math.floor(Math.random() * 100) + 2 + (Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').substr(0, 5));
        return randNo;
    }

    static isObject(val : any) {
         if (val === null) { return false; }
        return ((typeof val === 'function') || (typeof val === 'object'));
    }

    static isArrayLike(string:any) {
        return (string.constructor == Array || string instanceof Array);
    }

    static isArrayFilter(list:any , element:string|number , key:string|number):any{
        var i:number
        let k = key
        var index
            for(i=0 ; i  < list.length ; i++){
                    if(list[i][k] === element){
                            index = list[i]
                    }
            }

            return index
    }

    static isArrayFindByKey(list:any , key:string|number){
        var index;
        var keys = Object.keys(list)
        for(var i=0; i< keys.length; i++){
                if(keys[i] == key){ 
                    index = list[key] 
                }
        }
        return index
    }
}