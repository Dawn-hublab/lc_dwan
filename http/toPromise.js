let toPromise =function (pro) {
    let promise = new Promise(function(resolve, reject)  {
        pro.then(function(res) {
            if (res.code === 200) {
                resolve(res);
            } else {
                resolve(res);
            }
        })
            .catch(function(response)  {
                reject(response);
            });
    });
    return promise;
};
export default toPromise;