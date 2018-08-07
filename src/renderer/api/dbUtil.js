export function insertData(data) {
    return new Promise((resolve, reject) => {
        this.$db.insert(data,function (err,newInvoice) {
            // console.log(666,newInvoice)
            resolve(err)
        })
    })
}

export function findList(data,startPages,pageSize) {
    return new Promise((resolve, reject) => {
        this.$db.find(data).sort({"createAt":-1})
            .skip(startPages).limit(pageSize)
            .exec(function (err, results) {
                resolve(results);
            });
    })
}

export function count(data) {
    return new Promise((resolve, reject) => {
        this.$db.count(searchParam,function (err, count) {
            console.log('[count err]',err)
            resolve(count);
        })
    })
}