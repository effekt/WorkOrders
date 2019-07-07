module.exports = {
    res: function(res, success, message, data) {
        res.json({success: success, message: message, data: data ? data : null})
    }
}