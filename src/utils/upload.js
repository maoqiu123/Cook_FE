// import qiniu from 'qiniu-js'
import Qiniu from 'qiniu'
Qiniu.conf.ACCESS_KEY = 'yi-qu1G_W7fSnAcH2GiLvg4BIbB0Bu2swKBXW_P8'
Qiniu.conf.SECRET_KEY = 'Nu1ntfUCCBkPEVQYMZfi2Pvsb0VqBefecvjlNQu2'
const bucket = 'cook'

function uploadToken() {
    const putPolicy = new Qiniu.rs.PutPolicy({
        scope: bucket
    })
    return putPolicy.uploadToken()
}

export {uploadToken}