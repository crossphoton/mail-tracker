function main(req, res, next){
    const { id } = req.params;
    next();
}

module.exports = main;