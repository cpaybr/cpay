class ArrayHelper {
    public existsOneOfValue(valueList: Array<any>, list: Array<any>): boolean {
        let exists: any = false;

        for (let listItem in list) {
            exists = valueList.filter(function(valueListItem) {
                return valueListItem === listItem;
            });

            if (exists) break;
        }

        return exists;
    }

    public existsValueByKey(value: string, list: Array<any>, key: string): boolean {
        let exists: any = false;

        exists = list.filter(function(listItem) {
            return listItem[key] === value;
        });

        return exists.length ? true : false;
    }
}

export default new ArrayHelper();
